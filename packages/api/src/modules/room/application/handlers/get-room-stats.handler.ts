import { GetRoomStatsQuery } from '../queries/get-room-stats.query';
import { RoomStats } from '../queries/get-room-stats.query';
import { IRoomRepository } from '../../domain/repositories/room.repository.interface';

export class GetRoomStatsHandler {
  constructor(private roomRepository: IRoomRepository) {}

  async handle(_query: GetRoomStatsQuery): Promise<RoomStats> {
    return await this.roomRepository.getStats();
  }
}