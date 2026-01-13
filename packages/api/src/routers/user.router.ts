import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { 
  registerSchema,
  updateUserSchema,
  changePasswordSchema
} from "@bhms/validation";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const createUserRouter = (protectedProcedure: any) => {
  return createTRPCRouter({
    register: publicProcedure
      .input(registerSchema)
      .mutation(async ({ ctx, input }) => {
        const existingUser = await ctx.db.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User with this email already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const user = await ctx.db.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            name: input.name,
            role: input.role,
          },
        });

        return { id: user.id, email: user.email, name: user.name };
      }),

    getProfile: protectedProcedure.query(async ({ ctx }) => {
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
      .mutation(async ({ ctx, input }) => {
        return ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: input,
        });
      }),

    changePassword: protectedProcedure
      .input(changePasswordSchema)
      .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
        });

        if (!user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        const isValid = await bcrypt.compare(input.currentPassword, user.password);

        if (!isValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Current password is incorrect",
          });
        }

        const hashedPassword = await bcrypt.hash(input.newPassword, 12);

        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { password: hashedPassword },
        });

        return { success: true };
      }),
  });
};