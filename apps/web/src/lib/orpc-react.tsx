"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createORPCClient, ORPCProvider } from "@orpc/client/react";
import { useState } from "react";
import superjson from "superjson";

import type { AppRouter } from "./orpc-server";
import { orpc } from "./orpc-client";

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function ORPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const client = useState(() => orpc)[0];

  return (
    <QueryClientProvider client={queryClient}>
      <ORPCProvider client={client} queryClient={queryClient}>
        {props.children}
      </ORPCProvider>
    </QueryClientProvider>
  );
}