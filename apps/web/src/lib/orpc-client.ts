import { createORPCClient } from "@orpc/client";
import type { AppRouter } from "./orpc-server";

export const orpc = createORPCClient<AppRouter>({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/orpc",
});