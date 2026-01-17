"use client";

import { signOut } from "next-auth/react";
import { Button } from "@bhms/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline";
  showIcon?: boolean;
}

export function LogoutButton({ variant = "ghost", showIcon = true }: LogoutButtonProps) {
  return (
    <Button variant={variant} onClick={() => signOut({ callbackUrl: "/login" })}>
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      Logout
    </Button>
  );
}

