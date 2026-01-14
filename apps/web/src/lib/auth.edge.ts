import NextAuth from "next-auth";
// Import directly from edge config file to avoid Prisma import chain
import { authConfigEdge } from "@bhms/auth/src/config.edge";

// Edge-compatible auth for middleware (no DB access)
export const { auth } = NextAuth(authConfigEdge);
