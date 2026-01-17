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
import { Card } from '@/components/ui';
import { useAuthStore } from '@/lib/store';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  trend?: { value: number; isPositive: boolean };
}

function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <Card style={styles.statCard}>
      <View
        style={[styles.statIconContainer, { backgroundColor: color + '15' }]}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {trend && (
        <View style={styles.trendContainer}>
          <Ionicons
            name={trend.isPositive ? 'trending-up' : 'trending-down'}
            size={14}
            color={trend.isPositive ? colors.success : colors.error}
          />
          <Text
            style={[
              styles.trendText,
              { color: trend.isPositive ? colors.success : colors.error },
            ]}
          >
            {trend.value}%
          </Text>
        </View>
      )}
    </Card>
  );
}

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Refetch data
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Mock data - replace with tRPC queries
  const stats = {
    totalRooms: 12,
    occupiedRooms: 10,
    totalBoarders: 15,
    monthlyRevenue: 75000,
    pendingPayments: 3,
    overduePayments: 1,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      message: 'Maria Santos paid ₱5,000',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'boarder',
      message: 'New boarder: Juan Dela Cruz',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'room',
      message: 'Room 301 marked as available',
      time: '1 day ago',
    },
  ];

  const occupancyRate = Math.round(
    (stats.occupiedRooms / stats.totalRooms) * 100
  );

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
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user?.name || 'Landlord'}</Text>
          </View>
          <View style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.neutral[700]}
            />
            <View style={styles.notificationBadge} />
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Occupancy Rate"
            value={`${occupancyRate}%`}
            icon="home"
            color={colors.primary[600]}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Total Boarders"
            value={stats.totalBoarders}
            icon="people"
            color={colors.secondary[600]}
          />
          <StatCard
            title="Monthly Revenue"
            value={`₱${stats.monthlyRevenue.toLocaleString()}`}
            icon="wallet"
            color={colors.success}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            icon="time"
            color={colors.warning}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Room Overview</Text>
          </View>
          <Card>
            <View style={styles.roomOverview}>
              <View style={styles.roomStat}>
                <View
                  style={[styles.roomDot, { backgroundColor: colors.success }]}
                />
                <Text style={styles.roomStatLabel}>Occupied</Text>
                <Text style={styles.roomStatValue}>{stats.occupiedRooms}</Text>
              </View>
              <View style={styles.roomStat}>
                <View
                  style={[
                    styles.roomDot,
                    { backgroundColor: colors.neutral[300] },
                  ]}
                />
                <Text style={styles.roomStatLabel}>Available</Text>
                <Text style={styles.roomStatValue}>
                  {stats.totalRooms - stats.occupiedRooms}
                </Text>
              </View>
              <View style={styles.roomStat}>
                <View
                  style={[styles.roomDot, { backgroundColor: colors.error }]}
                />
                <Text style={styles.roomStatLabel}>Overdue</Text>
                <Text style={styles.roomStatValue}>
                  {stats.overduePayments}
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${occupancyRate}%` }]}
              />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <Card>
            {recentActivities.map((activity, index) => (
              <View
                key={activity.id}
                style={[
                  styles.activityItem,
                  index < recentActivities.length - 1 && styles.activityBorder,
                ]}
              >
                <View
                  style={[
                    styles.activityIcon,
                    {
                      backgroundColor:
                        activity.type === 'payment'
                          ? colors.success + '15'
                          : activity.type === 'boarder'
                            ? colors.secondary[100]
                            : colors.primary[50],
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      activity.type === 'payment'
                        ? 'wallet'
                        : activity.type === 'boarder'
                          ? 'person'
                          : 'bed'
                    }
                    size={18}
                    color={
                      activity.type === 'payment'
                        ? colors.success
                        : activity.type === 'boarder'
                          ? colors.secondary[600]
                          : colors.primary[600]
                    }
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityMessage}>{activity.message}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
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
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '47%',
    padding: spacing.md,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  statTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginTop: spacing.xs,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 2,
  },
  trendText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  seeAll: {
    fontSize: typography.fontSize.sm,
    color: colors.primary[700],
    fontWeight: typography.fontWeight.medium,
  },
  roomOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  roomStat: {
    alignItems: 'center',
  },
  roomDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: spacing.xs,
  },
  roomStatLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
  },
  roomStatValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.full,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  activityBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[800],
    fontWeight: typography.fontWeight.medium,
  },
  activityTime: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    marginTop: 2,
  },
});
