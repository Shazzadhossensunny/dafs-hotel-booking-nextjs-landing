"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface HotelGalleryProps {
  images: string[];
}

export default function HotelGallery({ images }: HotelGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full space-y-4 rounded-xl overflow-hidden">
      {/* Main Grid Container */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[600px]">
        {/* Main Image (2 columns, 2 rows) */}
        <div className="col-span-2 row-span-2 relative rounded-tl-xl overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt="Main hotel image"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column Images (1 column, 2 rows) */}
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <Image
            src={images[(currentIndex + 1) % images.length]}
            alt="Secondary image 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden rounded-tr-xl">
          <Image
            src={images[(currentIndex + 2) % images.length]}
            alt="Secondary image 2"
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnail Row (6 images) */}
        <div className="col-span-3 row-span-1 flex gap-2 p-2 bg-gray-100">
          {images.slice(3, 9).map((src, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-1/6 h-full rounded-md overflow-hidden"
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 4}`}
                fill
                className="object-cover cursor-pointer"
                onClick={() => setCurrentIndex(index + 3)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center px-4">
        <div className="text-dayf-primary font-medium">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
