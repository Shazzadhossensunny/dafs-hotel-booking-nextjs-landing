"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateType = Date | undefined;

const HotelAvailability: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<DateType>();
  const [checkOutDate, setCheckOutDate] = useState<DateType>();
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [isChecking, setIsChecking] = useState(false);

  const handleSearch = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 1000);
  };

  return (
    <div className="mt-8 ">
      <h2 className="text-xl font-semibold text-heading mb-4">Availability</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-[#A3D0EE] rounded-xl slide-in p-4">
        {/* Check-in */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Check-In
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left",
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                {checkInDate
                  ? format(checkInDate, "EEE, dd MMMM yyyy")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Check-Out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left",
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                {checkOutDate
                  ? format(checkOutDate, "EEE, dd MMMM yyyy")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                disabled={(date) => !checkInDate || date <= checkInDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Room & Guest
          </label>
          <Button variant="outline" className="w-full justify-start text-left">
            <Users2 className="mr-2 h-5 w-5 text-blue-500" />
            {`${guests.adults} Adults - ${guests.children} Children - ${guests.rooms} Room`}
          </Button>
        </div>

        {/* Search */}
        <div>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white w-full"
            onClick={handleSearch}
            disabled={!checkInDate || !checkOutDate || isChecking}
          >
            {isChecking ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelAvailability;
