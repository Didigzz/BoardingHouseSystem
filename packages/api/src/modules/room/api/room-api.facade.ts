import { IRoomApi } from './room-api.interface';
import { RoomModule } from '../room.module';
import { Room } from '../domain/entities/room.entity';
import { RoomStats } from '../../../shared/src/entities/room/model/types';

export class RoomApiFacade implements IRoomApi {
  private static instance: RoomApiFacade;

  private constructor() {}

  static getInstance(): RoomApiFacade {
    if (!RoomApiFacade.instance) {
      RoomApiFacade.instance = new RoomApiFacade();
    }
    return RoomApiFacade.instance;
  }

  async createRoom(data: any): Promise<Room> {
    const module = RoomModule.getInstance();
    return module.getHandlers().createRoom.handle(data);
  }

  async updateRoom(id: string, data: any): Promise<Room> {
    const module = RoomModule.getInstance();
    return module.getHandlers().updateRoom.handle({ id, ...data });
  }

  async deleteRoom(id: string): Promise<void> {
    const module = RoomModule.getInstance();
    await module.getHandlers().deleteRoom.handle({ id });
  }

  async getRoomById(id: string): Promise<Room | null> {
    const module = RoomModule.getInstance();
    return module.getHandlers().getRoom.handle({ id });
  }

  async listRooms(filters?: any): Promise<Room[]> {
    const module = RoomModule.getInstance();
    return module.getHandlers().listRooms.handle(filters);
  }

  async getRoomStats(): Promise<RoomStats> {
    const module = RoomModule.getInstance();
    return module.getHandlers().getRoomStats.handle({});
  }
}