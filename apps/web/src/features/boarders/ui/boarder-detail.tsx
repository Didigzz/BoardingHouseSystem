"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, CreditCard, Home } from "lucide-react";
import { api } from "@/lib/trpc-react";
import { Button } from "@bhms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Badge } from "@bhms/ui/badge";
import { Skeleton } from "@bhms/ui/skeleton";
import { formatCurrency, formatDate } from "@bhms/shared";
import { PaymentStatusBadge } from "@bhms/shared/entities/payment";
import { EditBoarderDialog } from "./edit-boarder-dialog";

interface BoarderDetailProps {
  boarderId: string;
}

export function BoarderDetail({ boarderId }: BoarderDetailProps) {
  const [editOpen, setEditOpen] = useState(false);

  const { data: boarder, isLoading } = api.boarder.getById.useQuery({ id: boarderId });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!boarder) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground">Boarder not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/landlord/boarders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {boarder.firstName} {boarder.lastName}
            </h1>
            <p className="text-muted-foreground">{boarder.email}</p>
          </div>
          <Badge variant={boarder.isActive ? "success" : "secondary"}>
            {boarder.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <Button variant="outline" onClick={() => setEditOpen(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span>{boarder.phone ?? "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Move-in Date</span>
              <span>{formatDate(boarder.moveInDate)}</span>
            </div>
            {boarder.moveOutDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Move-out Date</span>
                <span>{formatDate(boarder.moveOutDate)}</span>
              </div>
            )}
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Emergency Contact</p>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span>{boarder.emergencyContact ?? "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{boarder.emergencyPhone ?? "Not provided"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Room Assignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {boarder.room ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room</span>
                  <Link
                    href={`/landlord/rooms/${boarder.room.id}`}
                    className="text-primary hover:underline"
                  >
                    Room {boarder.room.roomNumber}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Floor</span>
                  <span>{boarder.room.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span>{formatCurrency(Number(boarder.room.monthlyRate))}/mo</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No room assigned</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {boarder.payments && boarder.payments.length > 0 ? (
              <div className="space-y-3">
                {boarder.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{payment.description ?? payment.type}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {formatDate(payment.dueDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(Number(payment.amount))}</p>
                      <PaymentStatusBadge status={payment.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No payments recorded</p>
            )}
          </CardContent>
        </Card>
      </div>

      <EditBoarderDialog boarder={boarder} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  );
}

