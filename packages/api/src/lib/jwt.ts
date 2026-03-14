import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate a secure JWT token for authenticated users
 */
export function generateToken(payload: JWTPayload): string {
  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRATION as any,
    issuer: 'havenspace',
    audience: 'havenspace-users'
  };
  return jwt.sign(payload as object, JWT_SECRET as string, options);
}

/**
 * Verify and decode a JWT token
 * Returns null if token is invalid or expired
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string, {
      issuer: 'havenspace',
      audience: 'havenspace-users'
    });
    return decoded as JWTPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Token has expired'
      });
    }
    if (error instanceof JsonWebTokenError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid token'
      });
    }
    return null;
  }
}

/**
 * Decode a token without verification (for debugging only)
 */
export function decodeToken(token: string): JWTPayload | null {
  return jwt.decode(token) as JWTPayload | null;
}
