import NextAuth from "next-auth";
import { authConfig } from "@bhms/auth/config";
import type { NextRequest } from "next/server";

// @ts-ignore - NextAuth version mismatch between packages
const handlers = NextAuth(authConfig);

// Next.js 14+ route handler export
// @ts-ignore - Type mismatch due to NextAuth version differences
export const GET = handlers.handler;
// @ts-ignore - Type mismatch due to NextAuth version differences
export const POST = handlers.handler;
