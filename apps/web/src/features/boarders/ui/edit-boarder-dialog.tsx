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
import { api } from "@/lib/orpc-client";
import { toast } from "@bhms/ui";
import {
  updateBoarderSchema,
  type UpdateBoarderInput,
  type Boarder,
} from "@bhms/shared/entities/boarder";

interface EditBoarderDialogProps {
  boarder: Boarder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBoarderDialog({
  boarder,
  open,
  onOpenChange,
}: EditBoarderDialogProps) {
  const utils = orpc.useUtils();
  const { data: rooms } = orpc.room.getAll.useQuery();

  const form = useForm<UpdateBoarderInput>({
    resolver: zodResolver(updateBoarderSchema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (boarder) {
      form.reset({
        id: boarder.id,
        firstName: boarder.firstName,
        lastName: boarder.lastName,
        email: boarder.email,
        phone: boarder.phone ?? "",
        emergencyContact: boarder.emergencyContact ?? "",
        emergencyPhone: boarder.emergencyPhone ?? "",
        isActive: boarder.isActive,
        roomId: boarder.roomId,
      });
    }
  }, [boarder, form]);

  const updateBoarder = orpc.boarder.update.useMutation({
    onSuccess: () => {
      toast({ title: "Boarder updated successfully" });
      queryClient.boarder.getAll.invalidateQueries\(\{ queryKey: \[[^"\]+\] \}\);
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error updating boarder",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: UpdateBoarderInput) => {
    updateBoarder.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Boarder</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a room" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No Room</SelectItem>
                      {rooms?.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          Room {room.roomNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(v === "true")}
                    value={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateBoarder.isPending}>
                {updateBoarder.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

