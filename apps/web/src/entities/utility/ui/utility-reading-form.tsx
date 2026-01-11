"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createUtilityReadingSchema, type CreateUtilityReadingInput } from "../model/schemas";

interface UtilityReadingFormProps {
  onSubmit: (values: CreateUtilityReadingInput) => void;
  isLoading?: boolean;
  rooms?: { id: string; roomNumber: string }[];
}

export function UtilityReadingForm({ onSubmit, isLoading, rooms }: UtilityReadingFormProps) {
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

  return (
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Reading"}
        </Button>
      </form>
    </Form>
  );
}
