import NextAuth from "next-auth";
import { authConfigEdge } from "@bhms/auth";

const { auth } = NextAuth(authConfigEdge);

// Export as named "proxy" function for Next.js 16
export const proxy = auth;

export const config = {
  matcher: [
    // Match all routes except static files, api routes that shouldn't be protected
    "/((?!_next/static|_next/image|favicon.ico|api/auth|api/register).*)",
  ],
};
