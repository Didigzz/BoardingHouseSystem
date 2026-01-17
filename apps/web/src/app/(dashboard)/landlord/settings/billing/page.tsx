export default function BillingSettingsPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing Settings</h1>
        <p className="text-muted-foreground">
          Manage billing and payment methods
        </p>
      </div>

      <div className="rounded-lg border p-8">
        <p className="text-muted-foreground">
          Billing configuration will be displayed here
        </p>
      </div>
    </div>
  );
}
