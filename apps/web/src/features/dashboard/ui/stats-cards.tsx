"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { DoorOpen, Users, CreditCard, TrendingUp } from "lucide-react";
import { api } from "@/lib/trpc-react";
import { Skeleton } from "@bhms/ui/skeleton";
import { formatCurrency } from "@bhms/shared";

export function StatsCards() {
  const { data: stats, isLoading } = api.dashboard.getStats.useQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      title: "Total Rooms",
      value: stats.rooms.total,
      description: `${stats.rooms.available} available`,
      icon: DoorOpen,
    },
    {
      title: "Active Boarders",
      value: stats.boarders.active,
      description: `of ${stats.boarders.total} total`,
      icon: Users,
    },
    {
      title: "Pending Payments",
      value: formatCurrency(stats.payments.pendingAmount),
      description: `${stats.payments.pendingCount} payments`,
      icon: CreditCard,
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      description: "Current occupancy",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

