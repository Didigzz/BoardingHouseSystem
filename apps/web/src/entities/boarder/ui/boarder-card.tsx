import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Phone, Mail, DoorOpen } from "lucide-react";
import { BoarderStatusBadge } from "./boarder-status-badge";
import { BoarderAvatar } from "./boarder-avatar";
import type { Boarder } from "../model/types";
import { formatDate } from "@/shared/lib/utils";

interface BoarderCardProps {
  boarder: Boarder;
  onClick?: () => void;
}

export function BoarderCard({ boarder, onClick }: BoarderCardProps) {
  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <BoarderAvatar
          firstName={boarder.firstName}
          lastName={boarder.lastName}
        />
        <div className="flex-1">
          <CardTitle className="text-lg font-medium">
            {boarder.firstName} {boarder.lastName}
          </CardTitle>
          <BoarderStatusBadge isActive={boarder.isActive} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{boarder.email}</span>
        </div>
        {boarder.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{boarder.phone}</span>
          </div>
        )}
        {boarder.room && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DoorOpen className="h-4 w-4" />
            <span>Room {boarder.room.roomNumber}</span>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Move-in: {formatDate(boarder.moveInDate)}
        </div>
      </CardContent>
    </Card>
  );
}
