"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@bhms/shared";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function SidebarItem({ href, label, icon: Icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

