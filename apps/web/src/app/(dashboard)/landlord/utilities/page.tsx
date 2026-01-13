"use client";

import { UtilityList, AddUtilityReadingDialog } from "./features/utilities";

export default function UtilitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Utilities</h1>
          <p className="text-muted-foreground">
            Manage utility readings and billing
          </p>
        </div>
        <AddUtilityReadingDialog />
      </div>

      <UtilityList />
    </div>
  );
}

