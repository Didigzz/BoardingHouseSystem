import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

/**
 * Booking router for managing property bookings
 */
export const createBookingRouter = (
  protectedProcedure: any,
  boarderProcedure?: any,
  landlordProcedure?: any
) => {
  const boarderProc = boarderProcedure || protectedProcedure;
  const landlordProc = landlordProcedure || protectedProcedure;

  return createTRPCRouter({
    // Create a new booking (boarder)
    create: boarderProc
      .input(
        z.object({
          propertyId: z.string(),
          checkInDate: z.string().transform((val) => new Date(val)),
          checkOutDate: z
            .string()
            .transform((val) => new Date(val))
            .optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Get boarder profile
        const boarder = await ctx.db.boarder.findUnique({
          where: { userId: ctx.session.user.id },
        });

        if (!boarder) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Boarder profile not found",
          });
        }

        // Check property exists and is active
        const property = await ctx.db.property.findUnique({
          where: { id: input.propertyId },
        });

        if (!property || !property.isActive) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Property not found or not available",
          });
        }

        if (property.availableRooms <= 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No rooms available for this property",
          });
        }

        // Check for existing pending booking
        const existingBooking = await ctx.db.booking.findFirst({
          where: {
            boarderId: boarder.id,
            propertyId: input.propertyId,
            status: "PENDING",
          },
        });

        if (existingBooking) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You already have a pending booking for this property",
          });
        }

        return ctx.db.booking.create({
          data: {
            boarderId: boarder.id,
            propertyId: input.propertyId,
            checkInDate: input.checkInDate,
            checkOutDate: input.checkOutDate,
            totalPrice: property.price,
            status: "PENDING",
          },
        });
      }),

    // Get boarder's bookings
    getMyBookings: boarderProc
      .input(
        z.object({
          status: z
            .enum(["PENDING", "CONFIRMED", "ACTIVE", "COMPLETED", "CANCELLED"])
            .optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const boarder = await ctx.db.boarder.findUnique({
          where: { userId: ctx.session.user.id },
        });

        if (!boarder) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Boarder profile not found",
          });
        }

        const where: any = { boarderId: boarder.id };
        if (input.status) where.status = input.status;

        return ctx.db.booking.findMany({
          where,
          orderBy: { createdAt: "desc" },
          include: {
            property: {
              include: {
                landlord: {
                  select: {
                    user: {
                      select: {
                        name: true,
                        phone: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }),

    // Get landlord's bookings (for their properties)
    getLandlordBookings: landlordProc
      .input(
        z.object({
          propertyId: z.string().optional(),
          status: z
            .enum(["PENDING", "CONFIRMED", "ACTIVE", "COMPLETED", "CANCELLED"])
            .optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const landlordProfile = await ctx.db.landlordProfile.findUnique({
          where: { userId: ctx.session.user.id },
        });

        if (!landlordProfile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Landlord profile not found",
          });
        }

        const where: any = {
          property: { landlordId: landlordProfile.id },
        };
        if (input.propertyId) where.propertyId = input.propertyId;
        if (input.status) where.status = input.status;

        return ctx.db.booking.findMany({
          where,
          orderBy: { createdAt: "desc" },
          include: {
            property: true,
            boarder: {
              select: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    phone: true,
                    image: true,
                  },
                },
              },
            },
          },
        });
      }),

    // Confirm a booking (landlord)
    confirm: landlordProc
      .input(z.object({ bookingId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const landlordProfile = await ctx.db.landlordProfile.findUnique({
          where: { userId: ctx.session.user.id },
        });

        if (!landlordProfile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Landlord profile not found",
          });
        }

        // Verify booking belongs to landlord's property
        const booking = await ctx.db.booking.findFirst({
          where: {
            id: input.bookingId,
            property: { landlordId: landlordProfile.id },
            status: "PENDING",
          },
          include: { property: true },
        });

        if (!booking) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Booking not found or already processed",
          });
        }

        // Update booking and decrement available rooms
        const [updatedBooking] = await ctx.db.$transaction([
          ctx.db.booking.update({
            where: { id: input.bookingId },
            data: { status: "CONFIRMED" },
          }),
          ctx.db.property.update({
            where: { id: booking.propertyId },
            data: { availableRooms: { decrement: 1 } },
          }),
        ]);

        // TODO: Send confirmation email to boarder

        return updatedBooking;
      }),

    // Reject a booking (landlord)
    reject: landlordProc
      .input(
        z.object({
          bookingId: z.string(),
          reason: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const landlordProfile = await ctx.db.landlordProfile.findUnique({
          where: { userId: ctx.session.user.id },
        });

        if (!landlordProfile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Landlord profile not found",
          });
        }

        // Verify booking belongs to landlord's property
        const booking = await ctx.db.booking.findFirst({
          where: {
            id: input.bookingId,
            property: { landlordId: landlordProfile.id },
            status: "PENDING",
          },
        });

        if (!booking) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Booking not found or already processed",
          });
        }

        return ctx.db.booking.update({
          where: { id: input.bookingId },
          data: { status: "CANCELLED" },
        });
      }),

    // Cancel a booking (boarder - only for pending/confirmed)
    cancel: boarderProc
      .input(z.object({ bookingId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const boarder = await ctx.db.boarder.findUnique({
          where: { userId: ctx.session.user.id },
        });

        if (!boarder) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Boarder profile not found",
          });
        }

        const booking = await ctx.db.booking.findFirst({
          where: {
            id: input.bookingId,
            boarderId: boarder.id,
            status: { in: ["PENDING", "CONFIRMED"] },
          },
        });

        if (!booking) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Booking not found or cannot be cancelled",
          });
        }

        // If confirmed, increment available rooms
        if (booking.status === "CONFIRMED") {
          await ctx.db.property.update({
            where: { id: booking.propertyId },
            data: { availableRooms: { increment: 1 } },
          });
        }

        return ctx.db.booking.update({
          where: { id: input.bookingId },
          data: { status: "CANCELLED" },
        });
      }),
  });
};
