"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bhms/ui/dialog";
import { Button } from "@bhms/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bhms/ui/select";
import { Label } from "@bhms/ui/label";
import { api } from "@/lib/orpc-client";
import { toast } from "@bhms/ui";
import type { Boarder, Room } from "@bhms/shared";
import type { Room as PrismaRoom } from "@bhms/database";

interface AssignRoomDialogProps {
  boarder: Boarder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignRoomDialog({
  boarder,
  open,
  onOpenChange,
}: AssignRoomDialogProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: rooms } = api.room.getAll.useQuery({ status: "AVAILABLE" });

  const assignRoom = api.boarder.assignRoom.useMutation({
    onSuccess: () => {
      toast({ title: "Room assigned successfully" });
      queryClient.invalidateQueries({ queryKey: ["boarder.getAll"] });
      queryClient.invalidateQueries({ queryKey: ["room.getAll"] });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error assigning room",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAssign = () => {
    if (boarder) {
      assignRoom.mutate({
        boarderId: boarder.id,
        roomId: selectedRoomId || null,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Assign Room to {boarder?.firstName} {boarder?.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Room</Label>
            <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Room (Unassign)</SelectItem>
                {rooms?.map((room: PrismaRoom) => (
                  <SelectItem key={room.id} value={room.id}>
                    Room {room.roomNumber} (Floor {room.floor})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={assignRoom.isPending}>
              {assignRoom.isPending ? "Assigning..." : "Assign Room"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
