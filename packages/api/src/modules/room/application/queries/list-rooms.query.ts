import { z } from 'zod';

export const ListRoomsQuerySchema = z.object({
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']).optional(),
  search: z.string().optional(),
  floor: z.number().optional(),
}).optional();

export type ListRoomsQuery = z.infer<typeof ListRoomsQuerySchema>;