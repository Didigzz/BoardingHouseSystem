import { UpdateRoomCommand } from '../commands/update-room.command';
import { Room } from '../../domain/entities/room.entity';
import { RoomStatus } from '../../domain/value-objects/room-status.vo';
import { IRoomRepository } from '../../domain/repositories/room.repository.interface';
import { RoomService } from '../../domain/services/room.service';

export class UpdateRoomHandler {
  constructor(
    private roomRepository: IRoomRepository,
    private roomService: RoomService
  ) {}

  async handle(command: UpdateRoomCommand): Promise<Room> {
    // Find existing room
    const room = await this.roomRepository.findById(command.id);
    if (!room) {
      throw new Error(`Room with id ${command.id} not found`);
    }

    // Validate room data if provided
    if (command.roomNumber || command.floor || command.capacity || command.monthlyRate) {
      const validation = this.roomService.validateRoomData({
        roomNumber: command.roomNumber || room.roomNumber,
        floor: command.floor || room.floor,
        capacity: command.capacity || room.capacity,
        monthlyRate: command.monthlyRate || room.monthlyRate,
      });
      if (!validation.valid) {
        throw new Error(validation.errors.join(', '));
      }
    }

    // Check if room number is unique (excluding current room)
    if (command.roomNumber) {
      const isUnique = await this.roomService.isRoomNumberUnique(
        command.roomNumber,
        command.id
      );
      if (!isUnique) {
        throw new Error(`Room number ${command.roomNumber} already exists`);
      }
    }

    // Update room details
    room.updateDetails({
      roomNumber: command.roomNumber,
      floor: command.floor,
      capacity: command.capacity,
      monthlyRate: command.monthlyRate,
      description: command.description,
      amenities: command.amenities,
    });

    // Update status if provided
    if (command.status) {
      const newStatus = RoomStatus.fromString(command.status);
      if (newStatus.isAvailable()) {
        room.markAsAvailable();
      } else if (newStatus.isOccupied()) {
        room.markAsOccupied();
      } else if (newStatus.isMaintenance()) {
        room.markAsMaintenance();
      }
    }

    // Save room
    return await this.roomRepository.save(room);
  }
}