import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '@/lib/theme';
import { Card, Badge, Button } from '@/components/ui';
import { useAuthStore } from '@/lib/store';
import { trpc } from '@/lib/trpc';

export default function BoarderHomeScreen() {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - replace with tRPC query when API is ready
  const [isLoading, setIsLoading] = useState(false);

  const mockBoarder = {
    firstName: user?.name?.split(' ')[0] || 'Boarder',
    moveInDate: '2024-01-15',
    room: {
      roomNumber: '101',
      floor: 1,
      monthlyRate: { toNumber: () => 5000 },
      status: 'OCCUPIED',
      amenities: ['Aircon', 'WiFi', 'Table', 'Chair'],
    },
    payments: [
      {
        amount: { toNumber: () => 5000 },
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'PENDING',
      },
    ],
  };

  const boarder = mockBoarder;

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Ionicons name="hourglass-outline" size={48} color={colors.primary[700]} />
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const roomInfo = boarder?.room;
  const nextPayment = boarder?.payments?.[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{boarder?.firstName || user?.name || 'Boarder'}</Text>
          </View>
          <View style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.neutral[700]}
            />
          </View>
        </View>

        {roomInfo && (
          <Card style={styles.roomCard}>
            <View style={styles.roomHeader}>
              <View style={styles.roomIconContainer}>
                <Ionicons name="bed" size={28} color={colors.primary[700]} />
              </View>
              <View style={styles.roomInfo}>
                <Text style={styles.roomLabel}>Your Room</Text>
                <Text style={styles.roomNumber}>Room {roomInfo.roomNumber}</Text>
              </View>
              <Badge variant={roomInfo.status === 'OCCUPIED' ? 'success' : 'info'}>
                {roomInfo.status}
              </Badge>
            </View>

            <View style={styles.roomDetails}>
              <View style={styles.roomDetailItem}>
                <Ionicons
                  name="layers-outline"
                  size={18}
                  color={colors.neutral[500]}
                />
                <Text style={styles.roomDetailText}>Floor {roomInfo.floor}</Text>
              </View>
              <View style={styles.roomDetailItem}>
                <Ionicons
                  name="cash-outline"
                  size={18}
                  color={colors.neutral[500]}
                />
                <Text style={styles.roomDetailText}>
                  ₱{roomInfo.monthlyRate.toNumber().toLocaleString()}/mo
                </Text>
              </View>
              {boarder?.moveInDate && (
                <View style={styles.roomDetailItem}>
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={colors.neutral[500]}
                  />
                  <Text style={styles.roomDetailText}>
                    Since {new Date(boarder.moveInDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>

            {roomInfo.amenities && roomInfo.amenities.length > 0 && (
              <View style={styles.amenitiesContainer}>
                <Text style={styles.amenitiesLabel}>Amenities</Text>
                <View style={styles.amenities}>
                  {roomInfo.amenities.map((amenity: string, index: number) => (
                    <View key={index} style={styles.amenityTag}>
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Card>
        )}

        {nextPayment && (
          <Card style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentTitle}>Next Payment</Text>
              <Badge variant={nextPayment.status === 'PAID' ? 'success' : 'warning'}>
                {nextPayment.status}
              </Badge>
            </View>

            <View style={styles.paymentAmount}>
              <Text style={styles.currencySymbol}>₱</Text>
              <Text style={styles.amountValue}>
                {nextPayment.amount.toNumber().toLocaleString()}
              </Text>
            </View>

            <Text style={styles.dueDate}>
              Due: {new Date(nextPayment.dueDate).toLocaleDateString()}
            </Text>

            <Button 
              onPress={() => {}} 
              fullWidth 
              style={styles.payButton}
              disabled={nextPayment.status === 'PAID'}
            >
              {nextPayment.status === 'PAID' ? 'Paid' : 'Pay Now'}
            </Button>
          </Card>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <Card style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <View style={[styles.announcementIcon, { backgroundColor: colors.info + '15' }]}>
                <Ionicons name="information-circle-outline" size={20} color={colors.info} />
              </View>
              <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>No Announcements</Text>
                <Text style={styles.announcementMessage}>
                  Check back later for updates from your landlord.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <Card style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <Ionicons
              name="call-outline"
              size={24}
              color={colors.primary[700]}
            />
            <Text style={styles.contactTitle}>Need Help?</Text>
          </View>
          <Text style={styles.contactText}>
            Contact your landlord for any concerns or maintenance requests.
          </Text>
          <Button onPress={() => {}} variant="outline" fullWidth>
            Contact Landlord
          </Button>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.neutral[500],
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  userName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  roomCard: {
    marginBottom: spacing.md,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roomIconContainer: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  roomInfo: {
    flex: 1,
  },
  roomLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  roomNumber: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  roomDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  roomDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  roomDetailText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  amenitiesContainer: {
    gap: spacing.sm,
  },
  amenitiesLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[700],
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  amenityTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.sm,
  },
  amenityText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary[700],
    fontWeight: typography.fontWeight.medium,
  },
  paymentCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.primary[700],
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  paymentTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
  },
  paymentAmount: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  currencySymbol: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginTop: 4,
  },
  amountValue: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  dueDate: {
    fontSize: typography.fontSize.sm,
    color: colors.primary[200],
    marginBottom: spacing.md,
  },
  payButton: {
    backgroundColor: colors.white,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  announcementCard: {
    marginBottom: spacing.sm,
  },
  announcementHeader: {
    flexDirection: 'row',
  },
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  announcementMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginTop: 2,
  },
  contactCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  contactTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  contactText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
