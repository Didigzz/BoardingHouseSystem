import { ListRoomsQuery } from '../queries/list-rooms.query';
import { Room } from '../../domain/entities/room.entity';
import { RoomStatus } from '../../domain/value-objects/room-status.vo';
import { IRoomRepository, RoomFilters } from '../../domain/repositories/room.repository.interface';

export class ListRoomsHandler {
  constructor(private roomRepository: IRoomRepository) {}

  async handle(query?: ListRoomsQuery): Promise<Room[]> {
    const filters: RoomFilters = {};

    if (query?.status) {
      filters.status = RoomStatus.fromString(query.status);
    }

    if (query?.search) {
      filters.search = query.search;
    }

    if (query?.floor) {
      filters.floor = query.floor;
    }

    return await this.roomRepository.findAll(filters);
  }
}