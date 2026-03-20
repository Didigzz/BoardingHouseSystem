import { z } from "zod";
import {
  createUtilityReadingSchema,
  updateUtilityReadingSchema,
  UtilityTypeEnum
} from "@havenspace/validation";
import { PrismaUtilityRepository } from "../infrastructure/persistence/prisma-utility.repository";
import { UtilityService } from "../domain/services/utility.service";
import { CreateUtilityReadingHandler } from "../application/handlers/create-utility-reading.handler";
import { GetUtilityReadingHandler } from "../application/handlers/get-utility-reading.handler";
import { ListUtilityReadingsHandler } from "../application/handlers/list-utility-readings.handler";
import { GetLatestReadingHandler } from "../application/handlers/get-latest-reading.handler";
import { GetConsumptionSummaryHandler } from "../application/handlers/get-consumption-summary.handler";
import type { PrismaClientType } from "@havenspace/database";

type ProtectedProcedure = unknown;

export const createUtilityRouter = (protectedProcedure: ProtectedProcedure) => {
  return {
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
      .handler(async ({ context, input }: { context: { db: PrismaClientType }; input?: unknown }) => {
        const repository = new PrismaUtilityRepository(context.db);
        const handler = new ListUtilityReadingsHandler(repository);
        return handler.handle(input);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.string() }))
      .handler(async ({ context, input }: { context: { db: PrismaClientType }; input: { id: string } }) => {
        const repository = new PrismaUtilityRepository(context.db);
        const handler = new GetUtilityReadingHandler(repository);
        return handler.handle(input);
      }),

    create: protectedProcedure
      .input(createUtilityReadingSchema)
      .handler(async ({ context, input }: { context: { db: PrismaClientType }; input: unknown }) => {
        const repository = new PrismaUtilityRepository(context.db);
        const service = new UtilityService(repository);
        const handler = new CreateUtilityReadingHandler(repository, service);
        return handler.handle(input);
      }),

    update: protectedProcedure
      .input(updateUtilityReadingSchema)
      .handler(async ({ context, input }: { context: { db: PrismaClientType }; input: unknown }) => {
        const { id, ...data } = input as { id: string } & Record<string, unknown>;
        return context.db.utilityReading.update({
          where: { id },
          data,
        });
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .handler(async ({ context, input }: { context: { db: PrismaClientType }; input: { id: string } }) => {
        return context.db.utilityReading.delete({
          where: { id: input.id },
        });
      }),

    getLatestByRoom: protectedProcedure
      .input(z.object({ roomId: z.string(), type: UtilityTypeEnum }))
      .handler(async ({ context, input }: { context: { db: PrismaClientType }; input: unknown }) => {
        const repository = new PrismaUtilityRepository(context.db);
        const handler = new GetLatestReadingHandler(repository);
        return handler.handle(input);
      }),

    getConsumptionSummary: protectedProcedure
      .input(
        z.object({
          roomId: z.string().optional(),
          type: UtilityTypeEnum.optional(),
          months: z.number().default(6),
        })
      )
      .handler(async ({ context, input }: { context: { db: PrismaClientType }; input: unknown }) => {
        const repository = new PrismaUtilityRepository(context.db);
        const service = new UtilityService(repository);
        const handler = new GetConsumptionSummaryHandler(service);
        return handler.handle(input);
      }),
  };
};
