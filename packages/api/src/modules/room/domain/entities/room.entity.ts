import { AggregateRoot } from '../../../../shared/kernel/domain/aggregate-root';
import { RoomStatus } from './room-status.vo';

export interface RoomProps {
  id: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  monthlyRate: number;
  description?: string;
  amenities: string[];
  status: RoomStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Room Aggregate Root
 * Represents a room in the boarding house
 */
export class Room extends AggregateRoot<RoomProps> {
  protected props: RoomProps;

  constructor(props: RoomProps) {
    super(props.id);
    this.props = props;
  }

  get roomNumber(): string {
    return this.props.roomNumber;
  }

  get floor(): number {
    return this.props.floor;
  }

  get capacity(): number {
    return this.props.capacity;
  }

  get monthlyRate(): number {
    return this.props.monthlyRate;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get amenities(): string[] {
    return [...this.props.amenities];
  }

  get status(): RoomStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  /**
   * Check if room is available
   */
  isAvailable(): boolean {
    return this.props.status.isAvailable();
  }

  /**
   * Mark room as available
   */
  markAsAvailable(): void {
    if (this.props.status.isAvailable()) {
      return;
    }
    this.props.status = RoomStatus.Available;
    this.props.updatedAt = new Date();
    // TODO: Emit RoomStatusChangedEvent
  }

  /**
   * Mark room as occupied
   */
  markAsOccupied(): void {
    if (this.props.status.isOccupied()) {
      return;
    }
    this.props.status = RoomStatus.Occupied;
    this.props.updatedAt = new Date();
    // TODO: Emit RoomStatusChangedEvent
  }

  /**
   * Mark room as under maintenance
   */
  markAsMaintenance(): void {
    if (this.props.status.isMaintenance()) {
      return;
    }
    this.props.status = RoomStatus.Maintenance;
    this.props.updatedAt = new Date();
    // TODO: Emit RoomStatusChangedEvent
  }

  /**
   * Update room details
   */
  updateDetails(details: Partial<Omit<RoomProps, 'id' | 'createdAt' | 'status'>>): void {
    this.props = {
      ...this.props,
      ...details,
      updatedAt: new Date(),
    };
  }

  /**
   * Check if room is at full capacity
   */
  isAtCapacity(currentOccupancy: number): boolean {
    return currentOccupancy >= this.props.capacity;
  }

  static create(props: Omit<RoomProps, 'id' | 'createdAt' | 'updatedAt'>): Room {
    return new Room({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}