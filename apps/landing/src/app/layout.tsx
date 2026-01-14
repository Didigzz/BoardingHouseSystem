import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BHMS - Modern Boarding House Management System",
  description:
    "Streamline your boarding house operations with our all-in-one management platform. Track rooms, manage boarders, process payments, and monitor utilities effortlessly.",
  keywords: [
    "boarding house",
    "property management",
    "rent collection",
    "tenant management",
    "utility tracking",
  ],
  authors: [{ name: "BHMS Team" }],
  openGraph: {
    title: "BHMS - Modern Boarding House Management System",
    description:
      "Streamline your boarding house operations with our all-in-one management platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
