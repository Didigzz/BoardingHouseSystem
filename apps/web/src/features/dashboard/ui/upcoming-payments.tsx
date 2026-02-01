"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Skeleton } from "@bhms/ui/skeleton";
import { formatCurrency, formatDate } from "@bhms/shared";
import { Button } from "@bhms/ui/button";
import { toast } from "@bhms/ui";
import { orpc } from "@/lib/orpc-client";

export function UpcomingPayments() {
  const queryClient = useQueryClient();
  const { data: payments, isLoading } =
    orpc.dashboard.getUpcomingPayments.useQuery();

  const markAsPaid = orpc.payment.markAsPaid.useMutation({
    onSuccess: () => {
      toast({ title: "Payment marked as paid" });
      queryClient.invalidateQueries({
        queryKey: ["dashboard.getUpcomingPayments"],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard.getStats"] });
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        {payments?.length === 0 ? (
          <p className="text-sm text-muted-foreground">No upcoming payments</p>
        ) : (
          <div className="space-y-4">
            {payments?.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">
                    {payment.boarder.firstName} {payment.boarder.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment.boarder.room?.roomNumber &&
                      `Room ${payment.boarder.room.roomNumber} • `}
                    Due: {formatDate(payment.dueDate)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {formatCurrency(Number(payment.amount))}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => markAsPaid.mutate({ id: payment.id })}
                    disabled={markAsPaid.isPending}
                  >
                    Mark Paid
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
