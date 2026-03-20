"use client";

import { ReactNode } from "react";
import { AppProviders } from "@havenspace/shared/providers";
import { PropertyProvider } from "@/lib/property-context";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppProviders>
      <PropertyProvider>{children}</PropertyProvider>
    </AppProviders>
  );
}
