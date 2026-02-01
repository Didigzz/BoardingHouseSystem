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
import { useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc-client";
import { toast } from "@bhms/ui";
import {
  createPaymentSchema,
  type CreatePaymentInput,
} from "@bhms/shared";

export function AddPaymentDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: boarders } = orpc.boarder.getAll.useQuery({ isActive: true });

  const form = useForm<CreatePaymentInput>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      boarderId: "",
      amount: 0,
      type: "RENT",
      dueDate: new Date(),
      description: "",
    },
  });

  const createPayment = orpc.payment.create.useMutation({
    onSuccess: () => {
      toast({ title: "Payment created successfully" });
      queryClient.invalidateQueries({ queryKey: ["payment.getAll"] });
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error creating payment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CreatePaymentInput) => {
    createPayment.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="boarderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Boarder</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select boarder" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {boarders?.map((boarder) => (
                        <SelectItem key={boarder.id} value={boarder.id}>
                          {boarder.firstName} {boarder.lastName}
                          {boarder.room && ` - Room ${boarder.room.roomNumber}`}
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₱)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RENT">Rent</SelectItem>
                      <SelectItem value="UTILITY">Utility</SelectItem>
                      <SelectItem value="DEPOSIT">Deposit</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
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
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Payment description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={createPayment.isPending}
            >
              {createPayment.isPending ? "Creating..." : "Create Payment"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
