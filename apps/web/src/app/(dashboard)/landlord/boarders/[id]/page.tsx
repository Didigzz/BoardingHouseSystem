"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { BoarderAvatar, BoarderStatusBadge } from "@/entities/boarder";
import { PaymentCard } from "@/entities/payment";
import { ArrowLeft, Edit, Trash2, Mail, Phone, DoorOpen, Calendar, AlertCircle } from "lucide-react";
import { formatDate, formatCurrency } from "@/shared/lib/utils";
import { useState } from "react";
import { EditBoarderDialog, DeleteBoarderDialog } from "@/features/boarders";

export default function BoarderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const boarderId = params.id as string;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: boarder, isLoading } = api.boarder.getById.useQuery({ id: boarderId });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!boarder) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Boarder not found</p>
        <Button variant="link" onClick={() => router.push("/landlord/boarders")}>
          Back to Boarders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/landlord/boarders")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <BoarderAvatar
            firstName={boarder.firstName}
            lastName={boarder.lastName}
            className="h-12 w-12"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {boarder.firstName} {boarder.lastName}
            </h1>
            <BoarderStatusBadge isActive={boarder.isActive} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{boarder.email}</span>
            </div>
            {boarder.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{boarder.phone}</span>
              </div>
            )}
            {boarder.room && (
              <div className="flex items-center gap-2">
                <DoorOpen className="h-4 w-4 text-muted-foreground" />
                <span>Room {boarder.room.roomNumber}</span>
                <span className="text-muted-foreground">
                  ({formatCurrency(Number(boarder.room.monthlyRate))}/mo)
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Move-in: {formatDate(boarder.moveInDate)}</span>
            </div>
            {boarder.moveOutDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Move-out: {formatDate(boarder.moveOutDate)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {boarder.emergencyContact || boarder.emergencyPhone ? (
              <>
                {boarder.emergencyContact && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{boarder.emergencyContact}</span>
                  </div>
                )}
                {boarder.emergencyPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{boarder.emergencyPhone}</span>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">No emergency contact provided</p>
            )}
          </CardContent>
        </Card>
      </div>

      {boarder.accessCode && (
        <Card>
          <CardHeader>
            <CardTitle>Access Code</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono bg-muted px-3 py-1 rounded">
              {boarder.accessCode}
            </code>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {boarder.payments && boarder.payments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {boarder.payments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No payment records</p>
          )}
        </CardContent>
      </Card>

      <EditBoarderDialog boarder={boarder} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteBoarderDialog boarder={boarder} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}
