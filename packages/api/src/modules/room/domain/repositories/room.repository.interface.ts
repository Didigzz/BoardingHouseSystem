import { Room } from '../entities/room.entity';
import { RoomStatus } from '../value-objects/room-status.vo';

export interface RoomFilters {
  status?: RoomStatus;
  search?: string;
  floor?: number;
}

export interface RoomStats {
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
}

/**
 * Room Repository Interface
 * Defines the contract for room data access
 */
export interface IRoomRepository {
  findById(id: string): Promise<Room | null>;
  findAll(filters?: RoomFilters): Promise<Room[]>;
  save(room: Room): Promise<Room>;
  delete(id: string): Promise<void>;
  getStats(): Promise<RoomStats>;
  existsByRoomNumber(roomNumber: string, excludeId?: string): Promise<boolean>;
}