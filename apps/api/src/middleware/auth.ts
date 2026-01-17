import { Request, Response, NextFunction } from "express";
import { db } from "@bhms/database";

/**
 * Authentication middleware for Express
 * Validates session and attaches user info to request
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      (req as any).session = null;
      return next();
    }

    const token = authHeader.substring(7);
    
    // TODO: Implement proper JWT validation
    // For now, this is a placeholder
    // In production, validate JWT token and fetch user
    
    // Example: Fetch user from database based on token
    // const user = await db.user.findUnique({ where: { token } });
    
    (req as any).session = {
      user: null, // Will be populated after proper auth implementation
    };
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    (req as any).session = null;
    next();
  }
}

/**
 * Require authentication middleware
 * Returns 401 if user is not authenticated
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  
  if (!session || !session.user) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication required",
    });
  }
  
  next();
}
