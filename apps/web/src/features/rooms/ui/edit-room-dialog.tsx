"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bhms/ui/dialog";
import { Button } from "@bhms/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@bhms/ui/form";
import { Input } from "@bhms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bhms/ui/select";
import { orpc } from "@/lib/orpc-client";
import { toast } from "@bhms/ui";
import { updateRoomSchema, type UpdateRoomInput, type Room } from "@bhms/shared/entities/room";
import { useQueryClient } from "@tanstack/react-query";

interface EditRoomDialogProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditRoomDialog({ room, open, onOpenChange }: EditRoomDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateRoomInput>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: {
      id: "",
      roomNumber: "",
      floor: 1,
      capacity: 1,
      monthlyRate: 0,
      description: "",
      status: "AVAILABLE",
    },
  });

  useEffect(() => {
    if (room) {
      form.reset({
        id: room.id,
        roomNumber: room.roomNumber,
        floor: room.floor,
        capacity: room.capacity,
        monthlyRate: Number(room.monthlyRate),
        description: room.description ?? "",
        status: room.status,
      });
    }
  }, [room, form]);

  const updateRoom = orpc.room.update.useMutation({
    onSuccess: () => {
      toast({ title: "Room updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["room.getAll"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error updating room",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: UpdateRoomInput) => {
    updateRoom.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="monthlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rate (₱)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AVAILABLE">Available</SelectItem>
                      <SelectItem value="OCCUPIED">Occupied</SelectItem>
                      <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateRoom.isPending}>
                {updateRoom.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

