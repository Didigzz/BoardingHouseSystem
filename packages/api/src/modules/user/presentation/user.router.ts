import { z } from "zod";
import { publicProcedure } from "../../../orpc";
import {
  registerSchema,
  changePasswordSchema
} from "@havenspace/validation";
import { PrismaUserRepository } from "../infrastructure/persistence/prisma-user.repository";
import { UserService } from "../domain/services/user.service";
import { User } from "../domain/entities/user.entity";
import type { PrismaClientType } from "@havenspace/database";

type ProtectedProcedure = unknown;

interface UserContext {
  db: PrismaClientType;
  session: { user: { id: string } };
}

export const createUserRouter = (protectedProcedure: ProtectedProcedure) => {
  return {
    register: publicProcedure
      .input(registerSchema)
      .handler(async ({ context, input }: { context: unknown; input: unknown }) => {
        const repository = new PrismaUserRepository(context.db);
        const service = new UserService(repository);

        await service.validateEmail(input.email);
        const hashedPassword = await service.hashPassword(input.password);

        const user = User.create({
          email: input.email,
          password: hashedPassword,
          name: input.name,
          role: input.role,
        });

        const savedUser = await repository.save(user);

        return { id: savedUser.id, email: savedUser.email, name: savedUser.name };
      }),

    getProfile: protectedProcedure.handler(async ({ context }: { context: unknown }) => {
      const ctx = context as UserContext;
      return ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          image: true,
          createdAt: true,
        },
      });
    }),

    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1).optional(),
          image: z.string().optional(),
        })
      )
      .handler(async ({ context, input }: { context: unknown; input: unknown }) => {
        const ctx = context as UserContext;
        const inp = input as { name?: string; image?: string };
        return ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: inp,
        });
      }),

    changePassword: protectedProcedure
      .input(changePasswordSchema)
      .handler(async ({ context, input }: { context: unknown; input: unknown }) => {
        const ctx = context as UserContext;
        const inp = input as { currentPassword: string; newPassword: string };
        const repository = new PrismaUserRepository(ctx.db);
        const service = new UserService(repository);

        await service.updatePassword(
          ctx.session.user.id,
          inp.currentPassword,
          inp.newPassword
        );

        return { success: true };
      }),
  };
};
