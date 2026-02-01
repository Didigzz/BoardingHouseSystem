import { AssignRoomCommand } from '../commands/assign-room.command';
import { Boarder } from '../../domain/entities/boarder.entity';
import { IBoarderRepository } from '../../domain/repositories/boarder.repository.interface';
import { BoarderService } from '../../domain/services/boarder.service';

export class AssignRoomHandler {
  constructor(
    private boarderRepository: IBoarderRepository,
    private boarderService: BoarderService
  ) {}

  async handle(command: AssignRoomCommand): Promise<Boarder> {
    // Find boarder
    const boarder = await this.boarderRepository.findById(command.boarderId);
    if (!boarder) {
      throw new Error(`Boarder with id ${command.boarderId} not found`);
    }

    // Check if boarder can be assigned to a room
    if (command.roomId) {
      const canAssign = await this.boarderService.canAssignRoom(
        command.boarderId,
        command.roomId
      );
      if (!canAssign) {
        throw new Error('Boarder cannot be assigned to a room');
      }
      boarder.assignRoom(command.roomId);
    } else {
      boarder.removeRoom();
    }

    // Save boarder
    return await this.boarderRepository.save(boarder);
  }
}