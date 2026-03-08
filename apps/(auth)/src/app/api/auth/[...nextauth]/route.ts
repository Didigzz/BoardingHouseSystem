import NextAuth from "next-auth";
import { authConfig } from "@bhms/auth";
import type { NextRequest } from "next/server";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

// Export for Next.js 16 middleware
export const runtime = "edge";
