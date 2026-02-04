# Mobile App

The React Native mobile application for the Boarding House Management System. This Expo-based app provides boarders with a native mobile experience for browsing properties, managing bookings, and communicating with landlords.

## 📱 Overview

**Platform**: iOS & Android  
**Framework**: React Native with Expo  
**Purpose**: Native mobile experience for boarders

## ✨ Features

### Property Discovery
- **Browse Listings**: Native property browsing experience
- **Advanced Search**: Filter properties by location, price, amenities
- **Interactive Maps**: Native map integration with property markers
- **Photo Galleries**: Swipeable image galleries with zoom
- **Offline Browsing**: Cached property data for offline viewing

### Booking Management
- **Booking Requests**: Submit and track booking requests
- **Payment Integration**: Secure mobile payments
- **Booking History**: View past and current reservations
- **Push Notifications**: Real-time booking updates

### Communication
- **In-app Messaging**: Chat with landlords
- **Push Notifications**: Message and booking notifications
- **Voice Messages**: Audio message support
- **Image Sharing**: Share photos in conversations

### User Experience
- **Biometric Authentication**: Face ID / Touch ID support
- **Dark Mode**: System-aware theme switching
- **Offline Support**: Core functionality works offline
- **Native Navigation**: Platform-specific navigation patterns

## 🏗️ Architecture

### Project Structure
```
app/
├── (auth)/
│   ├── login.tsx                      # Login screen
│   └── register.tsx                   # Registration screen
├── (boarder)/
│   ├── _layout.tsx                    # Boarder tab layout
│   ├── index.tsx                      # Dashboard/Home
│   ├── browse/
│   │   ├── index.tsx                  # Browse properties
│   │   └── [id].tsx                   # Property details
│   ├── bookings/
│   │   ├── index.tsx                  # Booking list
│   │   └── [id].tsx                   # Booking details
│   ├── messages/
│   │   ├── index.tsx                  # Conversation list
│   │   └── [id].tsx                   # Chat screen
│   └── profile/
│       ├── index.tsx                  # Profile screen
│       └── settings.tsx               # Settings screen
├── index.tsx                          # App entry point
└── _layout.tsx                        # Root layout
```

### Component Structure
```
src/
├── components/
│   ├── ui/                            # Reusable UI components
│   ├── property/                      # Property-related components
│   ├── booking/                       # Booking components
│   ├── messaging/                     # Chat components
│   └── navigation/                    # Navigation components
├── lib/
│   ├── api.ts                         # tRPC client setup
│   ├── auth.ts                        # Authentication utilities
│   ├── storage.ts                     # AsyncStorage utilities
│   └── notifications.ts              # Push notification setup
└── screens/                           # Screen components (if not using app directory)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun package manager
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Development Setup

```bash
# Install dependencies
bun install

# Start development server
bun --filter @bhms/mobile dev

# Or from app directory
cd apps/mobile
bun dev
```

### Running on Devices

```bash
# iOS Simulator
bun run ios

# Android Emulator
bun run android

# Physical device (scan QR code)
bun run start
```

### Environment Variables

Create `.env.local`:

```env
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3001

# Authentication
EXPO_PUBLIC_AUTH_URL=http://localhost:3003

# Maps
EXPO_PUBLIC_MAPBOX_TOKEN=your-mapbox-token

# Push Notifications
EXPO_PUBLIC_PUSH_TOKEN=your-expo-push-token

# Analytics
EXPO_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 🔐 Authentication

### Authentication Flow
```typescript
// src/lib/auth.ts
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router'

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.auth.login.mutate({ email, password })
      
      // Store tokens securely
      await SecureStore.setItemAsync('accessToken', response.accessToken)
      await SecureStore.setItemAsync('refreshToken', response.refreshToken)
      
      // Navigate to main app
      router.replace('/(boarder)')
      
      return response
    } catch (error) {
      throw new Error('Login failed')
    }
  },
  
  async logout() {
    await SecureStore.deleteItemAsync('accessToken')
    await SecureStore.deleteItemAsync('refreshToken')
    router.replace('/(auth)/login')
  },
  
  async getToken() {
    return await SecureStore.getItemAsync('accessToken')
  }
}
```

### Biometric Authentication
```typescript
// src/lib/biometric.ts
import * as LocalAuthentication from 'expo-local-authentication'

export const biometricAuth = {
  async isAvailable() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync()
    const isEnrolled = await LocalAuthentication.isEnrolledAsync()
    return hasHardware && isEnrolled
  },
  
  async authenticate() {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access your account',
      fallbackLabel: 'Use passcode'
    })
    
    return result.success
  }
}
```

## 🏠 Property Browsing

### Property List Component
```typescript
// src/components/property/PropertyList.tsx
import { FlashList } from '@shopify/flash-list'
import { api } from '@/lib/api'

export const PropertyList = ({ filters }: { filters: PropertyFilters }) => {
  const { data: properties, isLoading } = api.property.search.useQuery({
    filters,
    limit: 20
  })
  
  const renderProperty = ({ item }: { item: Property }) => (
    <PropertyCard
      property={item}
      onPress={() => router.push(`/browse/${item.id}`)}
    />
  )
  
  return (
    <FlashList
      data={properties}
      renderItem={renderProperty}
      estimatedItemSize={200}
      showsVerticalScrollIndicator={false}
      refreshing={isLoading}
      onRefresh={() => refetch()}
    />
  )
}
```

### Property Details Screen
```typescript
// app/(boarder)/browse/[id].tsx
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, View, Text, Image } from 'react-native'

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: property } = api.property.getById.useQuery({ id })
  
  if (!property) return <LoadingSpinner />
  
  return (
    <ScrollView>
      <ImageGallery images={property.images} />
      <View className="p-4">
        <Text className="text-2xl font-bold">{property.name}</Text>
        <Text className="text-lg text-gray-600">${property.pricePerMonth}/month</Text>
        <Text className="mt-4">{property.description}</Text>
        
        <AmenitiesList amenities={property.amenities} />
        <LocationMap
          latitude={property.latitude}
          longitude={property.longitude}
        />
        
        <BookingButton propertyId={property.id} />
      </View>
    </ScrollView>
  )
}
```

## 📅 Booking System

### Booking Request Flow
```typescript
// src/components/booking/BookingForm.tsx
import { useState } from 'react'
import { View, Text, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export const BookingForm = ({ propertyId }: { propertyId: string }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  
  const createBooking = api.booking.create.useMutation({
    onSuccess: () => {
      router.push('/bookings')
      showNotification('Booking request sent!')
    }
  })
  
  const handleSubmit = () => {
    createBooking.mutate({
      propertyId,
      startDate,
      endDate
    })
  }
  
  return (
    <View className="p-4">
      <Text className="text-lg font-semibold mb-4">Select Dates</Text>
      
      <DateTimePicker
        value={startDate}
        mode="date"
        onChange={(event, date) => setStartDate(date || startDate)}
      />
      
      <DateTimePicker
        value={endDate}
        mode="date"
        onChange={(event, date) => setEndDate(date || endDate)}
      />
      
      <Button
        title="Request Booking"
        onPress={handleSubmit}
        disabled={createBooking.isLoading}
      />
    </View>
  )
}
```

### Payment Integration
```typescript
// src/lib/payments.ts
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'

export const PaymentScreen = ({ bookingId }: { bookingId: string }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const createPaymentIntent = api.payment.createIntent.useMutation()
  
  const handlePayment = async () => {
    try {
      // Create payment intent
      const { clientSecret } = await createPaymentIntent.mutateAsync({ bookingId })
      
      // Initialize payment sheet
      await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'BHMS'
      })
      
      // Present payment sheet
      const { error } = await presentPaymentSheet()
      
      if (!error) {
        showNotification('Payment successful!')
        router.push('/bookings')
      }
    } catch (error) {
      showNotification('Payment failed. Please try again.')
    }
  }
  
  return (
    <View className="p-4">
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  )
}
```

## 💬 Messaging System

### Chat Screen
```typescript
// app/(boarder)/messages/[id].tsx
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { useLocalSearchParams } from 'expo-router'

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [messages, setMessages] = useState<IMessage[]>([])
  
  const { data: conversation } = api.message.getConversation.useQuery({ id })
  const sendMessage = api.message.send.useMutation()
  
  const onSend = (newMessages: IMessage[]) => {
    const message = newMessages[0]
    
    sendMessage.mutate({
      conversationId: id,
      content: message.text,
      type: 'text'
    })
    
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    )
  }
  
  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      }}
      renderBubble={CustomBubble}
      renderInputToolbar={CustomInputToolbar}
    />
  )
}
```

## 🔔 Push Notifications

### Notification Setup
```typescript
// src/lib/notifications.ts
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

export const notificationService = {
  async registerForPushNotifications() {
    if (!Device.isDevice) return null
    
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    
    if (finalStatus !== 'granted') {
      throw new Error('Permission not granted for push notifications')
    }
    
    const token = await Notifications.getExpoPushTokenAsync()
    return token.data
  },
  
  async scheduleLocalNotification(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { seconds: 1 }
    })
  }
}

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})
```

### Notification Handling
```typescript
// app/_layout.tsx
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'

export default function RootLayout() {
  useEffect(() => {
    // Handle notification received while app is running
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification)
    })
    
    // Handle notification tapped
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { data } = response.notification.request.content
      
      // Navigate based on notification type
      if (data?.type === 'booking_update') {
        router.push(`/bookings/${data.bookingId}`)
      } else if (data?.type === 'new_message') {
        router.push(`/messages/${data.conversationId}`)
      }
    })
    
    return () => {
      subscription.remove()
      responseSubscription.remove()
    }
  }, [])
  
  return <Stack />
}
```

## 🗺️ Maps Integration

### Map Component
```typescript
// src/components/ui/MapView.tsx
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const PropertyMap = ({ properties }: { properties: Property[] }) => {
  const [region, setRegion] = useState({
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width, height: height * 0.6 }}
      region={region}
      onRegionChangeComplete={setRegion}
    >
      {properties.map(property => (
        <Marker
          key={property.id}
          coordinate={{
            latitude: property.latitude,
            longitude: property.longitude
          }}
          title={property.name}
          description={`$${property.pricePerMonth}/month`}
          onPress={() => router.push(`/browse/${property.id}`)}
        />
      ))}
    </MapView>
  )
}
```

## 📱 Native Features

### Camera Integration
```typescript
// src/components/ui/CameraButton.tsx
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity, Text } from 'react-native'

export const CameraButton = ({ onImageSelected }: { onImageSelected: (uri: string) => void }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    
    if (!result.canceled) {
      onImageSelected(result.assets[0].uri)
    }
  }
  
  return (
    <TouchableOpacity onPress={pickImage} className="bg-blue-500 p-3 rounded">
      <Text className="text-white text-center">Select Image</Text>
    </TouchableOpacity>
  )
}
```

## 🧪 Testing

### Test Structure
```
src/__tests__/
├── components/
│   ├── PropertyCard.test.tsx
│   ├── BookingForm.test.tsx
│   └── ChatScreen.test.tsx
├── screens/
│   ├── BrowseScreen.test.tsx
│   ├── BookingsScreen.test.tsx
│   └── ProfileScreen.test.tsx
└── lib/
    ├── auth.test.ts
    ├── api.test.ts
    └── notifications.test.ts
```

### Running Tests
```bash
# Unit tests
bun test

# E2E tests (Detox)
bun run test:e2e:ios
bun run test:e2e:android

# Test coverage
bun run test:coverage
```

## 🚀 Deployment

### Build Configuration
```javascript
// app.config.js
export default {
  expo: {
    name: 'BHMS Mobile',
    slug: 'bhms-mobile',
    version: '1.0.0',
    platforms: ['ios', 'android'],
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      bundleIdentifier: 'com.bhms.mobile',
      buildNumber: '1'
    },
    android: {
      package: 'com.bhms.mobile',
      versionCode: 1
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-notifications',
      '@react-native-google-signin/google-signin'
    ]
  }
}
```

### Build Commands
```bash
# Development build
eas build --profile development

# Production build
eas build --profile production

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 📊 Performance

### Optimization Strategies
- **Image Optimization**: Compressed images with caching
- **List Performance**: FlashList for large datasets
- **Bundle Splitting**: Code splitting with Metro
- **Memory Management**: Proper cleanup of subscriptions

### Performance Monitoring
```typescript
// src/lib/performance.ts
import { Performance } from 'react-native-performance'

export const trackScreenLoad = (screenName: string) => {
  const startTime = Performance.now()
  
  return () => {
    const endTime = Performance.now()
    const duration = endTime - startTime
    
    // Track performance metrics
    analytics.track('Screen Load Time', {
      screen: screenName,
      duration
    })
  }
}
```

## 🤝 Contributing

1. Follow React Native best practices
2. Use TypeScript for all new code
3. Test on both iOS and Android
4. Follow the existing component structure
5. Update documentation for changes

## 📚 Related Documentation

- [Main README](../../README.md)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [API Documentation](../api/README.md)