"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@bhms/ui/alert-dialog";
import { api } from "./lib/trpc-react";
import { toast } from "@/shared/hooks/use-toast";
import type { Room } from "@bhms/shared/entities/room";

interface DeleteRoomDialogProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteRoomDialog({ room, open, onOpenChange }: DeleteRoomDialogProps) {
  const utils = api.useUtils();

  const deleteRoom = api.room.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Room deleted successfully" });
      utils.room.getAll.invalidate();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error deleting room",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (room) {
      deleteRoom.mutate({ id: room.id });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Room</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete Room {room?.roomNumber}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteRoom.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

