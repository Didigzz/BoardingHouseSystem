export default function OccupancyReportPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Occupancy Report</h1>
        <p className="text-muted-foreground">
          Track room occupancy rates and patterns
        </p>
      </div>

      <div className="rounded-lg border p-8">
        <p className="text-muted-foreground">
          Occupancy charts and statistics will be displayed here
        </p>
      </div>
    </div>
  );
}
