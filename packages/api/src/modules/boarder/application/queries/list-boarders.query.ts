import { z } from 'zod';

export const ListBoardersQuerySchema = z.object({
  isActive: z.boolean().optional(),
  search: z.string().optional(),
  roomId: z.string().optional(),
}).optional();

export type ListBoardersQuery = z.infer<typeof ListBoardersQuerySchema>;