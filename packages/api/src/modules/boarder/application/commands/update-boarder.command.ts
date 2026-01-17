import { z } from 'zod';

export const UpdateBoarderCommandSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  moveInDate: z.date().optional(),
  moveOutDate: z.date().optional(),
  isActive: z.boolean().optional(),
  roomId: z.string().optional(),
});

export type UpdateBoarderCommand = z.infer<typeof UpdateBoarderCommandSchema>;