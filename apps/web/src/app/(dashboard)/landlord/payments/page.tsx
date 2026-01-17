"use client";

import { api } from "@/lib/orpc-client";
import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Button } from "@bhms/ui/button";
import { Skeleton } from "@bhms/ui/skeleton";
import { Badge } from "@bhms/ui/badge";
import { Plus } from "lucide-react";

export default function PaymentsPage(): JSX.Element {
  // TODO: Replace with actual oRPC query once types are fixed
  const payments: Array<{id: string, amount: number, status: string, dueDate: Date, boarder?: {firstName: string, lastName: string}}> = []; // Mock data
  const isLoading = false;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Track and manage payments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Payment List</CardTitle>
          </CardHeader>
          <CardContent>
            {payments && payments.length > 0 ? (
              <div className="space-y-2">
                {payments.map((payment: any) => (
                  <div key={payment.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{payment.boarder?.firstName} {payment.boarder?.lastName}</p>
                      <p className="text-sm text-muted-foreground">Due: {formatDate(payment.dueDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(Number(payment.amount))}</p>
                      <Badge variant={payment.status === "PAID" ? "default" : "secondary"}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No payments found</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}