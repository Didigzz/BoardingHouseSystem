import { z } from "zod";
import { createTRPCRouter, publicProcedure, createProtectedProcedure } from "../trpc";
import { 
  createBoarderSchema, 
  updateBoarderSchema,
  searchSchema 
} from "@bhms/validation";

// This will be provided by the platform-specific implementation
// For Next.js, this will include NextAuth session middleware
export const createBoarderRouter = (protectedProcedure: any) => {
  return createTRPCRouter({
    getAll: protectedProcedure
      .input(
        z
          .object({
            isActive: z.boolean().optional(),
            search: z.string().optional(),
            roomId: z.string().optional(),
          })
          .optional()
      )
      .query(async ({ ctx, input }) => {
        return ctx.db.boarder.findMany({
          where: {
            isActive: input?.isActive,
            roomId: input?.roomId,
            OR: input?.search
              ? [
                  { firstName: { contains: input.search, mode: "insensitive" } },
                  { lastName: { contains: input.search, mode: "insensitive" } },
                  { email: { contains: input.search, mode: "insensitive" } },
                ]
              : undefined,
          },
          include: {
            room: {
              select: { id: true, roomNumber: true, monthlyRate: true },
            },
            _count: {
              select: { payments: true },
            },
          },
          orderBy: { lastName: "asc" },
        });
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        return ctx.db.boarder.findUnique({
          where: { id: input.id },
          include: {
            room: true,
            payments: {
              orderBy: { dueDate: "desc" },
              take: 10,
            },
          },
        });
      }),

    create: protectedProcedure
      .input(createBoarderSchema)
      .mutation(async ({ ctx, input }) => {
        const accessCode = `${input.firstName.charAt(0)}${input.lastName.charAt(0)}${Date.now().toString(36)}`.toUpperCase();
        
        const boarder = await ctx.db.boarder.create({
          data: {
            ...input,
            accessCode,
          },
        });

        // Update room status if assigned
        if (input.roomId) {
          const room = await ctx.db.room.findUnique({
            where: { id: input.roomId },
            include: { _count: { select: { boarders: { where: { isActive: true } } } } },
          });
          
          if (room && room._count.boarders >= room.capacity) {
            await ctx.db.room.update({
              where: { id: input.roomId },
              data: { status: "OCCUPIED" },
            });
          }
        }

        return boarder;
      }),

    update: protectedProcedure
      .input(updateBoarderSchema)
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return ctx.db.boarder.update({
          where: { id },
          data,
        });
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return ctx.db.boarder.delete({
          where: { id: input.id },
        });
      }),

    assignRoom: protectedProcedure
      .input(
        z.object({
          boarderId: z.string(),
          roomId: z.string().nullable(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const boarder = await ctx.db.boarder.update({
          where: { id: input.boarderId },
          data: { roomId: input.roomId },
        });

        // Update room statuses
        if (input.roomId) {
          const room = await ctx.db.room.findUnique({
            where: { id: input.roomId },
            include: { _count: { select: { boarders: { where: { isActive: true } } } } },
          });
          
          if (room && room._count.boarders >= room.capacity) {
            await ctx.db.room.update({
              where: { id: input.roomId },
              data: { status: "OCCUPIED" },
            });
          }
        }

        return boarder;
      }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      const [total, active, inactive] = await Promise.all([
        ctx.db.boarder.count(),
        ctx.db.boarder.count({ where: { isActive: true } }),
        ctx.db.boarder.count({ where: { isActive: false } }),
      ]);

      return { total, active, inactive };
    }),
  });
};