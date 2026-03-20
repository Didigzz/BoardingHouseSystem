import { TRPCError } from "@trpc/server";

/**
 * Shared error utilities for consistent error handling across the API
 */
export const errors = {
  /**
   * Authentication error - invalid credentials
   */
  unauthorized: (message?: string) =>
    new TRPCError({
      code: "UNAUTHORIZED",
      message: message || "Invalid credentials",
    }),

  /**
   * Resource not found
   */
  notFound: (entity: string) =>
    new TRPCError({
      code: "NOT_FOUND",
      message: `${entity} not found`,
    }),

  /**
   * Permission denied
   */
  forbidden: (message?: string) =>
    new TRPCError({
      code: "FORBIDDEN",
      message: message || "You do not have permission to perform this action",
    }),

  /**
   * Resource already exists or conflict
   */
  conflict: (message: string) =>
    new TRPCError({
      code: "CONFLICT",
      message,
    }),

  /**
   * Invalid input
   */
  badRequest: (message: string) =>
    new TRPCError({
      code: "BAD_REQUEST",
      message,
    }),

  /**
   * Rate limit exceeded
   */
  tooManyRequests: () =>
    new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests. Please try again later.",
    }),

  /**
   * Internal server error
   */
  internal: (message?: string) =>
    new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: message || "An unexpected error occurred",
    }),
};

/**
 * Create a standardized authentication error that doesn't leak information
 */
export function createAuthError(): TRPCError {
  return errors.unauthorized("Invalid email or password");
}
