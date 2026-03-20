import { Suspense } from "react";
import { MapContent } from "./map-content";

export default function MapPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <Suspense
        fallback={
          <div className="bg-muted flex flex-1 animate-pulse items-center justify-center">
            <div className="text-muted-foreground">Loading map...</div>
          </div>
        }
      >
        <MapContent />
      </Suspense>
    </div>
  );
}
