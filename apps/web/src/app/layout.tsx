import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ORPCReactProvider } from "@/lib/orpc-react";
import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BHMS - Boarding House Management System",
  description: "Manage your boarding house efficiently",
};

const RootLayout = function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ORPCReactProvider>
          <Providers>{children}</Providers>
        </ORPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;

