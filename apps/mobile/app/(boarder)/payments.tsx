import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '@/lib/theme';
import { Card, Badge } from '@/components/ui';

type PaymentStatus = 'paid' | 'pending' | 'overdue';

interface Payment {
  id: string;
  amount: number;
  type: 'rent' | 'utility';
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  month: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 5000,
    type: 'rent',
    dueDate: '2024-02-05',
    status: 'pending',
    month: 'February 2024',
  },
  {
    id: '2',
    amount: 850,
    type: 'utility',
    dueDate: '2024-02-10',
    status: 'pending',
    month: 'February 2024',
  },
  {
    id: '3',
    amount: 5000,
    type: 'rent',
    dueDate: '2024-01-05',
    paidDate: '2024-01-03',
    status: 'paid',
    month: 'January 2024',
  },
  {
    id: '4',
    amount: 720,
    type: 'utility',
    dueDate: '2024-01-10',
    paidDate: '2024-01-08',
    status: 'paid',
    month: 'January 2024',
  },
];

function PaymentItem({ payment }: { payment: Payment }) {
  const statusConfig = {
    paid: { label: 'Paid', variant: 'success' as const },
    pending: { label: 'Pending', variant: 'warning' as const },
    overdue: { label: 'Overdue', variant: 'error' as const },
  };

  const status = statusConfig[payment.status];

  return (
    <Card style={styles.paymentItem} onPress={() => {}}>
      <View style={styles.paymentRow}>
        <View
          style={[
            styles.paymentIcon,
            {
              backgroundColor:
                payment.type === 'rent'
                  ? colors.primary[50]
                  : colors.secondary[50],
            },
          ]}
        >
          <Ionicons
            name={payment.type === 'rent' ? 'home' : 'flash'}
            size={20}
            color={
              payment.type === 'rent'
                ? colors.primary[700]
                : colors.secondary[600]
            }
          />
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentType}>
            {payment.type === 'rent' ? 'Monthly Rent' : 'Utilities'}
          </Text>
          <Text style={styles.paymentMonth}>{payment.month}</Text>
        </View>
        <View style={styles.paymentRight}>
          <Text style={styles.paymentAmount}>
            ₱{payment.amount.toLocaleString()}
          </Text>
          <Badge variant={status.variant}>{status.label}</Badge>
        </View>
      </View>

      <View style={styles.paymentDates}>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Due:</Text>
          <Text style={styles.dateValue}>{payment.dueDate}</Text>
        </View>
        {payment.paidDate && (
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Paid:</Text>
            <Text style={[styles.dateValue, { color: colors.success }]}>
              {payment.paidDate}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
}

export default function BoarderPaymentsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const pendingTotal = mockPayments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const paidThisMonth = mockPayments
    .filter((p) => p.status === 'paid' && p.month === 'January 2024')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Card style={styles.summaryCard}>
          <View style={styles.pendingCard}>
            <Ionicons name="time-outline" size={24} color={colors.warning} />
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={[styles.summaryValue, { color: colors.warning }]}>
              ₱{pendingTotal.toLocaleString()}
            </Text>
          </View>
        </Card>
        <Card style={styles.summaryCard}>
          <View style={styles.paidCard}>
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={colors.success}
            />
            <Text style={styles.summaryLabel}>Paid (Jan)</Text>
            <Text style={[styles.summaryValue, { color: colors.success }]}>
              ₱{paidThisMonth.toLocaleString()}
            </Text>
          </View>
        </Card>
      </View>

      <FlatList
        data={mockPayments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PaymentItem payment={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Text style={styles.listHeader}>Payment History</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="receipt-outline"
              size={48}
              color={colors.neutral[300]}
            />
            <Text style={styles.emptyText}>No payments yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  pendingCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
  },
  paidCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginTop: spacing.xs,
  },
  summaryValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginTop: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listHeader: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  paymentItem: {
    marginBottom: spacing.sm,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  paymentMonth: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  paymentRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  paymentAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  paymentDates: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  dateItem: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dateLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[400],
  },
  dateValue: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[400],
    marginTop: spacing.md,
  },
});
