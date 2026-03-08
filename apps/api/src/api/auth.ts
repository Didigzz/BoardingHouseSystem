/**
 * Serverless function entry point for NextAuth authentication
 * This file exports a handler that can be deployed to serverless platforms
 */

import NextAuth from "next-auth";
import { authConfig } from "@bhms/auth";

/**
 * Create NextAuth handlers
 */
const handlers = NextAuth(authConfig);

/**
 * Export handlers for serverless platforms
 * @param req - Request object
 * @returns Response object
 */
export const GET = async (req: Request) => {
  // @ts-ignore - NextAuth version mismatch between packages
  return handlers.handler(req);
};

export const POST = async (req: Request) => {
  // @ts-ignore - NextAuth version mismatch between packages
  return handlers.handler(req);
};

/**
 * Default export for platforms that require it
 */
export default async (req: Request) => {
  // @ts-ignore - NextAuth version mismatch between packages
  return handlers.handler(req);
};