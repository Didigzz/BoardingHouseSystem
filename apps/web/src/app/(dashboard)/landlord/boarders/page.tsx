"use client";

import { api } from "@/lib/orpc-client";
import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Button } from "@bhms/ui/button";
import { Skeleton } from "@bhms/ui/skeleton";
import { Plus } from "lucide-react";

export default function BoardersPage(): JSX.Element {
  // TODO: Replace with actual oRPC query once types are fixed
  const boarders: Array<{id: string, firstName: string, lastName: string, email: string}> = []; // Mock data
  const isLoading = false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Boarders</h1>
          <p className="text-muted-foreground">Manage your boarders</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Boarder
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
            <CardTitle>Boarder List</CardTitle>
          </CardHeader>
          <CardContent>
            {boarders && boarders.length > 0 ? (
              <div className="space-y-2">
                {boarders.map((boarder: any) => (
                  <div key={boarder.id} className="p-4 border rounded-lg">
                    <p className="font-semibold">{boarder.firstName} {boarder.lastName}</p>
                    <p className="text-sm text-muted-foreground">{boarder.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No boarders found</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}