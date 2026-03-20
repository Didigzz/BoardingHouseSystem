import csrf from "csrf";

const CSRF_SECRET = process.env.CSRF_SECRET;

if (!CSRF_SECRET) {
  throw new Error("CSRF_SECRET environment variable is required");
}

const tokens = new csrf();

/**
 * Generate a new CSRF token with a secret stored server-side
 * This implements the double-submit cookie pattern:
 * 1. A secret is stored in the server-side session
 * 2. A token is generated and sent to the client
 * 3. Client sends token in header, secret is validated from session
 */
export function generateCSRFToken(secret?: string): {
  secret: string;
  token: string;
} {
  const tokenSecret = secret || tokens.secretSync();
  const token = tokens.create(tokenSecret);
  return { secret: tokenSecret, token };
}

/**
 * Verify a CSRF token
 * @param secret - The CSRF secret (from server-side session)
 * @param token - The token to verify (from client request)
 */
export function verifyCSRFToken(secret: string, token: string): boolean {
  try {
    return tokens.verify(secret, token);
  } catch {
    return false;
  }
}

/**
 * Create a CSRF token for client use
 * The secret should be stored server-side (in session)
 */
export function createCSRFTokenForSession(): string {
  const { secret, token } = generateCSRFToken();
  // Return both - secret should be stored in session, token sent to client
  return JSON.stringify({ secret, token });
}

/**
 * Parse CSRF token pair from session storage
 */
export function parseCSRFTokenPair(
  sessionData: string
): { secret: string; token: string } | null {
  try {
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
}
