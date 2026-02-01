"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Button } from "@bhms/ui/button";
import { Input } from "@bhms/ui/input";
import { useState } from "react";
import type { JSX } from "react";

export default function BoarderAccessPage(): JSX.Element {
  const [accessCode, setAccessCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle access code submission
    console.log("Access code:", accessCode);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Boarder Access</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="accessCode" className="text-sm font-medium">
                Enter your access code
              </label>
              <Input
                id="accessCode"
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full">
              Access Portal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}