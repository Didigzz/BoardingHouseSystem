"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@bhms/ui/alert-dialog";
import { api } from "./lib/trpc-react";
import { useToast } from "@/shared/hooks/use-toast";
import { formatCurrency } from "@bhms/shared";
import type { Payment } from "@bhms/shared/entities/payment/model/types";

interface MarkPaidDialogProps {
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarkPaidDialog({ payment, open, onOpenChange }: MarkPaidDialogProps) {
  const { toast } = useToast();
  const utils = api.useUtils();

  const markAsPaid = api.payment.markAsPaid.useMutation({
    onSuccess: () => {
      toast({ title: "Payment marked as paid" });
      utils.payment.getAll.invalidate();
      utils.payment.getSummary.invalidate();
      utils.dashboard.getStats.invalidate();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error marking payment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleConfirm = () => {
    if (payment) {
      markAsPaid.mutate({ id: payment.id, paidDate: new Date() });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark Payment as Paid?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm that you have received {formatCurrency(Number(payment?.amount ?? 0))} from{" "}
            {payment?.boarder?.firstName} {payment?.boarder?.lastName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {markAsPaid.isPending ? "Processing..." : "Confirm Payment"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

