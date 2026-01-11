import { Badge } from "@/shared/ui/badge";
import { Zap, Droplets, Wifi, MoreHorizontal } from "lucide-react";
import type { UtilityType } from "../model/types";

interface UtilityTypeBadgeProps {
  type: UtilityType;
}

const config: Record<UtilityType, { label: string; icon: React.ReactNode; className: string }> = {
  ELECTRICITY: { label: "Electricity", icon: <Zap className="h-3 w-3" />, className: "bg-yellow-500" },
  WATER: { label: "Water", icon: <Droplets className="h-3 w-3" />, className: "bg-blue-500" },
  INTERNET: { label: "Internet", icon: <Wifi className="h-3 w-3" />, className: "bg-purple-500" },
  OTHER: { label: "Other", icon: <MoreHorizontal className="h-3 w-3" />, className: "bg-gray-500" },
};

export function UtilityTypeBadge({ type }: UtilityTypeBadgeProps) {
  const { label, icon, className } = config[type];
  return (
    <Badge className={className}>
      <span className="flex items-center gap-1">
        {icon}
        {label}
      </span>
    </Badge>
  );
}
