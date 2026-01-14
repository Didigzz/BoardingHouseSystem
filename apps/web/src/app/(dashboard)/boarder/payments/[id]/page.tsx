import { notFound } from "next/navigation";

interface PaymentDetailPageProps {
  params: {
    id: string;
  };
}

export default function PaymentDetailPage({ params }: PaymentDetailPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Details</h1>
        <p className="text-muted-foreground">
          View details for payment #{params.id}
        </p>
      </div>

      <div className="rounded-lg border p-8">
        <p className="text-muted-foreground">
          Payment details will be displayed here
        </p>
      </div>
    </div>
  );
}
