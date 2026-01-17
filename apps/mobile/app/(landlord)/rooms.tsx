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

type RoomStatus = 'available' | 'occupied' | 'maintenance';

interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  currentOccupants: number;
  monthlyRate: number;
  status: RoomStatus;
  amenities: string[];
}

const mockRooms: Room[] = [
  {
    id: '1',
    roomNumber: '101',
    floor: 1,
    capacity: 2,
    currentOccupants: 2,
    monthlyRate: 5000,
    status: 'occupied',
    amenities: ['AC', 'WiFi', 'Private Bath'],
  },
  {
    id: '2',
    roomNumber: '102',
    floor: 1,
    capacity: 1,
    currentOccupants: 0,
    monthlyRate: 4000,
    status: 'available',
    amenities: ['Fan', 'WiFi'],
  },
  {
    id: '3',
    roomNumber: '201',
    floor: 2,
    capacity: 2,
    currentOccupants: 1,
    monthlyRate: 5500,
    status: 'occupied',
    amenities: ['AC', 'WiFi', 'Private Bath', 'Balcony'],
  },
  {
    id: '4',
    roomNumber: '202',
    floor: 2,
    capacity: 1,
    currentOccupants: 0,
    monthlyRate: 3500,
    status: 'maintenance',
    amenities: ['Fan', 'WiFi'],
  },
];

function RoomCard({ room }: { room: Room }) {
  const statusConfig = {
    available: { label: 'Available', variant: 'success' as const },
    occupied: { label: 'Occupied', variant: 'info' as const },
    maintenance: { label: 'Maintenance', variant: 'warning' as const },
  };

  const status = statusConfig[room.status];

  return (
    <Card style={styles.roomCard} onPress={() => {}}>
      <View style={styles.roomHeader}>
        <View style={styles.roomInfo}>
          <Text style={styles.roomNumber}>Room {room.roomNumber}</Text>
          <Text style={styles.roomFloor}>Floor {room.floor}</Text>
        </View>
        <Badge variant={status.variant}>{status.label}</Badge>
      </View>

      <View style={styles.roomDetails}>
        <View style={styles.detailItem}>
          <Ionicons
            name="people-outline"
            size={16}
            color={colors.neutral[500]}
          />
          <Text style={styles.detailText}>
            {room.currentOccupants}/{room.capacity} occupants
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color={colors.neutral[500]} />
          <Text style={styles.detailText}>
            ₱{room.monthlyRate.toLocaleString()}/mo
          </Text>
        </View>
      </View>

      <View style={styles.amenities}>
        {room.amenities.slice(0, 3).map((amenity, index) => (
          <View key={index} style={styles.amenityTag}>
            <Text style={styles.amenityText}>{amenity}</Text>
          </View>
        ))}
        {room.amenities.length > 3 && (
          <View style={styles.amenityTag}>
            <Text style={styles.amenityText}>+{room.amenities.length - 3}</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

export default function RoomsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<RoomStatus | 'all'>('all');

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredRooms =
    filter === 'all' ? mockRooms : mockRooms.filter((r) => r.status === filter);

  const filters: { key: RoomStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'available', label: 'Available' },
    { key: 'occupied', label: 'Occupied' },
    { key: 'maintenance', label: 'Maintenance' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Rooms</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[
              styles.filterButton,
              filter === f.key && styles.filterActive,
            ]}
            onPress={() => setFilter(f.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.key && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RoomCard room={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="bed-outline"
              size={48}
              color={colors.neutral[300]}
            />
            <Text style={styles.emptyText}>No rooms found</Text>
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
  roomCard: {
    marginBottom: spacing.md,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  roomInfo: {
    flex: 1,
  },
  roomNumber: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  roomFloor: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  roomDetails: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  amenityTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.sm,
  },
  amenityText: {
    fontSize: typography.fontSize.xs,
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
