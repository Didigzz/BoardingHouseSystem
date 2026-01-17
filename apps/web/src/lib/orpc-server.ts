import { createAppRouter, createORPCContext } from "@bhms/api";
import { createAuthMiddleware } from "@bhms/auth";
import { auth } from "./auth";
import { publicProcedure } from "@bhms/api";

// Create the auth middleware using NextAuth session
const authMiddleware = createAuthMiddleware(async () => {
  return await auth();
});

// Create protected procedure with NextAuth
const protectedProcedure = publicProcedure.use(async ({ context, next }) => {
  const session = await auth();
  
  if (!session || !session.user) {
    throw new Error('UNAUTHORIZED');
  }
  
  return next({
    context: {
      ...context,
      session: session,
    },
  });
});

// Create the app router with the protected procedure
export const appRouter = createAppRouter(protectedProcedure);

export type AppRouter = typeof appRouter;