import { z } from "zod";

export const createRoomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.coerce.number().int().positive("Floor must be positive"),
  capacity: z.coerce.number().int().positive("Capacity must be positive"),
  monthlyRate: z.coerce.number().positive("Rate must be positive"),
  description: z.string().optional(),
  amenities: z.array(z.string()).default([]),
});

export const updateRoomSchema = createRoomSchema.partial().extend({
  id: z.string(),
  status: z.enum(["AVAILABLE", "OCCUPIED", "MAINTENANCE"]).optional(),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
