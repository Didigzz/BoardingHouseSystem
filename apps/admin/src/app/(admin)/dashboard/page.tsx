"use client";

import {
  Building2,
  CreditCard,
  DoorOpen,
  TrendingUp,
  Users,
  Wrench,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useProperty } from "@/lib/property-context";
import { getDashboardStats } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  StatsCard,
  RevenueChart,
  OccupancyChart,
  RecentPayments,
  MaintenanceOverview,
  UpcomingLeases,
} from "@/components/dashboard";
import { Skeleton } from "@bhms/ui";

export default function DashboardPage() {
  const { currentProperty, isLoading } = useProperty();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const stats = getDashboardStats(currentProperty?.id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {currentProperty
            ? `Overview for ${currentProperty.name}`
            : "Overview across all properties"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Rooms"
          value={stats.totalRooms}
          description={`${stats.occupancyRate}% occupancy rate`}
          icon={DoorOpen}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Active Tenants"
          value={stats.activeTenants}
          description={`of ${stats.totalTenants} total tenants`}
          icon={Users}
        />
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          description="from last month"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Outstanding Payments"
          value={formatCurrency(stats.outstandingPayments)}
          description={`${formatCurrency(stats.overduePayments)} overdue`}
          icon={CreditCard}
          className={stats.overduePayments > 0 ? "border-destructive/50" : ""}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Available Rooms"
          value={stats.availableRooms}
          description="ready for new tenants"
          icon={DoorOpen}
        />
        <StatsCard
          title="Under Maintenance"
          value={stats.maintenanceRooms}
          description="rooms unavailable"
          icon={Wrench}
        />
        <StatsCard
          title="Pending Maintenance"
          value={stats.pendingMaintenance}
          description="requests to handle"
          icon={AlertCircle}
          className={stats.pendingMaintenance > 0 ? "border-yellow-500/50" : ""}
        />
        <StatsCard
          title="Expiring Leases"
          value={stats.expiringSoonLeases}
          description="within 30 days"
          icon={Clock}
          className={stats.expiringSoonLeases > 0 ? "border-orange-500/50" : ""}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <RevenueChart propertyId={currentProperty?.id} />
        <OccupancyChart propertyId={currentProperty?.id} />
      </div>

      {/* Detailed Sections */}
      <div className="grid gap-4 lg:grid-cols-3">
        <RecentPayments propertyId={currentProperty?.id} />
        <MaintenanceOverview propertyId={currentProperty?.id} />
        <UpcomingLeases propertyId={currentProperty?.id} />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="col-span-2 h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  );
}
