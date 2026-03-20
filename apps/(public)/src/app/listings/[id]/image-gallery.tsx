"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@havenspace/shared/ui";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const displayImages =
    images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"];

  const currentImage = displayImages[currentIndex] ?? displayImages[0]!;

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="container py-4">
        <div className="grid h-[300px] gap-2 md:h-[400px] md:grid-cols-4 md:grid-rows-2">
          {/* Main Image */}
          <div
            className="group relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-l-xl"
            onClick={() => setIsFullscreen(true)}
          >
            <Image
              src={displayImages[0]!}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-4 bottom-4 gap-2 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Expand className="h-4 w-4" />
              View all photos
            </Button>
          </div>

          {/* Secondary Images */}
          {displayImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className={`group relative hidden cursor-pointer overflow-hidden md:block ${
                index === 1 ? "rounded-tr-xl" : ""
              } ${index === 3 ? "rounded-br-xl" : ""}`}
              onClick={() => {
                setCurrentIndex(index + 1);
                setIsFullscreen(true);
              }}
            >
              <Image
                src={image}
                alt={`${name} - Image ${index + 2}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              {index === 3 && displayImages.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-lg font-semibold text-white">
                    +{displayImages.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 text-sm text-white">
            {currentIndex + 1} / {displayImages.length}
          </div>

          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* Image */}
          <div className="relative mx-4 h-[80vh] w-full max-w-5xl">
            <Image
              src={currentImage}
              alt={`${name} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto p-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded ${
                  index === currentIndex
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-100"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
