export default function WaterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Water Tracking</h1>
        <p className="text-muted-foreground">
          Monitor and manage water consumption
        </p>
      </div>

      <div className="rounded-lg border p-8">
        <p className="text-muted-foreground">
          Water meter readings and billing will be displayed here
        </p>
      </div>
    </div>
  );
}
