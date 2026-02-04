import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

/**
 * Property router for managing boarding house properties
 */
export const createPropertyRouter = (
  protectedProcedure: any,
  landlordProcedure?: any
) => {
  // Use protectedProcedure if landlordProcedure is not provided
  const landlordProc = landlordProcedure || protectedProcedure;

  return createTRPCRouter({
    // Get all properties (public - for browsing)
    getAll: publicProcedure
      .input(
        z.object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(50).default(12),
          search: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          amenities: z.array(z.string()).optional(),
          city: z.string().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const { page, limit, search, minPrice, maxPrice, amenities, city } =
          input;
        const skip = (page - 1) * limit;

        const where: any = {
          isActive: true,
        };

        if (search) {
          where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } },
          ];
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
          where.price = {};
          if (minPrice !== undefined) where.price.gte = minPrice;
          if (maxPrice !== undefined) where.price.lte = maxPrice;
        }

        if (city) {
          where.city = { equals: city, mode: "insensitive" };
        }

        if (amenities && amenities.length > 0) {
          where.amenities = { hasEvery: amenities };
        }

        const [properties, total] = await Promise.all([
          ctx.db.property.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
              landlord: {
                select: {
                  user: {
                    select: {
                      name: true,
                      image: true,
                    },
                  },
                  isVerified: true,
                },
              },
            },
          }),
          ctx.db.property.count({ where }),
        ]);

        return {
          properties,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }),

    // Get single property by ID (public)
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        const property = await ctx.db.property.findUnique({
          where: { id: input.id },
          include: {
            landlord: {
              select: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    image: true,
                  },
                },
                businessName: true,
                isVerified: true,
              },
            },
          },
        });

        if (!property) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Property not found",
          });
        }

        return property;
      }),

    // Get landlord's own properties
    getMyProperties: landlordProc.query(async ({ ctx }) => {
      const landlordProfile = await ctx.db.landlordProfile.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!landlordProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Landlord profile not found",
        });
      }

      return ctx.db.property.findMany({
        where: { landlordId: landlordProfile.id },
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { bookings: true },
          },
        },
      });
    }),

    // Create a new property
    create: landlordProc
      .input(
        z.object({
          name: z.string().min(3),
          description: z.string().min(20),
          address: z.string().min(5),
          city: z.string().min(2),
          state: z.string().min(2),
          zipCode: z.string().optional(),
          latitude: z.number().optional(),
          longitude: z.number().optional(),
          price: z.number().min(0),
          amenities: z.array(z.string()).default([]),
          images: z.array(z.string()).default([]),
          totalRooms: z.number().min(1).default(1),
          availableRooms: z.number().min(0).default(1),
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

        return ctx.db.property.create({
          data: {
            ...input,
            landlordId: landlordProfile.id,
          },
        });
      }),

    // Update a property
    update: landlordProc
      .input(
        z.object({
          id: z.string(),
          name: z.string().min(3).optional(),
          description: z.string().min(20).optional(),
          address: z.string().min(5).optional(),
          city: z.string().min(2).optional(),
          state: z.string().min(2).optional(),
          zipCode: z.string().optional(),
          latitude: z.number().optional(),
          longitude: z.number().optional(),
          price: z.number().min(0).optional(),
          amenities: z.array(z.string()).optional(),
          images: z.array(z.string()).optional(),
          totalRooms: z.number().min(1).optional(),
          availableRooms: z.number().min(0).optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;

        const landlordProfile = await ctx.db.landlordProfile.findUnique({
          where: { userId: ctx.session.user.id },
        });

        if (!landlordProfile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Landlord profile not found",
          });
        }

        // Verify ownership
        const property = await ctx.db.property.findFirst({
          where: { id, landlordId: landlordProfile.id },
        });

        if (!property) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Property not found or you don't have permission",
          });
        }

        return ctx.db.property.update({
          where: { id },
          data,
        });
      }),

    // Delete a property
    delete: landlordProc
      .input(z.object({ id: z.string() }))
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

        // Verify ownership
        const property = await ctx.db.property.findFirst({
          where: { id: input.id, landlordId: landlordProfile.id },
        });

        if (!property) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Property not found or you don't have permission",
          });
        }

        // Soft delete by setting isActive to false
        return ctx.db.property.update({
          where: { id: input.id },
          data: { isActive: false },
        });
      }),
  });
};
