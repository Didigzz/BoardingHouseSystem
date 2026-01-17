import { CreateBoarderCommand } from '../commands/create-boarder.command';
import { Boarder } from '../../domain/entities/boarder.entity';
import { IBoarderRepository } from '../../domain/repositories/boarder.repository.interface';
import { BoarderService } from '../../domain/services/boarder.service';

export class CreateBoarderHandler {
  constructor(
    private boarderRepository: IBoarderRepository,
    private boarderService: BoarderService
  ) {}

  async handle(command: CreateBoarderCommand): Promise<Boarder> {
    // Validate boarder data
    const validation = this.boarderService.validateBoarderData(command);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    // Check if email is unique
    const isUnique = await this.boarderService.isEmailUnique(command.email);
    if (!isUnique) {
      throw new Error(`Email ${command.email} already exists`);
    }

    // Create boarder entity
    const boarder = Boarder.create({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      phone: command.phone,
      emergencyContact: command.emergencyContact,
      emergencyPhone: command.emergencyPhone,
      moveInDate: command.moveInDate,
      roomId: command.roomId,
      isActive: true,
    });

    // Assign room if provided
    if (command.roomId) {
      boarder.assignRoom(command.roomId);
    }

    // Save boarder
    return await this.boarderRepository.save(boarder);
  }
}