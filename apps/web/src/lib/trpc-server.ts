import { createAppRouter, createTRPCContext } from "@bhms/api";
import { createAuthMiddleware } from "@bhms/auth";
import { auth } from "./auth";
import { createCallerFactory, createProtectedProcedure } from "@bhms/api";

// Create the auth middleware using NextAuth session
const authMiddleware = createAuthMiddleware(async () => {
  return await auth();
});

// Create protected procedure with NextAuth
const protectedProcedure = createProtectedProcedure(authMiddleware);

// Create the app router with the protected procedure
export const appRouter = createAppRouter(protectedProcedure);

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
