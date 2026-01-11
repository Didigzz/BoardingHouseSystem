import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { formatCurrency, formatDate } from "@/shared/lib/utils";
import type { Payment } from "../model/types";

interface PaymentReceiptProps {
  payment: Payment;
}

export function PaymentReceipt({ payment }: PaymentReceiptProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Payment Receipt</CardTitle>
        {payment.receiptNumber && (
          <p className="text-sm text-muted-foreground">#{payment.receiptNumber}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Boarder:</span>
            <span className="font-medium">
              {payment.boarder?.firstName} {payment.boarder?.lastName}
            </span>
          </div>
          {payment.boarder?.room && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room:</span>
              <span>{payment.boarder.room.roomNumber}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span>{payment.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Due Date:</span>
            <span>{formatDate(payment.dueDate)}</span>
          </div>
          {payment.paidDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paid Date:</span>
              <span>{formatDate(payment.paidDate)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount:</span>
          <span>{formatCurrency(Number(payment.amount))}</span>
        </div>

        {payment.description && (
          <>
            <Separator />
            <div>
              <span className="text-muted-foreground text-sm">Notes:</span>
              <p className="text-sm mt-1">{payment.description}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
