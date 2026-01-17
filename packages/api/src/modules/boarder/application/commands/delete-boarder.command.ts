import { z } from 'zod';

export const DeleteBoarderCommandSchema = z.object({
  id: z.string(),
});

export type DeleteBoarderCommand = z.infer<typeof DeleteBoarderCommandSchema>;