import {
  Home,
  Users,
  DoorClosed,
  CreditCard,
  Zap,
  Settings,
  FileText,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const landlordNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/landlord",
    icon: Home,
  },
  {
    label: "Rooms",
    href: "/landlord/rooms",
    icon: DoorClosed,
  },
  {
    label: "Boarders",
    href: "/landlord/boarders",
    icon: Users,
  },
  {
    label: "Payments",
    href: "/landlord/payments",
    icon: CreditCard,
  },
  {
    label: "Utilities",
    href: "/landlord/utilities",
    icon: Zap,
  },
  {
    label: "Reports",
    href: "/landlord/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/landlord/settings",
    icon: Settings,
  },
];

export const boarderNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/boarder",
    icon: Home,
  },
  {
    label: "My Room",
    href: "/boarder/room",
    icon: DoorClosed,
  },
  {
    label: "Payments",
    href: "/boarder/payments",
    icon: CreditCard,
  },
  {
    label: "Utilities",
    href: "/boarder/utilities",
    icon: Zap,
  },
  {
    label: "Settings",
    href: "/boarder/settings",
    icon: Settings,
  },
];
