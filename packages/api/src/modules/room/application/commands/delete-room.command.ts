import { z } from 'zod';

export const DeleteRoomCommandSchema = z.object({
  id: z.string(),
});

export type DeleteRoomCommand = z.infer<typeof DeleteRoomCommandSchema>;