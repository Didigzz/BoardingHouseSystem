"use client";

import { BoarderList, AddBoarderDialog } from "./features/boarders";

export default function BoardersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Boarders</h1>
          <p className="text-muted-foreground">Manage your boarders</p>
        </div>
        <AddBoarderDialog />
      </div>

      <BoarderList />
    </div>
  );
}

