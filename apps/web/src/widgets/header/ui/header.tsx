"use client";

import { UserMenu } from "@/entities/user";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/widgets/theme-toggle";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <MobileNav />
        <h2 className="text-lg font-semibold md:hidden">BHMS</h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session?.user && (
          <UserMenu
            user={{
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }}
          />
        )}
      </div>
    </header>
  );
}
