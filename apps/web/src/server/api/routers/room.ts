import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { RoomStatus } from "@prisma/client";

export const roomRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z
        .object({
          status: z.nativeEnum(RoomStatus).optional(),
          search: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.room.findMany({
        where: {
          status: input?.status,
          roomNumber: input?.search
            ? { contains: input.search, mode: "insensitive" }
            : undefined,
        },
        include: {
          boarders: {
            where: { isActive: true },
            select: { id: true, firstName: true, lastName: true },
          },
          _count: {
            select: { boarders: { where: { isActive: true } } },
          },
        },
        orderBy: { roomNumber: "asc" },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.room.findUnique({
        where: { id: input.id },
        include: {
          boarders: { where: { isActive: true } },
          utilityReadings: {
            orderBy: { readingDate: "desc" },
            take: 10,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        roomNumber: z.string().min(1),
        floor: z.number().int().positive().default(1),
        capacity: z.number().int().positive().default(1),
        monthlyRate: z.number().positive(),
        description: z.string().optional(),
        amenities: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        roomNumber: z.string().min(1).optional(),
        floor: z.number().int().positive().optional(),
        capacity: z.number().int().positive().optional(),
        monthlyRate: z.number().positive().optional(),
        description: z.string().optional(),
        amenities: z.array(z.string()).optional(),
        status: z.nativeEnum(RoomStatus).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.room.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.delete({
        where: { id: input.id },
      });
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const [total, available, occupied, maintenance] = await Promise.all([
      ctx.db.room.count(),
      ctx.db.room.count({ where: { status: "AVAILABLE" } }),
      ctx.db.room.count({ where: { status: "OCCUPIED" } }),
      ctx.db.room.count({ where: { status: "MAINTENANCE" } }),
    ]);

    return { total, available, occupied, maintenance };
  }),
});
