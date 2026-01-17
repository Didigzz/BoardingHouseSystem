import { GetRoomQuery } from '../queries/get-room.query';
import { Room } from '../../domain/entities/room.entity';
import { IRoomRepository } from '../../domain/repositories/room.repository.interface';

export class GetRoomHandler {
  constructor(private roomRepository: IRoomRepository) {}

  async handle(query: GetRoomQuery): Promise<Room | null> {
    return await this.roomRepository.findById(query.id);
  }
}