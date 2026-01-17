import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@bhms/ui/components/primitives/card";

export default function ReportsPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          View analytics and generate reports
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/landlord/reports/revenue">
          <Card className="cursor-pointer transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle>Revenue Report</CardTitle>
              <CardDescription>
                View income and revenue analytics
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/landlord/reports/occupancy">
          <Card className="cursor-pointer transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle>Occupancy Report</CardTitle>
              <CardDescription>
                Track room occupancy rates and trends
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
