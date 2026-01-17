// Domain Layer
export { Boarder } from './domain/entities/boarder.entity';
export { IBoarderRepository, BoarderFilters, BoarderStats } from './domain/repositories/boarder.repository.interface';
export { BoarderService } from './domain/services/boarder.service';

// Application Layer
export { CreateBoarderCommand, CreateBoarderCommandSchema } from './application/commands/create-boarder.command';
export { UpdateBoarderCommand, UpdateBoarderCommandSchema } from './application/commands/update-boarder.command';
export { DeleteBoarderCommand, DeleteBoarderCommandSchema } from './application/commands/delete-boarder.command';
export { AssignRoomCommand, AssignRoomCommandSchema } from './application/commands/assign-room.command';
export { GetBoarderQuery, GetBoarderQuerySchema } from './application/queries/get-boarder.query';
export { ListBoardersQuery, ListBoardersQuerySchema } from './application/queries/list-boarders.query';
export { GetBoarderStatsQuery } from './application/queries/get-boarder-stats.query';
export { CreateBoarderHandler } from './application/handlers/create-boarder.handler';
export { UpdateBoarderHandler } from './application/handlers/update-boarder.handler';
export { DeleteBoarderHandler } from './application/handlers/delete-boarder.handler';
export { AssignRoomHandler } from './application/handlers/assign-room.handler';
export { GetBoarderHandler } from './application/handlers/get-boarder.handler';
export { ListBoardersHandler } from './application/handlers/list-boarders.handler';
export { GetBoarderStatsHandler } from './application/handlers/get-boarder-stats.handler';

// Infrastructure Layer
export { PrismaBoarderRepository } from './infrastructure/persistence/prisma-boarder.repository';
export {
  BoarderCreatedEvent,
  BoarderUpdatedEvent,
  BoarderDeletedEvent,
  BoarderDeactivatedEvent,
  BoarderReactivatedEvent,
  RoomAssignedEvent,
  RoomRemovedEvent,
  AccessCodeRegeneratedEvent,
} from './infrastructure/events/boarder-events';

// Presentation Layer
export { createBoarderRouter } from './presentation/boarder.router';
export { BoarderModule } from './boarder.module';
export * from './domain/events';
export * from './integration-events';
export * from './api';
export * from './config';