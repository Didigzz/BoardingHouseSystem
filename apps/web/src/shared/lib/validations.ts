import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

export const phoneSchema = z
  .string()
  .regex(/^[0-9+\-\s()]*$/, "Invalid phone number")
  .optional()
  .or(z.literal(""));

export const positiveNumberSchema = z.coerce
  .number()
  .positive("Must be a positive number");

export const positiveIntSchema = z.coerce
  .number()
  .int("Must be a whole number")
  .positive("Must be positive");

export const dateSchema = z.coerce.date();

export const optionalStringSchema = z.string().optional().or(z.literal(""));

export const requiredStringSchema = z.string().min(1, "This field is required");

export const currencySchema = z.coerce
  .number()
  .min(0, "Amount cannot be negative")
  .multipleOf(0.01, "Invalid currency format");

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
