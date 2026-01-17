"use client";

import { api } from "@/lib/orpc-client";
import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Button } from "@bhms/ui/button";
import { Skeleton } from "@bhms/ui/skeleton";
import { Plus } from "lucide-react";

export default function UtilitiesPage(): JSX.Element {
  // TODO: Replace with actual oRPC query once types are fixed
  const utilities: Array<{
    id: string;
    type: string;
    room?: { roomNumber: string };
    currentReading: number;
    previousReading: number;
    readingDate: Date;
  }> = []; // Mock data
  const isLoading = false;

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Utilities</h1>
          <p className="text-muted-foreground">
            Manage utility readings and billing
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Reading
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Utility Readings</CardTitle>
          </CardHeader>
          <CardContent>
            {utilities && utilities.length > 0 ? (
              <div className="space-y-2">
                {utilities.map((utility: any) => (
                  <div key={utility.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{utility.type}</p>
                        <p className="text-sm text-muted-foreground">
                          Room {utility.room?.roomNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {Number(utility.currentReading) - Number(utility.previousReading)} units
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(utility.readingDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No utility readings found</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}