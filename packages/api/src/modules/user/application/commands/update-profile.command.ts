import { z } from "zod";

export const UpdateProfileCommandSchema = z.object({
  userId: z.string(),
  name: z.string().min(1).optional(),
  image: z.string().optional(),
});

export type UpdateProfileCommand = z.infer<typeof UpdateProfileCommandSchema>;