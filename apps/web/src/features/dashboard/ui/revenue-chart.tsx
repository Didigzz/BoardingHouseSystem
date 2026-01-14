"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { api } from "@/lib/trpc-react";
import { Skeleton } from "@bhms/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RevenueChart() {
  const { data: monthlyRevenue, isLoading } = api.payment.getMonthlyRevenue.useQuery({});

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (!monthlyRevenue) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(value)
              }
            />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

