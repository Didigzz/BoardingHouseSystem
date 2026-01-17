import { DeleteBoarderCommand } from '../commands/delete-boarder.command';
import { IBoarderRepository } from '../../domain/repositories/boarder.repository.interface';

export class DeleteBoarderHandler {
  constructor(private boarderRepository: IBoarderRepository) {}

  async handle(command: DeleteBoarderCommand): Promise<void> {
    // Check if boarder exists
    const boarder = await this.boarderRepository.findById(command.id);
    if (!boarder) {
      throw new Error(`Boarder with id ${command.id} not found`);
    }

    // Check if boarder is active
    if (boarder.isActive) {
      throw new Error('Cannot delete an active boarder. Deactivate them first.');
    }

    // Delete boarder
    await this.boarderRepository.delete(command.id);
  }
}