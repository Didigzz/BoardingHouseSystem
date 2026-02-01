import { Room } from '../domain/entities/room.entity';
import { RoomStats } from '../../../shared/src/entities/room/model/types';

export interface IRoomApi {
  createRoom(data: any): Promise<Room>;
  updateRoom(id: string, data: any): Promise<Room>;
  deleteRoom(id: string): Promise<void>;
  getRoomById(id: string): Promise<Room | null>;
  listRooms(filters?: any): Promise<Room[]>;
  getRoomStats(): Promise<RoomStats>;
}