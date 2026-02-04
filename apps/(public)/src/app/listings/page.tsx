import { Suspense } from "react";
import { ListingCard, SearchFilters } from "@/components/listings";
import { getListings } from "@/lib/mock-data";
import { ListingsContent } from "./listings-content";

interface ListingsPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    priceMin?: string;
    priceMax?: string;
    amenities?: string;
    sort?: string;
  }>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Boarding Houses</h1>
        <p className="mt-2 text-muted-foreground">
          Find your perfect accommodation from our verified listings
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <Suspense fallback={<div className="h-12 animate-pulse bg-muted rounded" />}>
          <SearchFilters />
        </Suspense>
      </div>

      {/* Listings Grid */}
      <Suspense
        fallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        }
      >
        <ListingsContent
          query={params.q}
          location={params.location}
          priceMin={params.priceMin}
          priceMax={params.priceMax}
          amenities={params.amenities?.split(",").filter(Boolean)}
          sort={params.sort}
        />
      </Suspense>
    </div>
  );
}
