import {
  LayoutDashboard,
  DoorOpen,
  Users,
  CreditCard,
  Zap,
  Settings,
  User,
} from "lucide-react";

export const landlordNavItems = [
  { href: "/landlord", label: "Dashboard", icon: LayoutDashboard },
  { href: "/landlord/rooms", label: "Rooms", icon: DoorOpen },
  { href: "/landlord/boarders", label: "Boarders", icon: Users },
  { href: "/landlord/payments", label: "Payments", icon: CreditCard },
  { href: "/landlord/utilities", label: "Utilities", icon: Zap },
  { href: "/landlord/settings", label: "Settings", icon: Settings },
];

export const boarderNavItems = [
  { href: "/boarder", label: "Dashboard", icon: LayoutDashboard },
  { href: "/boarder/payments", label: "My Payments", icon: CreditCard },
  { href: "/boarder/profile", label: "Profile", icon: User },
];
