import { ValueObject } from '../../../../shared/kernel/domain/value-object';

/**
 * Room Status Value Object
 * Represents the current state of a room
 */
export class RoomStatus extends ValueObject<'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'> {
  private static readonly AVAILABLE = 'AVAILABLE' as const;
  private static readonly OCCUPIED = 'OCCUPIED' as const;
  private static readonly MAINTENANCE = 'MAINTENANCE' as const;

  private constructor(value: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE') {
    super(value);
  }

  static get Available(): RoomStatus {
    return new RoomStatus(this.AVAILABLE);
  }

  static get Occupied(): RoomStatus {
    return new RoomStatus(this.OCCUPIED);
  }

  static get Maintenance(): RoomStatus {
    return new RoomStatus(this.MAINTENANCE);
  }

  static fromString(value: string): RoomStatus {
    switch (value) {
      case RoomStatus.AVAILABLE:
        return RoomStatus.Available;
      case RoomStatus.OCCUPIED:
        return RoomStatus.Occupied;
      case RoomStatus.MAINTENANCE:
        return RoomStatus.Maintenance;
      default:
        throw new Error(`Invalid room status: ${value}`);
    }
  }

  isAvailable(): boolean {
    return this.value === RoomStatus.AVAILABLE;
  }

  isOccupied(): boolean {
    return this.value === RoomStatus.OCCUPIED;
  }

  isMaintenance(): boolean {
    return this.value === RoomStatus.MAINTENANCE;
  }

  toString(): string {
    return this.value;
  }
}