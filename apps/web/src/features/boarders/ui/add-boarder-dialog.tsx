"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import { api } from "@/lib/orpc-client";
import { toast } from "@bhms/ui";
import {
  createBoarderSchema,
  type CreateBoarderInput,
} from "@bhms/shared/entities/boarder";

export function AddBoarderDialog() {
  const [open, setOpen] = useState(false);
  const utils = orpc.useUtils();

  const { data: rooms } = orpc.room.getAll.useQuery({ status: "AVAILABLE" });

  const form = useForm<CreateBoarderInput>({
    resolver: zodResolver(createBoarderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      moveInDate: new Date(),
      roomId: undefined,
    },
  });

  const createBoarder = orpc.boarder.create.useMutation({
    onSuccess: () => {
      toast({ title: "Boarder added successfully" });
      queryClient.boarder.getAll.invalidateQueries\(\{ queryKey: \[[^"\]+\] \}\);
      queryClient.room.getAll.invalidateQueries\(\{ queryKey: \[[^"\]+\] \}\);
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error adding boarder",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CreateBoarderInput) => {
    createBoarder.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Boarder
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Boarder</DialogTitle>
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
                      <Input placeholder="Enter first name" {...field} />
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
                      <Input placeholder="Enter last name" {...field} />
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
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
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
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
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
                  <FormLabel>Assign Room (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a room" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rooms?.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          Room {room.roomNumber} (Floor {room.floor})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={createBoarder.isPending}
            >
              {createBoarder.isPending ? "Adding..." : "Add Boarder"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

