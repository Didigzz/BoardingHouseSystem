import { ValueObject } from '../../../../shared/kernel/domain/value-object';

/**
 * Room Status Value Object
 * Represents the current state of a room
 */
export class RoomStatus extends ValueObject<'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'> {
  public static readonly AVAILABLE = 'AVAILABLE' as const;
  public static readonly OCCUPIED = 'OCCUPIED' as const;
  public static readonly MAINTENANCE = 'MAINTENANCE' as const;

  private constructor(value: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE') {
    super(value);
  }

  public static get Available(): RoomStatus {
    return new RoomStatus(RoomStatus.AVAILABLE);
  }

  public static get Occupied(): RoomStatus {
    return new RoomStatus(RoomStatus.OCCUPIED);
  }

  public static get Maintenance(): RoomStatus {
    return new RoomStatus(RoomStatus.MAINTENANCE);
  }

  public static fromString(value: string): RoomStatus {
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

  public isAvailable(): boolean {
    return this.value === RoomStatus.AVAILABLE;
  }

  public isOccupied(): boolean {
    return this.value === RoomStatus.OCCUPIED;
  }

  public isMaintenance(): boolean {
    return this.value === RoomStatus.MAINTENANCE;
  }

  public toString(): string {
    return this.value;
  }
}