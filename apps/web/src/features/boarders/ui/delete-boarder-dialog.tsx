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
import { api } from "@/lib/orpc-client";
import { toast } from "@bhms/ui";
import { useRouter } from "next/navigation";
import type { Boarder } from "@bhms/shared/entities/boarder";

interface DeleteBoarderDialogProps {
  boarder: Boarder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectOnDelete?: boolean;
}

export function DeleteBoarderDialog({
  boarder,
  open,
  onOpenChange,
  redirectOnDelete = false,
}: DeleteBoarderDialogProps) {
  const router = useRouter();
  const utils = orpc.useUtils();

  const deleteBoarder = orpc.boarder.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Boarder deleted successfully" });
      queryClient.boarder.getAll.invalidateQueries\(\{ queryKey: \[[^"\]+\] \}\);
      queryClient.room.getAll.invalidateQueries\(\{ queryKey: \[[^"\]+\] \}\);
      onOpenChange(false);
      if (redirectOnDelete) {
        router.push("/landlord/boarders");
      }
    },
    onError: (error) => {
      toast({
        title: "Error deleting boarder",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (boarder) {
      deleteBoarder.mutate({ id: boarder.id });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Boarder</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {boarder?.firstName} {boarder?.lastName}? This will also
            remove all associated payment records. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteBoarder.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

