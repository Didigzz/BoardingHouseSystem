"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { api } from "@/lib/orpc-client";
import { Skeleton } from "@bhms/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@bhms/ui/avatar";

export default function BoarderProfilePage(): JSX.Element {
  // TODO: Replace with actual oRPC query once types are fixed
  const profile = { name: "Boarder", email: "boarder@example.com", image: null }; // Mock data
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.image ?? undefined} alt={profile?.name ?? "User"} />
              <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
            </Avatar>
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