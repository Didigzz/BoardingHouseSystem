import { Badge } from "@/shared/ui/badge";
import type { RoomStatus } from "../model/types";

interface RoomStatusBadgeProps {
  status: RoomStatus;
}

const statusConfig: Record<RoomStatus, { label: string; variant: "default" | "success" | "warning" | "destructive" }> = {
  AVAILABLE: { label: "Available", variant: "success" },
  OCCUPIED: { label: "Occupied", variant: "default" },
  MAINTENANCE: { label: "Maintenance", variant: "warning" },
};

export function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
