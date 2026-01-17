import { z } from 'zod';

export const GetRoomQuerySchema = z.object({
  id: z.string(),
});

export type GetRoomQuery = z.infer<typeof GetRoomQuerySchema>;