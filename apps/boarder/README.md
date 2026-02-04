# Boarder Dashboard

The authenticated boarder experience for the Boarding House Management System. This application provides boarders with tools to browse properties, manage bookings, communicate with landlords, and handle payments.

## 🏠 Overview

**Port**: 3004  
**URL**: http://localhost:3004  
**Purpose**: Authenticated boarder dashboard and booking management

## ✨ Features

### Property Management
- **Browse Properties**: Search and filter available boarding houses
- **Saved Properties**: Bookmark favorite listings
- **Property Details**: View comprehensive property information
- **Map Integration**: See property locations and nearby amenities

### Booking System
- **Request Bookings**: Submit booking requests to landlords
- **Booking Status**: Track pending, confirmed, and completed bookings
- **Payment Processing**: Secure payment handling
- **Booking History**: View past and current reservations

### Communication
- **Messaging**: Direct communication with landlords
- **Notifications**: Real-time updates on booking status
- **Support**: Contact platform support

### Profile Management
- **Personal Information**: Update profile details
- **Preferences**: Set search and notification preferences
- **Account Settings**: Manage account security and privacy

## 🏗️ Architecture

### Pages Structure
```
src/app/
├── page.tsx                           # Dashboard redirect
└── (dashboard)/
    ├── layout.tsx                     # Dashboard layout
    ├── dashboard/page.tsx             # Main dashboard
    ├── browse/
    │   ├── page.tsx                   # Browse properties
    │   └── [id]/page.tsx             # Property details
    ├── saved/page.tsx                 # Saved properties
    ├── bookings/page.tsx              # Booking management
    ├── messages/page.tsx              # Communication center
    ├── payments/page.tsx              # Payment history
    ├── history/page.tsx               # Booking history
    ├── profile/page.tsx               # Profile management
    └── settings/page.tsx              # Account settings
```

### Components Structure
```
src/components/
├── layout/
│   ├── dashboard-layout.tsx           # Main dashboard layout
│   ├── header.tsx                     # Dashboard header
│   ├── sidebar.tsx                    # Navigation sidebar
│   └── index.ts                       # Layout exports
└── ui/
    ├── avatar.tsx                     # User avatar component
    ├── dropdown-menu.tsx              # Dropdown menus
    ├── scroll-area.tsx                # Scrollable areas
    └── index.ts                       # UI exports
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun package manager
- Valid boarder account
- API server running

### Development

```bash
# Start development server
bun --filter @bhms/boarder dev

# Or from app directory
cd apps/boarder
bun dev
```

The application will be available at http://localhost:3004

### Environment Variables

Create `.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3004
NEXTAUTH_SECRET=your-secret-key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Payments (Stripe/PayPal)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

## 🔐 Authentication & Authorization

### Access Control
- **Role Requirement**: User must have `boarder` role
- **Status Check**: Account must be `active`
- **Session Validation**: Valid authentication session required

### Route Protection
```typescript
// middleware.ts
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth
    
    // Check if user is a boarder
    if (token?.role !== 'boarder') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
    
    // Check if account is active
    if (token?.status !== 'active') {
      return NextResponse.redirect(new URL('/account-suspended', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)
```

## 🏠 Property Browsing

### Search & Filters
```typescript
interface PropertyFilters {
  location?: string
  priceRange?: {
    min: number
    max: number
  }
  amenities?: string[]
  availableRooms?: number
  rating?: number
  distance?: number
}
```

### Property Display
- **Grid View**: Card-based property listing
- **List View**: Detailed property rows
- **Map View**: Interactive map with markers
- **Favorites**: Saved properties management

### Implementation Example
```typescript
const { data: properties, isLoading } = api.property.search.useQuery({
  filters: searchFilters,
  pagination: {
    page: currentPage,
    limit: 12
  },
  sort: {
    field: 'price',
    order: 'asc'
  }
})
```

## 📅 Booking Management

### Booking Flow
1. **Property Selection**: Choose desired property
2. **Date Selection**: Pick check-in/check-out dates
3. **Request Submission**: Send booking request to landlord
4. **Landlord Review**: Wait for approval/rejection
5. **Payment**: Complete payment if approved
6. **Confirmation**: Receive booking confirmation

### Booking States
```typescript
type BookingStatus = 
  | 'pending'     // Awaiting landlord response
  | 'approved'    // Approved, payment required
  | 'confirmed'   // Payment completed
  | 'rejected'    // Declined by landlord
  | 'cancelled'   // Cancelled by boarder
  | 'completed'   // Stay completed
```

### Booking Component
```typescript
const BookingCard = ({ booking }: { booking: Booking }) => {
  const statusColor = {
    pending: 'yellow',
    approved: 'blue',
    confirmed: 'green',
    rejected: 'red',
    cancelled: 'gray',
    completed: 'purple'
  }[booking.status]
  
  return (
    <Card>
      <CardHeader>
        <Badge color={statusColor}>{booking.status}</Badge>
        <h3>{booking.property.name}</h3>
      </CardHeader>
      <CardContent>
        <p>Check-in: {booking.startDate}</p>
        <p>Check-out: {booking.endDate}</p>
        <p>Total: ${booking.totalAmount}</p>
      </CardContent>
    </Card>
  )
}
```

## 💳 Payment Integration

### Payment Methods
- **Credit/Debit Cards**: Stripe integration
- **Digital Wallets**: PayPal, Apple Pay, Google Pay
- **Bank Transfer**: Direct bank payments
- **Installments**: Split payment options

### Payment Flow
```typescript
const handlePayment = async (bookingId: string, amount: number) => {
  try {
    // Create payment intent
    const { clientSecret } = await api.payment.createIntent.mutate({
      bookingId,
      amount
    })
    
    // Process payment with Stripe
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user.name,
          email: user.email
        }
      }
    })
    
    if (!error) {
      // Payment successful
      router.push(`/bookings/${bookingId}/confirmation`)
    }
  } catch (error) {
    // Handle payment error
    toast.error('Payment failed. Please try again.')
  }
}
```

## 💬 Communication System

### Messaging Features
- **Direct Messages**: Chat with landlords
- **Booking Context**: Messages linked to specific bookings
- **File Sharing**: Share documents and images
- **Read Receipts**: Message status tracking

### Message Component
```typescript
const MessageThread = ({ propertyId }: { propertyId: string }) => {
  const { data: messages } = api.message.getThread.useQuery({ propertyId })
  const sendMessage = api.message.send.useMutation()
  
  const handleSend = (content: string) => {
    sendMessage.mutate({
      recipientId: landlordId,
      propertyId,
      content
    })
  }
  
  return (
    <div className="message-thread">
      {messages?.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <MessageInput onSend={handleSend} />
    </div>
  )
}
```

## 📊 Dashboard Analytics

### Dashboard Widgets
- **Active Bookings**: Current reservations
- **Upcoming Payments**: Payment due dates
- **Saved Properties**: Quick access to favorites
- **Recent Messages**: Latest communications
- **Booking History**: Past stays summary

### Dashboard Implementation
```typescript
const DashboardPage = () => {
  const { data: stats } = api.boarder.getDashboardStats.useQuery()
  
  return (
    <div className="dashboard-grid">
      <StatsCard
        title="Active Bookings"
        value={stats?.activeBookings || 0}
        icon={<CalendarIcon />}
      />
      <StatsCard
        title="Saved Properties"
        value={stats?.savedProperties || 0}
        icon={<HeartIcon />}
      />
      <RecentBookings bookings={stats?.recentBookings} />
      <UpcomingPayments payments={stats?.upcomingPayments} />
    </div>
  )
}
```

## 🎨 UI/UX Design

### Design System
- **Colors**: Consistent color palette
- **Typography**: Readable font hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablets
- **Desktop Enhancement**: Full desktop experience

### Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant colors
- **Focus Management**: Clear focus indicators

## 🧪 Testing

### Test Structure
```
src/__tests__/
├── components/
│   ├── booking-card.test.tsx
│   ├── property-card.test.tsx
│   └── message-thread.test.tsx
├── pages/
│   ├── dashboard.test.tsx
│   ├── bookings.test.tsx
│   └── browse.test.tsx
└── utils/
    ├── booking-helpers.test.tsx
    └── payment-utils.test.tsx
```

### Running Tests
```bash
# Unit tests
bun test

# Integration tests
bun run test:integration

# E2E tests
bun run test:e2e

# Test coverage
bun run test:coverage
```

## 🚀 Deployment

### Build Process
```bash
# Build for production
bun run build

# Start production server
bun start
```

### Environment Variables (Production)
```env
NEXTAUTH_URL=https://boarder.yourdomain.com
NEXTAUTH_SECRET=production-secret
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Payment providers
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=production-token
```

## 📱 Mobile Optimization

### Mobile Features
- **Touch Gestures**: Swipe navigation
- **Responsive Images**: Optimized image loading
- **Offline Support**: Basic offline functionality
- **Push Notifications**: Booking updates

### PWA Support
- **Service Worker**: Caching and offline support
- **Web App Manifest**: Install as app
- **Background Sync**: Sync when online

## 🔧 Configuration

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['property-images.com'],
  },
  experimental: {
    appDir: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
}
```

### Tailwind Configuration
```javascript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        boarder: {
          primary: '#3B82F6',
          secondary: '#10B981'
        }
      }
    }
  }
}
```

## 📊 Performance

### Optimization Strategies
- **Code Splitting**: Route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component lazy loading
- **Caching**: React Query caching

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **User Analytics**: User behavior tracking
- **Error Monitoring**: Error tracking and reporting

## 🤝 Contributing

1. Follow the component structure in `src/components/`
2. Use TypeScript for all new code
3. Add tests for new features
4. Follow the existing design patterns
5. Update documentation for changes

## 📚 Related Documentation

- [Main README](../../README.md)
- [API Documentation](../api/README.md)
- [Authentication App](../(auth)/README.md)
- [Development Guidelines](../../docs/DEVELOPMENT.md)