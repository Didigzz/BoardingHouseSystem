import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PaymentStatusBadge } from "./payment-status-badge";
import type { Payment } from "../model/types";
import { formatCurrency, formatDate } from "@/shared/lib/utils";

interface PaymentCardProps {
  payment: Payment;
  onClick?: () => void;
}

export function PaymentCard({ payment, onClick }: PaymentCardProps) {
  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {formatCurrency(Number(payment.amount))}
        </CardTitle>
        <PaymentStatusBadge status={payment.status} />
      </CardHeader>
      <CardContent className="space-y-1">
        {payment.boarder && (
          <div className="text-sm font-medium">
            {payment.boarder.firstName} {payment.boarder.lastName}
            {payment.boarder.room && (
              <span className="text-muted-foreground">
                {" "}- Room {payment.boarder.room.roomNumber}
              </span>
            )}
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          {payment.type} • Due: {formatDate(payment.dueDate)}
        </div>
        {payment.paidDate && (
          <div className="text-xs text-green-600">
            Paid: {formatDate(payment.paidDate)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
