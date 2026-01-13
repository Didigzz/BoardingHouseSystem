"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@bhms/ui/button";
import { Input } from "@bhms/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@bhms/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bhms/ui/card";
import { toast } from "@/shared/hooks/use-toast";

const accessCodeSchema = z.object({
  accessCode: z.string().min(1, "Access code is required"),
});

type AccessCodeFormValues = z.infer<typeof accessCodeSchema>;

export function BoarderAccessForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<AccessCodeFormValues>({
    resolver: zodResolver(accessCodeSchema),
    defaultValues: {
      accessCode: "",
    },
  });

  const onSubmit = async (values: AccessCodeFormValues) => {
    setIsLoading(true);
    try {
      // Verify access code via API
      const response = await fetch("/api/auth/boarder-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode: values.accessCode }),
      });

      if (response.ok) {
        router.push("/boarder");
      } else {
        toast({
          title: "Invalid access code",
          description: "Please check your access code and try again",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Boarder Access</CardTitle>
        <CardDescription>
          Enter your access code to view your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="accessCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your access code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Access Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

