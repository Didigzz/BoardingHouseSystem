import { DeleteRoomCommand } from '../commands/delete-room.command';
import { IRoomRepository } from '../../domain/repositories/room.repository.interface';

export class DeleteRoomHandler {
  constructor(private roomRepository: IRoomRepository) {}

  async handle(command: DeleteRoomCommand): Promise<void> {
    // Check if room exists
    const room = await this.roomRepository.findById(command.id);
    if (!room) {
      throw new Error(`Room with id ${command.id} not found`);
    }

    // Check if room has active boarders
    if (room.status.isOccupied()) {
      throw new Error('Cannot delete a room with active boarders');
    }

    // Delete room
    await this.roomRepository.delete(command.id);
  }
}