"use client";

import { api } from "@/lib/trpc-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bhms/ui/table";
import { Skeleton } from "@bhms/ui/skeleton";
import { PaymentStatusBadge } from "@bhms/shared/entities/payment";
import { Button } from "@bhms/ui/button";
import { formatCurrency, formatDate } from "@bhms/shared";
import { Check } from "lucide-react";
import { toast } from "@bhms/ui";

export function PaymentTable() {
  const utils = api.useUtils();
  const { data: payments, isLoading } = api.payment.getAll.useQuery();

  const markAsPaid = api.payment.markAsPaid.useMutation({
    onSuccess: () => {
      toast({ title: "Payment marked as paid" });
      utils.payment.getAll.invalidate();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No payments found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Boarder</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>
              <div>
                <span className="font-medium">
                  {payment.boarder?.firstName} {payment.boarder?.lastName}
                </span>
                {payment.boarder?.room && (
                  <span className="text-muted-foreground text-sm ml-2">
                    Room {payment.boarder.room.roomNumber}
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell>{payment.type}</TableCell>
            <TableCell>{formatCurrency(Number(payment.amount))}</TableCell>
            <TableCell>{formatDate(payment.dueDate)}</TableCell>
            <TableCell>
              <PaymentStatusBadge status={payment.status} />
            </TableCell>
            <TableCell>
              {payment.status === "PENDING" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markAsPaid.mutate({ id: payment.id })}
                  disabled={markAsPaid.isPending}
                >
                  <Check className="mr-1 h-3 w-3" />
                  Paid
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

