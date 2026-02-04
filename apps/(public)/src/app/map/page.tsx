import { Suspense } from "react";
import { MapContent } from "./map-content";

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <Suspense
        fallback={
          <div className="flex-1 bg-muted animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground">Loading map...</div>
          </div>
        }
      >
        <MapContent />
      </Suspense>
    </div>
  );
}
