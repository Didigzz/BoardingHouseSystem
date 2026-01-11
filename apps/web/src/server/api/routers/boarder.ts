import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const boarderRouter = createTRPCRouter({
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
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        emergencyContact: z.string().optional(),
        emergencyPhone: z.string().optional(),
        moveInDate: z.date(),
        roomId: z.string().optional(),
      })
    )
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
    .input(
      z.object({
        id: z.string(),
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        emergencyContact: z.string().optional(),
        emergencyPhone: z.string().optional(),
        moveInDate: z.date().optional(),
        moveOutDate: z.date().optional(),
        isActive: z.boolean().optional(),
        roomId: z.string().nullable().optional(),
      })
    )
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
