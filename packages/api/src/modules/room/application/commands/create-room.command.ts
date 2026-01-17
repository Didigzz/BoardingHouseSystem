import { z } from 'zod';

export const CreateRoomCommandSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.number().int().positive("Floor must be positive"),
  capacity: z.number().int().positive("Capacity must be positive"),
  monthlyRate: z.number().positive("Rate must be positive"),
  description: z.string().optional(),
  amenities: z.array(z.string()).default([]),
});

export type CreateRoomCommand = z.infer<typeof CreateRoomCommandSchema>;