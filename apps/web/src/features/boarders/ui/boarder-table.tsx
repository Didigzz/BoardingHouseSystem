"use client";

import { orpc } from "@/lib/orpc-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bhms/ui/table";
import { Skeleton } from "@bhms/ui/skeleton";

import { Button } from "@bhms/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bhms/ui/dropdown-menu";
import { formatDate } from "@bhms/shared";

interface Boarder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  room?: {
    id: string;
    number: string;
  };
  isActive?: boolean;
  moveInDate?: string;
}

interface BoarderTableProps {
  boarders: Boarder[];
  onEdit?: (boarder: Boarder) => void;
  onDelete?: (boarder: Boarder) => void;
}

export function BoarderTable({
  onEdit,
  onDelete,
}: BoarderTableProps): JSX.Element {
  const { data: boarders, isLoading } = orpc.boarder.getAll.useQuery();

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
      <div className="py-10 text-center text-muted-foreground">
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
        {boarders?.map((boarder: Boarder) => (
          <TableRow key={boarder.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {boarder.firstName?.[0]}
                  {boarder.lastName?.[0]}
                </div>
                <span className="font-medium">
                  {boarder.firstName} {boarder.lastName}
                </span>
              </div>
            </TableCell>
            <TableCell>{boarder.email}</TableCell>
            <TableCell>{boarder.room?.number ?? "-"}</TableCell>
            <TableCell>
              {boarder.moveInDate
                ? new Date(boarder.moveInDate).toLocaleDateString()
                : "-"}
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${boarder.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
              >
                {boarder.isActive ? "Active" : "Inactive"}
              </span>
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
