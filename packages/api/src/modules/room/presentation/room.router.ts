import { z } from 'zod';
import { PrismaRoomRepository } from '../../infrastructure/persistence/prisma-room.repository';
import { RoomService } from '../../domain/services/room.service';
import { CreateRoomHandler } from '../../application/handlers/create-room.handler';
import { UpdateRoomHandler } from '../../application/handlers/update-room.handler';
import { DeleteRoomHandler } from '../../application/handlers/delete-room.handler';
import { GetRoomHandler } from '../../application/handlers/get-room.handler';
import { ListRoomsHandler } from '../../application/handlers/list-rooms.handler';
import { GetRoomStatsHandler } from '../../application/handlers/get-room-stats.handler';

type ProtectedProcedure = any;

export const createRoomRouter = (protectedProcedure: ProtectedProcedure) => {
  return {
    getAll: protectedProcedure
      .input(
        z
          .object({
            status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']).optional(),
            search: z.string().optional(),
            floor: z.number().optional(),
          })
          .optional()
      )
      .handler(async ({ context, input }: { context: any; input?: any }) => {
        // Initialize dependencies
        const roomRepository = new PrismaRoomRepository(context.db);
        const listRoomsHandler = new ListRoomsHandler(roomRepository);

        // Execute query
        const rooms = await listRoomsHandler.handle(input);

        // Convert to DTO format for response
        return rooms.map(room => ({
          id: room.id,
          roomNumber: room.roomNumber,
          floor: room.floor,
          capacity: room.capacity,
          monthlyRate: room.monthlyRate,
          description: room.description,
          amenities: room.amenities,
          status: room.status.toString(),
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        }));
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.string() }))
      .handler(async ({ context, input }: { context: any; input: { id: string } }) => {
        // Initialize dependencies
        const roomRepository = new PrismaRoomRepository(context.db);
        const getRoomHandler = new GetRoomHandler(roomRepository);

        // Execute query
        const room = await getRoomHandler.handle(input);

        if (!room) {
          return null;
        }

        // Convert to DTO format for response
        return {
          id: room.id,
          roomNumber: room.roomNumber,
          floor: room.floor,
          capacity: room.capacity,
          monthlyRate: room.monthlyRate,
          description: room.description,
          amenities: room.amenities,
          status: room.status.toString(),
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      }),

    create: protectedProcedure
      .input(
        z.object({
          roomNumber: z.string().min(1, "Room number is required"),
          floor: z.coerce.number().int().positive("Floor must be positive"),
          capacity: z.coerce.number().int().positive("Capacity must be positive"),
          monthlyRate: z.coerce.number().positive("Rate must be positive"),
          description: z.string().optional(),
          amenities: z.array(z.string()).default([]),
        })
      )
      .handler(async ({ context, input }: { context: any; input: any }) => {
        // Initialize dependencies
        const roomRepository = new PrismaRoomRepository(context.db);
        const roomService = new RoomService(roomRepository);
        const createRoomHandler = new CreateRoomHandler(roomRepository, roomService);

        // Execute command
        const room = await createRoomHandler.handle(input);

        // Convert to DTO format for response
        return {
          id: room.id,
          roomNumber: room.roomNumber,
          floor: room.floor,
          capacity: room.capacity,
          monthlyRate: room.monthlyRate,
          description: room.description,
          amenities: room.amenities,
          status: room.status.toString(),
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          roomNumber: z.string().min(1).optional(),
          floor: z.coerce.number().int().positive().optional(),
          capacity: z.coerce.number().int().positive().optional(),
          monthlyRate: z.coerce.number().positive().optional(),
          description: z.string().optional(),
          amenities: z.array(z.string()).optional(),
          status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']).optional(),
        })
      )
      .handler(async ({ context, input }: { context: any; input: any }) => {
        // Initialize dependencies
        const roomRepository = new PrismaRoomRepository(context.db);
        const roomService = new RoomService(roomRepository);
        const updateRoomHandler = new UpdateRoomHandler(roomRepository, roomService);

        // Execute command
        const room = await updateRoomHandler.handle(input);

        // Convert to DTO format for response
        return {
          id: room.id,
          roomNumber: room.roomNumber,
          floor: room.floor,
          capacity: room.capacity,
          monthlyRate: room.monthlyRate,
          description: room.description,
          amenities: room.amenities,
          status: room.status.toString(),
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .handler(async ({ context, input }: { context: any; input: { id: string } }) => {
        // Initialize dependencies
        const roomRepository = new PrismaRoomRepository(context.db);
        const deleteRoomHandler = new DeleteRoomHandler(roomRepository);

        // Execute command
        await deleteRoomHandler.handle(input);

        return { success: true };
      }),

    getStats: protectedProcedure.handler(async ({ context }: { context: any }) => {
      // Initialize dependencies
      const roomRepository = new PrismaRoomRepository(context.db);
      const getRoomStatsHandler = new GetRoomStatsHandler(roomRepository);

      // Execute query
      const stats = await getRoomStatsHandler.handle({});

      return stats;
    }),
  };
};