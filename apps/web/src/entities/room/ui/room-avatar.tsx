import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { DoorOpen } from "lucide-react";

interface RoomAvatarProps {
  roomNumber: string;
  className?: string;
}

export function RoomAvatar({ roomNumber, className }: RoomAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback>
        <DoorOpen className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}
