"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@bhms/ui";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { PropertyProvider } from "@/lib/property-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PropertyProvider>
            {children}
            <Toaster />
          </PropertyProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
