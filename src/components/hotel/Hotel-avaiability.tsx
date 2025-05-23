"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DateType = Date | undefined;

interface GuestConfig {
  adults: number;
  children: number;
  rooms: number;
}

const HotelAvailability: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<DateType>();
  const [checkOutDate, setCheckOutDate] = useState<DateType>();
  const [guests, setGuests] = useState<GuestConfig>({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [isChecking, setIsChecking] = useState(false);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);

  const handleSearch = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 1000);
  };

  const formatGuestText = (guestConfig: GuestConfig) => {
    const parts = [];
    if (guestConfig.adults > 0) {
      parts.push(
        `${guestConfig.adults} Adult${guestConfig.adults > 1 ? "s" : ""}`
      );
    }
    if (guestConfig.children > 0) {
      parts.push(
        `${guestConfig.children} Child${guestConfig.children > 1 ? "ren" : ""}`
      );
    }
    parts.push(`${guestConfig.rooms} Room${guestConfig.rooms > 1 ? "s" : ""}`);
    return parts.join(" • ");
  };

  const updateGuests = (type: keyof GuestConfig, value: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const GuestSelector = () => (
    <Popover open={isGuestPopoverOpen} onOpenChange={setIsGuestPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left"
          role="combobox"
        >
          <div className="flex items-center">
            <Users2 className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
            <span className="truncate">{formatGuestText(guests)}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-sm text-muted-foreground">
                  Ages 13 or above
                </p>
              </div>
              <Select
                value={guests.adults.toString()}
                onValueChange={(value) =>
                  updateGuests("adults", parseInt(value))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Children</p>
                <p className="text-sm text-muted-foreground">Ages 0-12</p>
              </div>
              <Select
                value={guests.children.toString()}
                onValueChange={(value) =>
                  updateGuests("children", parseInt(value))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 6 }, (_, i) => i).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rooms</p>
                <p className="text-sm text-muted-foreground">Number of rooms</p>
              </div>
              <Select
                value={guests.rooms.toString()}
                onValueChange={(value) =>
                  updateGuests("rooms", parseInt(value))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t">
            <Button
              size="sm"
              onClick={() => setIsGuestPopoverOpen(false)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-heading mb-4">Availability</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-[#A3D0EE] rounded-xl slide-in p-4">
        {/* Check-in */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">
            Check-In
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left h-auto py-2.5",
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  {checkInDate ? (
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium leading-none">
                        {format(checkInDate, "EEE, dd MMM")}
                      </div>
                      <div className="text-xs text-muted-foreground leading-none">
                        {format(checkInDate, "yyyy")}
                      </div>
                    </div>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </div>
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
        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">
            Check-Out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left h-auto py-2.5",
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  {checkOutDate ? (
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium leading-none">
                        {format(checkOutDate, "EEE, dd MMM")}
                      </div>
                      <div className="text-xs text-muted-foreground leading-none">
                        {format(checkOutDate, "yyyy")}
                      </div>
                    </div>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </div>
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
        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">
            Room & Guest
          </label>
          <GuestSelector />
        </div>

        {/* Search */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-transparent">
            Search
          </label>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white w-full h-auto py-2.5"
            onClick={handleSearch}
            disabled={!checkInDate || !checkOutDate || isChecking}
          >
            {isChecking ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {/* Summary when dates are selected */}
      {checkInDate && checkOutDate && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-700 font-medium">
              {format(checkInDate, "dd MMM yyyy")} →{" "}
              {format(checkOutDate, "dd MMM yyyy")}
            </span>
            <span className="text-blue-600">
              {Math.ceil(
                (checkOutDate.getTime() - checkInDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              nights
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelAvailability;
