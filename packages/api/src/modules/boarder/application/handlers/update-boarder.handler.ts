import { UpdateBoarderCommand } from '../commands/update-boarder.command';
import { Boarder } from '../../domain/entities/boarder.entity';
import { IBoarderRepository } from '../../domain/repositories/boarder.repository.interface';
import { BoarderService } from '../../domain/services/boarder.service';

export class UpdateBoarderHandler {
  constructor(
    private boarderRepository: IBoarderRepository,
    private boarderService: BoarderService
  ) {}

  async handle(command: UpdateBoarderCommand): Promise<Boarder> {
    // Find existing boarder
    const boarder = await this.boarderRepository.findById(command.id);
    if (!boarder) {
      throw new Error(`Boarder with id ${command.id} not found`);
    }

    // Validate email if provided
    if (command.email) {
      const validation = this.boarderService.validateBoarderData({
        firstName: command.firstName || boarder.firstName,
        lastName: command.lastName || boarder.lastName,
        email: command.email,
        moveInDate: command.moveInDate || boarder.moveInDate,
      });
      if (!validation.valid) {
        throw new Error(validation.errors.join(', '));
      }

      // Check if email is unique (excluding current boarder)
      const isUnique = await this.boarderService.isEmailUnique(
        command.email,
        command.id
      );
      if (!isUnique) {
        throw new Error(`Email ${command.email} already exists`);
      }
    }

    // Update boarder details
    boarder.updatePersonalInfo({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      phone: command.phone,
      emergencyContact: command.emergencyContact,
      emergencyPhone: command.emergencyPhone,
      moveInDate: command.moveInDate,
      moveOutDate: command.moveOutDate,
      roomId: command.roomId,
    });

    // Handle activation/deactivation
    if (command.isActive !== undefined) {
      if (command.isActive) {
        boarder.reactivate();
      } else {
        if (command.moveOutDate) {
          boarder.deactivate(command.moveOutDate);
        } else {
          boarder.deactivate(new Date());
        }
      }
    }

    // Save boarder
    return await this.boarderRepository.save(boarder);
  }
}