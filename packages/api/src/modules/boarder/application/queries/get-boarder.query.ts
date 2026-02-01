import { z } from 'zod';

export const GetBoarderQuerySchema = z.object({
  id: z.string(),
});

export type GetBoarderQuery = z.infer<typeof GetBoarderQuerySchema>;