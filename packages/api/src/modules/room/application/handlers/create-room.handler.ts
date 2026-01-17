import { CreateRoomCommand } from '../commands/create-room.command';
import { Room } from '../../domain/entities/room.entity';
import { RoomStatus } from '../../domain/value-objects/room-status.vo';
import { IRoomRepository } from '../../domain/repositories/room.repository.interface';
import { RoomService } from '../../domain/services/room.service';

export class CreateRoomHandler {
  constructor(
    private roomRepository: IRoomRepository,
    private roomService: RoomService
  ) {}

  async handle(command: CreateRoomCommand): Promise<Room> {
    // Validate room data
    const validation = this.roomService.validateRoomData(command);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    // Check if room number is unique
    const isUnique = await this.roomService.isRoomNumberUnique(command.roomNumber);
    if (!isUnique) {
      throw new Error(`Room number ${command.roomNumber} already exists`);
    }

    // Create room entity
    const room = Room.create({
      ...command,
      status: RoomStatus.Available,
    });

    // Save room
    return await this.roomRepository.save(room);
  }
}