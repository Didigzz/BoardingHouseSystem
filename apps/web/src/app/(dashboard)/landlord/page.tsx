import { StatsCards, RecentActivity, UpcomingPayments } from "./features/dashboard";

export default function LandlordDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to your boarding house dashboard
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
        <UpcomingPayments />
      </div>
    </div>
  );
}

