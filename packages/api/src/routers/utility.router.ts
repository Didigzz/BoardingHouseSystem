import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { 
  createUtilityReadingSchema, 
  updateUtilityReadingSchema,
  UtilityTypeEnum
} from "@bhms/validation";

export const createUtilityRouter = (protectedProcedure: any) => {
  return createTRPCRouter({
    getAll: protectedProcedure
      .input(
        z
          .object({
            type: UtilityTypeEnum.optional(),
            roomId: z.string().optional(),
            startDate: z.date().optional(),
            endDate: z.date().optional(),
          })
          .optional()
      )
      .query(async ({ ctx, input }) => {
        return ctx.db.utilityReading.findMany({
          where: {
            type: input?.type,
            roomId: input?.roomId,
            readingDate: {
              gte: input?.startDate,
              lte: input?.endDate,
            },
          },
          include: {
            room: {
              select: { id: true, roomNumber: true },
            },
          },
          orderBy: { readingDate: "desc" },
        });
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        return ctx.db.utilityReading.findUnique({
          where: { id: input.id },
          include: { room: true },
        });
      }),

    create: protectedProcedure
      .input(createUtilityReadingSchema)
      .mutation(async ({ ctx, input }) => {
        return ctx.db.utilityReading.create({
          data: input,
        });
      }),

    update: protectedProcedure
      .input(updateUtilityReadingSchema)
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return ctx.db.utilityReading.update({
          where: { id },
          data,
        });
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return ctx.db.utilityReading.delete({
          where: { id: input.id },
        });
      }),

    getLatestByRoom: protectedProcedure
      .input(z.object({ roomId: z.string(), type: UtilityTypeEnum }))
      .query(async ({ ctx, input }) => {
        return ctx.db.utilityReading.findFirst({
          where: {
            roomId: input.roomId,
            type: input.type,
          },
          orderBy: { readingDate: "desc" },
        });
      }),

    getConsumptionSummary: protectedProcedure
      .input(
        z.object({
          roomId: z.string().optional(),
          type: UtilityTypeEnum.optional(),
          months: z.number().default(6),
        })
      )
      .query(async ({ ctx, input }) => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - input.months);

        const readings = await ctx.db.utilityReading.findMany({
          where: {
            roomId: input.roomId,
            type: input.type,
            readingDate: { gte: startDate },
          },
          include: { room: { select: { roomNumber: true } } },
          orderBy: { readingDate: "asc" },
        });

        return readings.map((reading) => ({
          id: reading.id,
          room: reading.room.roomNumber,
          type: reading.type,
          consumption:
            reading.currentReading.toNumber() - reading.previousReading.toNumber(),
          cost:
            (reading.currentReading.toNumber() - reading.previousReading.toNumber()) *
            reading.ratePerUnit.toNumber(),
          date: reading.readingDate,
        }));
      }),
  });
};