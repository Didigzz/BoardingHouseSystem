"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { api } from "@/trpc/react";
import { Skeleton } from "@/shared/ui/skeleton";
import { UserAvatar } from "@/entities/user";

export default function BoarderProfilePage() {
  const { data: profile, isLoading } = api.user.getProfile.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <UserAvatar
              name={profile?.name}
              image={profile?.image}
              className="h-16 w-16"
            />
            <div>
              <h3 className="text-lg font-semibold">{profile?.name}</h3>
              <p className="text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
