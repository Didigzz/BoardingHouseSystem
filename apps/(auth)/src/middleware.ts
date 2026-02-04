import NextAuth from "next-auth";
import { authConfigEdge } from "@bhms/auth/config.edge";

export const { auth: middleware } = NextAuth(authConfigEdge);

export const config = {
  matcher: [
    // Match all routes except static files, api routes that shouldn't be protected
    "/((?!_next/static|_next/image|favicon.ico|api/auth|api/register).*)",
  ],
};
