"use client";

import { PublicProviders } from "../providers";

export interface PublicLayoutProps {
  children: React.ReactNode;
  /** Header content (app-specific) */
  header?: React.ReactNode;
  /** Footer content (app-specific) */
  footer?: React.ReactNode;
  /** Theme mode: system, light, or dark */
  theme?: "system" | "light" | "dark";
}

/**
 * Public layout for BHMS marketplace app (no authentication).
 * Provides consistent structure with optional header and footer slots.
 */
export function PublicLayout({
  children,
  header,
  footer,
  theme = "light",
}: PublicLayoutProps) {
  return (
    <PublicProviders theme={theme}>
      <div className="flex min-h-screen flex-col">
        {header && (
          <header className="bg-background sticky top-0 z-30 border-b">
            {header}
          </header>
        )}
        <main className="flex-1">{children}</main>
        {footer && <footer className="bg-background border-t">{footer}</footer>}
      </div>
    </PublicProviders>
  );
}
