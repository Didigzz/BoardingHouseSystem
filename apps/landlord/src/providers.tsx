"use client";

import { AppProviders } from "@bhms/shared/providers";
import { PropertyProvider } from "@/lib/property-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders theme="system" requireAuth>
      <PropertyProvider>
        {children}
      </PropertyProvider>
    </AppProviders>
  );
}
