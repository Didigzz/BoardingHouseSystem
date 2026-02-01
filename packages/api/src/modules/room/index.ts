// Domain Layer
export { Room } from './domain/entities/room.entity';
export { RoomStatus } from './domain/value-objects/room-status.vo';
export type { IRoomRepository, RoomFilters, RoomStats } from './domain/repositories/room.repository.interface';
export { RoomService } from './domain/services/room.service';

// Application Layer
export type { CreateRoomCommand, CreateRoomCommandSchema } from './application/commands/create-room.command';
export type { UpdateRoomCommand, UpdateRoomCommandSchema } from './application/commands/update-room.command';
export type { DeleteRoomCommand, DeleteRoomCommandSchema } from './application/commands/delete-room.command';
export type { GetRoomQuery, GetRoomQuerySchema } from './application/queries/get-room.query';
export type { ListRoomsQuery, ListRoomsQuerySchema } from './application/queries/list-rooms.query';
export type { GetRoomStatsQuery } from './application/queries/get-room-stats.query';
export { CreateRoomHandler } from './application/handlers/create-room.handler';
export { UpdateRoomHandler } from './application/handlers/update-room.handler';
export { DeleteRoomHandler } from './application/handlers/delete-room.handler';
export { GetRoomHandler } from './application/handlers/get-room.handler';
export { ListRoomsHandler } from './application/handlers/list-rooms.handler';
export { GetRoomStatsHandler } from './application/handlers/get-room-stats.handler';

// Infrastructure Layer
export { PrismaRoomRepository } from './infrastructure/persistence/prisma-room.repository';
export { RoomCreatedEvent, RoomUpdatedEvent, RoomDeletedEvent, RoomStatusChangedEvent } from './infrastructure/events/room-events';

// Presentation Layer
export { createRoomRouter } from './presentation/room.router';
export { RoomModule } from './room.module';
export * from './domain/events';
export * from './integration-events';
export * from './api';
export * from './config';