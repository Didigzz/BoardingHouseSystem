"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Button, Input } from "@bhms/ui";
import { Search, List, X, MapPin } from "lucide-react";
import { mockBoardingHouses } from "@/lib/mock-data";
import { BoardingHouse } from "@/lib/types";
import { MapListingCard } from "./map-listing-card";

// Dynamic import for Leaflet (no SSR)
const MapContainer = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-muted animate-pulse flex items-center justify-center">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
});

export function MapContent() {
  const [selectedListing, setSelectedListing] = useState<BoardingHouse | null>(
    null
  );
  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = searchQuery
    ? mockBoardingHouses.filter(
        (bh) =>
          bh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bh.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bh.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockBoardingHouses;

  return (
    <div className="flex-1 flex relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2 md:left-4 md:right-auto md:w-96">
        <div className="flex-1 flex items-center gap-2 bg-background rounded-lg border shadow-lg px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search location..."
            className="flex-1 bg-transparent text-sm outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="bg-background shadow-lg"
          onClick={() => setShowList(!showList)}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Listings Sidebar (Mobile: Bottom Sheet, Desktop: Side Panel) */}
      {showList && (
        <div className="absolute bottom-0 left-0 right-0 md:relative md:w-96 z-[1000] bg-background border-t md:border-t-0 md:border-r max-h-[50vh] md:max-h-none overflow-y-auto">
          <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background">
            <div>
              <h3 className="font-semibold">Boarding Houses</h3>
              <p className="text-sm text-muted-foreground">
                {filteredListings.length} listings found
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowList(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="divide-y">
            {filteredListings.map((listing) => (
              <MapListingCard
                key={listing.id}
                listing={listing}
                isSelected={selectedListing?.id === listing.id}
                onClick={() => setSelectedListing(listing)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          listings={filteredListings}
          selectedListing={selectedListing}
          onSelectListing={setSelectedListing}
        />
      </div>

      {/* Selected Listing Preview (Mobile) */}
      {selectedListing && !showList && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] md:hidden">
          <div className="bg-background rounded-lg border shadow-lg p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-1">
                  {selectedListing.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{selectedListing.address}</span>
                </div>
                <div className="mt-2 font-semibold text-primary">
                  ₱{selectedListing.priceMin.toLocaleString()} - ₱
                  {selectedListing.priceMax.toLocaleString()}/mo
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedListing(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
