"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { api } from "@/trpc/react";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatDate } from "@/shared/lib/utils";

export function UtilityConsumptionChart() {
  const { data: consumption, isLoading } = api.utility.getConsumptionSummary.useQuery({
    months: 6,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Utility Consumption</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (!consumption?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Utility Consumption</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-10">
            No consumption data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = consumption.map((item) => ({
    date: formatDate(item.date),
    room: item.room,
    consumption: item.consumption,
    cost: item.cost,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Utility Consumption</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="consumption" fill="#3b82f6" name="Consumption (units)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
