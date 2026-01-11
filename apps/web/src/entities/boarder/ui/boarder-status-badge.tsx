import { Badge } from "@/shared/ui/badge";

interface BoarderStatusBadgeProps {
  isActive: boolean;
}

export function BoarderStatusBadge({ isActive }: BoarderStatusBadgeProps) {
  return (
    <Badge variant={isActive ? "success" : "secondary"}>
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
