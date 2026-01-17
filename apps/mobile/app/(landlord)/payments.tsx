import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '@/lib/theme';
import { Card, Badge } from '@/components/ui';

type PaymentStatus = 'paid' | 'pending' | 'overdue';

interface Payment {
  id: string;
  boarderName: string;
  roomNumber: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  type: 'rent' | 'utility' | 'deposit';
}

const mockPayments: Payment[] = [
  {
    id: '1',
    boarderName: 'Maria Santos',
    roomNumber: '101',
    amount: 5000,
    dueDate: '2024-01-05',
    paidDate: '2024-01-03',
    status: 'paid',
    type: 'rent',
  },
  {
    id: '2',
    boarderName: 'Juan Dela Cruz',
    roomNumber: '102',
    amount: 4000,
    dueDate: '2024-01-05',
    status: 'pending',
    type: 'rent',
  },
  {
    id: '3',
    boarderName: 'Ana Reyes',
    roomNumber: '201',
    amount: 5500,
    dueDate: '2024-01-05',
    status: 'overdue',
    type: 'rent',
  },
  {
    id: '4',
    boarderName: 'Maria Santos',
    roomNumber: '101',
    amount: 850,
    dueDate: '2024-01-10',
    paidDate: '2024-01-08',
    status: 'paid',
    type: 'utility',
  },
];

function PaymentCard({ payment }: { payment: Payment }) {
  const statusConfig = {
    paid: {
      label: 'Paid',
      variant: 'success' as const,
      icon: 'checkmark-circle',
    },
    pending: { label: 'Pending', variant: 'warning' as const, icon: 'time' },
    overdue: {
      label: 'Overdue',
      variant: 'error' as const,
      icon: 'alert-circle',
    },
  };

  const typeConfig = {
    rent: { label: 'Rent', color: colors.primary[600] },
    utility: { label: 'Utility', color: colors.secondary[600] },
    deposit: { label: 'Deposit', color: colors.neutral[600] },
  };

  const status = statusConfig[payment.status];
  const type = typeConfig[payment.type];

  return (
    <Card style={styles.paymentCard} onPress={() => {}}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.boarderName}>{payment.boarderName}</Text>
          <Text style={styles.roomNumber}>Room {payment.roomNumber}</Text>
        </View>
        <Text style={styles.amount}>₱{payment.amount.toLocaleString()}</Text>
      </View>

      <View style={styles.paymentDetails}>
        <View style={styles.detailRow}>
          <View
            style={[styles.typeTag, { backgroundColor: type.color + '15' }]}
          >
            <Text style={[styles.typeText, { color: type.color }]}>
              {type.label}
            </Text>
          </View>
          <Badge variant={status.variant}>{status.label}</Badge>
        </View>

        <View style={styles.dateRow}>
          <View style={styles.dateItem}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={colors.neutral[400]}
            />
            <Text style={styles.dateLabel}>Due: </Text>
            <Text style={styles.dateValue}>{payment.dueDate}</Text>
          </View>
          {payment.paidDate && (
            <View style={styles.dateItem}>
              <Ionicons
                name="checkmark-outline"
                size={14}
                color={colors.success}
              />
              <Text style={styles.dateLabel}>Paid: </Text>
              <Text style={styles.dateValue}>{payment.paidDate}</Text>
            </View>
          )}
        </View>
      </View>

      {payment.status !== 'paid' && (
        <TouchableOpacity style={styles.recordButton}>
          <Ionicons
            name="add-circle-outline"
            size={18}
            color={colors.primary[700]}
          />
          <Text style={styles.recordButtonText}>Record Payment</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
}

export default function PaymentsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<PaymentStatus | 'all'>('all');

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredPayments =
    filter === 'all'
      ? mockPayments
      : mockPayments.filter((p) => p.status === filter);

  const totalPending = mockPayments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = mockPayments
    .filter((p) => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View
          style={[
            styles.summaryCard,
            { backgroundColor: colors.warning + '15' },
          ]}
        >
          <Text style={[styles.summaryLabel, { color: colors.warning }]}>
            Pending
          </Text>
          <Text style={[styles.summaryValue, { color: colors.warning }]}>
            ₱{totalPending.toLocaleString()}
          </Text>
        </View>
        <View
          style={[styles.summaryCard, { backgroundColor: colors.error + '15' }]}
        >
          <Text style={[styles.summaryLabel, { color: colors.error }]}>
            Overdue
          </Text>
          <Text style={[styles.summaryValue, { color: colors.error }]}>
            ₱{totalOverdue.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'pending', 'overdue', 'paid'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredPayments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PaymentCard payment={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="wallet-outline"
              size={48}
              color={colors.neutral[300]}
            />
            <Text style={styles.emptyText}>No payments found</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary[700],
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  summaryValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginTop: spacing.xs,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  filterActive: {
    backgroundColor: colors.primary[700],
    borderColor: colors.primary[700],
  },
  filterText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    fontWeight: typography.fontWeight.medium,
  },
  filterTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  paymentCard: {
    marginBottom: spacing.md,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  paymentInfo: {
    flex: 1,
  },
  boarderName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  roomNumber: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  amount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  paymentDetails: {
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typeTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
  },
  dateValue: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[600],
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  recordButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary[700],
    fontWeight: typography.fontWeight.medium,
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
