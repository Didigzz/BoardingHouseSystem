import { z } from 'zod';

export const CreateBoarderCommandSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  moveInDate: z.date(),
  roomId: z.string().optional(),
});

export type CreateBoarderCommand = z.infer<typeof CreateBoarderCommandSchema>;