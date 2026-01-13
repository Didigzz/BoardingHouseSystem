"use client";

import { auth } from "./lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { api } from "./lib/trpc-react";
import { Skeleton } from "@bhms/ui/skeleton";
import { formatCurrency, formatDate } from "@bhms/shared";
import { DoorOpen, CreditCard, Calendar, AlertCircle } from "lucide-react";
import { PaymentStatusBadge } from "@bhms/shared/entities/payment";

export default function BoarderDashboardPage() {
  const { data: profile, isLoading: profileLoading } = api.user.getProfile.useQuery();

  if (profileLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {profile?.name ?? "Boarder"}</h1>
        <p className="text-muted-foreground">Your boarding house dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Room</CardTitle>
            <DoorOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Room Info</div>
            <p className="text-xs text-muted-foreground">View your room details</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Up to Date</div>
            <p className="text-xs text-muted-foreground">All payments current</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Move-in Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Your move-in date</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>No new announcements</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

