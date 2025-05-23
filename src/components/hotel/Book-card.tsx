// src/components/hotel/book-card.jsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BookCard = ({ hotel }: any) => {
  return (
    <div className="border border-[#A3D0EE] rounded-lg overflow-hidden bg-white shadow-sm sticky top-20 fade-in">
      <div className="p-6">
        <div className="mb-4">
          <p className="text-foreground text-sm mb-1">
            1 week, 2 adults, 1 child
          </p>
          <div className="flex items-end">
            <span className="text-xl md:text-2xl font-semibold text-foreground">
              {hotel.currency} {hotel.price.toLocaleString()}
            </span>
          </div>
        </div>

        <Button className="w-full bg-[#007DD0] rounded-full text-white hover:bg-foreground cursor-pointer">
          Reserve
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
