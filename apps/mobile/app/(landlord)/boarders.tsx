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
import { Card, Badge, Input } from '@/components/ui';

interface Boarder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomNumber: string;
  accessCode: string;
  moveInDate: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  avatar?: string;
}

const mockBoarders: Boarder[] = [
  {
    id: '1',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria@example.com',
    phone: '+63 912 345 6789',
    roomNumber: '101',
    accessCode: 'MS2024',
    moveInDate: '2024-01-15',
    paymentStatus: 'paid',
  },
  {
    id: '2',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan@example.com',
    phone: '+63 923 456 7890',
    roomNumber: '102',
    accessCode: 'JD2024',
    moveInDate: '2024-02-01',
    paymentStatus: 'pending',
  },
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Reyes',
    email: 'ana@example.com',
    phone: '+63 934 567 8901',
    roomNumber: '201',
    accessCode: 'AR2024',
    moveInDate: '2023-11-20',
    paymentStatus: 'overdue',
  },
];

function BoarderCard({ boarder }: { boarder: Boarder }) {
  const statusConfig = {
    paid: { label: 'Paid', variant: 'success' as const },
    pending: { label: 'Pending', variant: 'warning' as const },
    overdue: { label: 'Overdue', variant: 'error' as const },
  };

  const status = statusConfig[boarder.paymentStatus];
  const initials = `${boarder.firstName[0]}${boarder.lastName[0]}`;

  return (
    <Card style={styles.boarderCard} onPress={() => {}}>
      <View style={styles.boarderHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.boarderInfo}>
          <Text style={styles.boarderName}>
            {boarder.firstName} {boarder.lastName}
          </Text>
          <Text style={styles.boarderRoom}>Room {boarder.roomNumber}</Text>
        </View>
        <Badge variant={status.variant}>{status.label}</Badge>
      </View>

      <View style={styles.boarderDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={16} color={colors.neutral[400]} />
          <Text style={styles.detailText}>{boarder.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={16} color={colors.neutral[400]} />
          <Text style={styles.detailText}>{boarder.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="key-outline" size={16} color={colors.neutral[400]} />
          <Text style={styles.detailText}>Code: {boarder.accessCode}</Text>
        </View>
      </View>

      <View style={styles.boarderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="chatbubble-outline"
            size={18}
            color={colors.primary[700]}
          />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="receipt-outline"
            size={18}
            color={colors.primary[700]}
          />
          <Text style={styles.actionText}>Payments</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export default function BoardersScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredBoarders = mockBoarders.filter(
    (b) =>
      b.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomNumber.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Boarders</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="person-add" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Search by name or room..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search-outline"
        />
      </View>

      <FlatList
        data={filteredBoarders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BoarderCard boarder={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="people-outline"
              size={48}
              color={colors.neutral[300]}
            />
            <Text style={styles.emptyText}>No boarders found</Text>
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
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  boarderCard: {
    marginBottom: spacing.md,
  },
  boarderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary[700],
  },
  boarderInfo: {
    flex: 1,
  },
  boarderName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  boarderRoom: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  boarderDetails: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  boarderActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  actionText: {
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
