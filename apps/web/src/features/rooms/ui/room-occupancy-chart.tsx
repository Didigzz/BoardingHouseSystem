"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { api } from "@/lib/orpc-client";
import { Skeleton } from "@bhms/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

export function RoomOccupancyChart() {
  const { data: stats, isLoading } = orpc.room.getStats.useQuery();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Room Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px]" />
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const data = [
    { name: "Available", value: stats.available, color: COLORS[0] },
    { name: "Occupied", value: stats.occupied, color: COLORS[1] },
    { name: "Maintenance", value: stats.maintenance, color: COLORS[2] },
  ].filter((item) => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Occupancy</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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

