"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { api } from "@/trpc/react";
import { Skeleton } from "@/shared/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

export function OccupancyChart() {
  const { data: stats, isLoading } = api.room.getStats.useQuery();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Room Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const data = [
    { name: "Available", value: stats.available },
    { name: "Occupied", value: stats.occupied },
    { name: "Maintenance", value: stats.maintenance },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Occupancy</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
