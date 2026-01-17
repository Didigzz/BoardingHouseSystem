import { z } from 'zod';

export const AssignRoomCommandSchema = z.object({
  boarderId: z.string(),
  roomId: z.string().nullable(),
});

export type AssignRoomCommand = z.infer<typeof AssignRoomCommandSchema>;