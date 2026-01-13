import { z } from 'zod';

// Example user schema - replace with actual schemas
export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
    role: z.enum(['admin', 'landlord', 'boarder']),
});

export type User = z.infer<typeof userSchema>;
