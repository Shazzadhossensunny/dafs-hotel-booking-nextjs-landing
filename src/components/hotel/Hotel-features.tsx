"use client";

import React, { useState } from "react";
import {
  Wifi,
  WavesLadder,
  Utensils,
  Snowflake,
  Dumbbell,
  Lock,
  House,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import BookCard from "./Book-card";

type Feature = {
  icon: string;
  name: string;
};

type Hotel = {
  type: string;
  size: string;
  features: Feature[];
};

type Props = {
  hotel: Hotel;
};

const getIcon = (iconName: string) => {
  const iconMap: { [key: string]: React.ElementType } = {
    wifi: Wifi,
    utensils: Utensils,
    "swimming-pool": WavesLadder,
    snowflake: Snowflake,
    dumbbell: Dumbbell,
  };
  const IconComponent = iconMap[iconName.toLowerCase()] || Lock;
  return <IconComponent className="h-5 w-5" />;
};

const HotelFeatures = ({ hotel }: Props) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full p-4">
      <nav className="flex flex-wrap space-x-4 items-center">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-2 px-1 font-medium transition-colors cursor-pointer ${
            activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-foreground hover:text-primary"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`pb-2 px-1 font-medium transition-colors cursor-pointer ${
            activeTab === "features"
              ? "text-primary border-b-2 border-primary"
              : "text-foreground hover:text-primary"
          }`}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 px-1 font-medium transition-colors cursor-pointer ${
            activeTab === "reviews"
              ? "text-primary border-b-2 border-primary"
              : "text-foreground hover:text-primary"
          }`}
        >
          Reviews
        </button>

        <Button className="relative rounded-full flex justify-center items-center gap-1 bg-[#007DD0] px-3 py-1 hover:bg-foreground transition-colors duration-300 cursor-pointer">
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white border border-white"></div>
          </div>
          <span className="text-white text-sm">Message</span>
        </Button>
      </nav>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Left: Info and Features */}
        <div className="w-full lg:w-2/3 space-y-8">
          {activeTab === "overview" && (
            <>
              <div>
                <h2 className="text-xl font-semibold text-heading mb-2">
                  Property Type
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <House className="w-3 h-3 text-foreground mr-2" />

                    <span className="text-foreground">{hotel?.type}</span>
                  </div>
                  <div className="flex items-center">
                    <House className="w-3 h-3 text-foreground mr-2" />
                    <span className="text-foreground">{hotel?.size}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-heading mb-4">
                  Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel?.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-2 text-foreground">
                        {getIcon(feature.icon)}
                      </div>
                      <span className="text-foreground">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "features" && (
            <div className="text-foreground">
              Extra features content here...
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-foreground">Reviews content here...</div>
          )}
        </div>

        {/* Right: Booking Info Box */}
        <div className="w-full lg:w-1/3">
          {/* <div className="border border-[#A3D0EE] rounded-lg p-6 shadow-sm space-y-4">
            <p className="text-sm text-gray-600">1 week, 2 adults, 1 child</p>
            <p className="text-2xl font-semibold text-black">USD $6,112</p>
            <Button className="w-full bg-primary rounded-full text-white hover:bg-foreground">
              Reserve
            </Button>
          </div> */}
          <BookCard hotel={hotel} />
        </div>
      </div>
    </div>
  );
};

export default HotelFeatures;
