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
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Plus } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "@/shared/hooks/use-toast";
import {
  createUtilityReadingSchema,
  type CreateUtilityReadingInput,
} from "@/entities/utility";

export function AddUtilityReadingDialog() {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();

  const { data: rooms } = api.room.getAll.useQuery();

  const form = useForm<CreateUtilityReadingInput>({
    resolver: zodResolver(createUtilityReadingSchema),
    defaultValues: {
      roomId: "",
      type: "ELECTRICITY",
      previousReading: 0,
      currentReading: 0,
      ratePerUnit: 0,
      readingDate: new Date(),
      billingPeriodStart: new Date(),
      billingPeriodEnd: new Date(),
    },
  });

  const createReading = api.utility.create.useMutation({
    onSuccess: () => {
      toast({ title: "Utility reading added successfully" });
      utils.utility.getAll.invalidate();
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error adding reading",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CreateUtilityReadingInput) => {
    createReading.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Reading
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Utility Reading</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utility Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ELECTRICITY">Electricity</SelectItem>
                      <SelectItem value="WATER">Water</SelectItem>
                      <SelectItem value="INTERNET">Internet</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="previousReading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Reading</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentReading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Reading</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="ratePerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate per Unit (₱)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.0001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={createReading.isPending}
            >
              {createReading.isPending ? "Adding..." : "Add Reading"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
