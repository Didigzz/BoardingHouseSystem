"use client";

import { api } from "./lib/trpc-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bhms/ui/table";
import { Skeleton } from "@bhms/ui/skeleton";
import { BoarderAvatar, BoarderStatusBadge } from "@bhms/shared/entities/boarder";
import { Button } from "@bhms/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bhms/ui/dropdown-menu";
import { formatDate } from "@bhms/shared";

interface BoarderTableProps {
  onEdit?: (boarder: any) => void;
  onDelete?: (boarder: any) => void;
}

export function BoarderTable({ onEdit, onDelete }: BoarderTableProps) {
  const { data: boarders, isLoading } = api.boarder.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (!boarders?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No boarders found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Boarder</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Move-in Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {boarders.map((boarder) => (
          <TableRow key={boarder.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <BoarderAvatar
                  firstName={boarder.firstName}
                  lastName={boarder.lastName}
                />
                <span className="font-medium">
                  {boarder.firstName} {boarder.lastName}
                </span>
              </div>
            </TableCell>
            <TableCell>{boarder.email}</TableCell>
            <TableCell>{boarder.room?.roomNumber ?? "-"}</TableCell>
            <TableCell>{formatDate(boarder.moveInDate)}</TableCell>
            <TableCell>
              <BoarderStatusBadge isActive={boarder.isActive} />
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(boarder)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete?.(boarder)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

