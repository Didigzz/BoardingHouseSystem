interface PaymentDetailPageProps {
  params: {
    id: string;
  };
}

export default function PaymentDetailPage({ params }: PaymentDetailPageProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Details</h1>
        <p className="text-muted-foreground">
          View and manage payment #{params.id}
        </p>
      </div>

      <div className="rounded-lg border p-8">
        <p className="text-muted-foreground">
          Payment details and actions will be displayed here
        </p>
      </div>
    </div>
  );
}
