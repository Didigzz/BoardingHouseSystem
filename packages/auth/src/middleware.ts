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
 * Create status-based middleware
 */
export function createStatusMiddleware(requiredStatus: string | string[]) {
  const allowedStatuses = Array.isArray(requiredStatus) ? requiredStatus : [requiredStatus];
  
  return ({ ctx, next }: { ctx: any; next: any }) => {
    if (!ctx.session?.user || !allowedStatuses.includes(ctx.session.user.status)) {
      throw new TRPCError({ 
        code: "FORBIDDEN",
        message: "Account status does not permit this action"
      });
    }
    return next({ ctx });
  };
}

/**
 * Create landlord-only middleware (requires APPROVED status)
 */
export function createLandlordMiddleware() {
  return ({ ctx, next }: { ctx: any; next: any }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    
    if (ctx.session.user.role !== "LANDLORD") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Landlords only" });
    }
    
    if (ctx.session.user.status !== "APPROVED") {
      throw new TRPCError({ 
        code: "FORBIDDEN", 
        message: "Your account is pending approval" 
      });
    }
    
    return next({ ctx });
  };
}

/**
 * Create boarder-only middleware (requires non-SUSPENDED status)
 */
export function createBoarderMiddleware() {
  return ({ ctx, next }: { ctx: any; next: any }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    
    if (ctx.session.user.role !== "BOARDER") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Boarders only" });
    }
    
    if (ctx.session.user.status === "SUSPENDED") {
      throw new TRPCError({ 
        code: "FORBIDDEN", 
        message: "Your account has been suspended" 
      });
    }
    
    return next({ ctx });
  };
}

/**
 * Create admin middleware
 */
export function createAdminMiddleware() {
  return ({ ctx, next }: { ctx: any; next: any }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Administrators only" });
    }
    
    return next({ ctx });
  };
}