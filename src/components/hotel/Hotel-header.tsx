// src/components/hotel/hotel-header.jsx
"use client";

import React from "react";
import { ArrowRight, Bookmark, MoveRight, Share2, Users } from "lucide-react";
import Link from "next/link";

const HotelHeader = ({ hotel }: any) => {
  return (
    <div className="mb-8 mt-10 slide-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-heading mb-2">
            {hotel.name}
          </h1>
          <p className="text-foreground mb-4">{hotel.description}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="bg-[#007DD01A]  rounded-full p-4 hover:bg-gray-50 transition-colors"
            aria-label="Save to favorites"
          >
            <Bookmark className="h-10 w-10 text-primary" />
          </button>
          <button
            className="bg-[#007DD01A]  rounded-full p-4 hover:bg-gray-50 transition-colors"
            aria-label="Share with friends"
          >
            <Share2 className="h-10 w-10 text-primary" />
          </button>
          <Link
            href="#"
            className="flex justify-center items-center gap-1 bg-[#007DD0] px-6.5 py-2.5 rounded-full text-white text-xl font-semibold hover:bg-foreground transition-colors"
          >
            Reserve
            <ArrowRight className="h-5 w-5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;
