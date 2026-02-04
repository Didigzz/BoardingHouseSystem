import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

/**
 * Admin router for managing users and platform operations
 */
export const createAdminRouter = (
  protectedProcedure: any,
  adminProcedure: any
) => {
  return createTRPCRouter({
    // Get all users with pagination and filtering
    getUsers: adminProcedure
      .input(
        z.object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(20),
          role: z.enum(["LANDLORD", "BOARDER", "ADMIN"]).optional(),
          status: z.enum(["PENDING", "APPROVED", "SUSPENDED"]).optional(),
          search: z.string().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const { page, limit, role, status, search } = input;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (role) where.role = role;
        if (status) where.status = status;
        if (search) {
          where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ];
        }

        const [users, total] = await Promise.all([
          ctx.db.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              status: true,
              phone: true,
              image: true,
              createdAt: true,
              updatedAt: true,
              landlordProfile: {
                select: {
                  businessName: true,
                  isVerified: true,
                },
              },
            },
          }),
          ctx.db.user.count({ where }),
        ]);

        return {
          users,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }),

    // Get pending landlord approvals
    getPendingLandlords: adminProcedure.query(async ({ ctx }) => {
      return ctx.db.user.findMany({
        where: {
          role: "LANDLORD",
          status: "PENDING",
        },
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          createdAt: true,
          landlordProfile: {
            select: {
              businessName: true,
              businessAddress: true,
              businessPhone: true,
              identificationDocument: true,
              businessPermit: true,
            },
          },
        },
      });
    }),

    // Approve a landlord
    approveLandlord: adminProcedure
      .input(z.object({ userId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
        });

        if (!user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        if (user.role !== "LANDLORD") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User is not a landlord",
          });
        }

        const updatedUser = await ctx.db.user.update({
          where: { id: input.userId },
          data: {
            status: "APPROVED",
            landlordProfile: {
              update: {
                isVerified: true,
                reviewedAt: new Date(),
                reviewedBy: ctx.session.user.id,
              },
            },
          },
        });

        // TODO: Send approval email notification

        return { success: true, user: updatedUser };
      }),

    // Reject a landlord application
    rejectLandlord: adminProcedure
      .input(
        z.object({
          userId: z.string(),
          reason: z.string().min(10, "Please provide a reason"),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
        });

        if (!user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        if (user.role !== "LANDLORD") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User is not a landlord",
          });
        }

        // Update user status and add rejection note
        const updatedUser = await ctx.db.user.update({
          where: { id: input.userId },
          data: {
            status: "SUSPENDED", // Use SUSPENDED for rejected
            landlordProfile: {
              update: {
                isVerified: false,
                reviewedAt: new Date(),
                reviewedBy: ctx.session.user.id,
                notes: input.reason,
              },
            },
          },
        });

        // TODO: Send rejection email notification with reason

        return { success: true, user: updatedUser };
      }),

    // Suspend a user
    suspendUser: adminProcedure
      .input(
        z.object({
          userId: z.string(),
          reason: z.string().min(10, "Please provide a reason"),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
        });

        if (!user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        if (user.role === "ADMIN") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot suspend admin users",
          });
        }

        const updatedUser = await ctx.db.user.update({
          where: { id: input.userId },
          data: { status: "SUSPENDED" },
        });

        // TODO: Send suspension notification email

        return { success: true, user: updatedUser };
      }),

    // Reactivate a suspended user
    reactivateUser: adminProcedure
      .input(z.object({ userId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
        });

        if (!user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        if (user.status !== "SUSPENDED") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User is not suspended",
          });
        }

        const updatedUser = await ctx.db.user.update({
          where: { id: input.userId },
          data: { status: "APPROVED" },
        });

        // TODO: Send reactivation notification email

        return { success: true, user: updatedUser };
      }),

    // Get dashboard stats
    getDashboardStats: adminProcedure.query(async ({ ctx }) => {
      const [
        totalUsers,
        totalLandlords,
        totalBoarders,
        pendingApprovals,
        totalProperties,
        activeBookings,
      ] = await Promise.all([
        ctx.db.user.count(),
        ctx.db.user.count({ where: { role: "LANDLORD" } }),
        ctx.db.user.count({ where: { role: "BOARDER" } }),
        ctx.db.user.count({ where: { role: "LANDLORD", status: "PENDING" } }),
        ctx.db.property.count(),
        ctx.db.booking.count({
          where: { status: { in: ["CONFIRMED", "ACTIVE"] } },
        }),
      ]);

      return {
        totalUsers,
        totalLandlords,
        totalBoarders,
        pendingApprovals,
        totalProperties,
        activeBookings,
      };
    }),

    // Get user details by ID
    getUserById: adminProcedure
      .input(z.object({ userId: z.string() }))
      .query(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
          include: {
            landlordProfile: true,
            boarder: {
              include: {
                bookings: {
                  take: 5,
                  orderBy: { createdAt: "desc" },
                },
              },
            },
          },
        });

        if (!user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        return user;
      }),
  });
};
