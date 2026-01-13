import { TRPCError } from "@trpc/server";

/**
 * Create auth middleware for tRPC procedures
 * This factory allows different platforms to provide their own session retrieval logic
 */
export function createAuthMiddleware(getSession: (ctx: any) => any) {
  return async ({ ctx, next }: { ctx: any; next: any }) => {
    const session = await getSession(ctx);
    
    if (!session || !session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    
    return next({
      ctx: {
        ...ctx,
        session: { ...session, user: session.user },
      },
    });
  };
}

/**
 * Create role-based middleware
 */
export function createRoleMiddleware(requiredRole: string) {
  return ({ ctx, next }: { ctx: any; next: any }) => {
    if (!ctx.session?.user || ctx.session.user.role !== requiredRole) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next({ ctx });
  };
}

/**
 * Create landlord-only middleware
 */
export function createLandlordMiddleware() {
  return createRoleMiddleware("LANDLORD");
}

/**
 * Create boarder-only middleware
 */
export function createBoarderMiddleware() {
  return createRoleMiddleware("BOARDER");
}

/**
 * Create admin middleware (for future use)
 */
export function createAdminMiddleware() {
  return createRoleMiddleware("ADMIN");
}