"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import { createContext, useContext, useState } from "react";

import { orpc } from "./orpc-client";

// Create the oRPC React Query utilities
const orpcUtils = createORPCReactQueryUtils(orpc);

// Create context for oRPC utilities
const ORPCContext = createContext<typeof orpcUtils | undefined>(undefined);

export function useORPC() {
  const context = useContext(ORPCContext);
  if (!context) {
    throw new Error("useORPC must be used within ORPCReactProvider");
  }
  return context;
}

export function ORPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ORPCContext.Provider value={orpcUtils}>
        {props.children}
      </ORPCContext.Provider>
    </QueryClientProvider>
  );
}

// Re-export the utils for direct use
export { orpcUtils as orpc };