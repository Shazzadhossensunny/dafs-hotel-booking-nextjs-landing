"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Users2,
  Wifi,
  Utensils,
  Snowflake,
  Dumbbell,
  Users,
  Bed,
  Square,
  Tv,
  Bath,
  MapPin,
  Star,
  ChevronDown,
  MessageCircle,
  Car,
  Train,
  ShoppingBag,
  Minus,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const styles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
`;

// Mock shadcn/ui components
const Button = ({
  children,
  className = "",
  variant = "default",
  onClick,
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-4 py-2";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Calendar = ({
  mode = "single",
  selected,
  onSelect,
  disabled,
  ...props
}: {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  [key: string]: any;
}) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isDisabled = disabled ? disabled(date) : false;
    const isSelected =
      selected && date.toDateString() === selected.toDateString();
    const isToday = date.toDateString() === today.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => !isDisabled && onSelect && onSelect(date)}
        disabled={isDisabled}
        className={`w-8 h-8 text-sm rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
          isSelected ? "bg-primary text-primary-foreground" : ""
        } ${isToday ? "font-bold" : ""}`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="p-3">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="w-8 h-8 text-xs font-medium flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

const Popover = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

const PopoverTrigger = ({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

const PopoverContent = ({
  children,
  className = "",
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: string;
}) => {
  return (
    <div
      className={`absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

type DateType = Date | undefined;

interface GuestCounts {
  adults: number;
  children: number;
  rooms: number;
}

interface RoomData {
  id: string;
  name: string;
  beds: string;
  size: string;
  price: number;
  amenities: string[];
  features: string;
  availability: string;
  maxGuests: number;
}

const HotelBookingApp = () => {
  const [checkInDate, setCheckInDate] = useState<DateType>();
  const [checkOutDate, setCheckOutDate] = useState<DateType>();
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>({
    twin: 0,
    deluxe1: 0,
    deluxe2: 0,
  });

  useEffect((): any => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const roomData: RoomData[] = [
    {
      id: "twin",
      name: "Twin Room",
      beds: "2 single beds",
      size: "1200 sq ft",
      price: 282,
      amenities: ["Room", "Air condition", "TV", "Bathroom", "WiFi"],
      features: "Breakfast included",
      availability: "Only 4 rooms left",
      maxGuests: 2,
    },
    {
      id: "deluxe1",
      name: "Deluxe Double Room",
      beds: "2 single beds",
      size: "1200 sq ft",
      price: 282,
      amenities: ["Room", "Air condition", "TV", "Bathroom", "WiFi"],
      features: "Breakfast included",
      availability: "Only 4 rooms left",
      maxGuests: 2,
    },
    {
      id: "deluxe2",
      name: "Deluxe Double Room",
      beds: "2 single beds",
      size: "1200 sq ft",
      price: 282,
      amenities: ["Room", "Air condition", "TV", "Bathroom", "WiFi"],
      features: "Breakfast included",
      availability: "Only 4 rooms left",
      maxGuests: 2,
    },
  ];

  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1500);
  };

  const updateGuestCount = (type: keyof GuestCounts, increment: boolean) => {
    setGuests((prev) => {
      const newValue = increment ? prev[type] + 1 : prev[type] - 1;
      const minValue = type === "adults" ? 1 : 0;
      const maxValue = type === "rooms" ? 5 : 10;

      return {
        ...prev,
        [type]: Math.max(minValue, Math.min(maxValue, newValue)),
      };
    });
  };

  const updateRoomCount = (roomId: string, count: number) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [roomId]: Math.max(0, Math.min(5, count)),
    }));
  };

  const getTotalSelectedRooms = () => {
    return Object.values(selectedRooms).reduce((sum, count) => sum + count, 0);
  };

  const cn = (...classes: (string | undefined | false)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className=" bg-gray-50">
      {/* Search Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold text-black mb-4">
            Availability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-blue-200 rounded-xl bg-white">
            {/* Check-in */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-In
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left h-11",
                      !checkInDate && "text-gray-400"
                    )}
                    onClick={() => setOpenCheckIn(!openCheckIn)}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                    {checkInDate
                      ? format(checkInDate, "EEE, dd MMM yyyy")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                {openCheckIn && (
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={(date) => {
                        setCheckInDate(date);
                        setOpenCheckIn(false);
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                )}
              </Popover>
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-Out
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left h-11",
                      !checkOutDate && "text-gray-400"
                    )}
                    onClick={() => setOpenCheckOut(!openCheckOut)}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                    {checkOutDate
                      ? format(checkOutDate, "EEE, dd MMM yyyy")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                {openCheckOut && (
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={(date) => {
                        setCheckOutDate(date);
                        setOpenCheckOut(false);
                      }}
                      disabled={(date) => !checkInDate || date <= checkInDate}
                    />
                  </PopoverContent>
                )}
              </Popover>
            </div>

            {/* Guests */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room & Guest
              </label>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-11"
                onClick={() => setShowGuestSelector(!showGuestSelector)}
              >
                <Users2 className="mr-2 h-5 w-5 text-blue-500" />
                {`${guests.adults} Adults - ${guests.children} Children - ${guests.rooms} Room`}
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>

              {showGuestSelector && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-50">
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Adults</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateGuestCount("adults", false)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={guests.adults <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{guests.adults}</span>
                        <button
                          onClick={() => updateGuestCount("adults", true)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Children</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateGuestCount("children", false)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={guests.children <= 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">
                          {guests.children}
                        </span>
                        <button
                          onClick={() => updateGuestCount("children", true)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Rooms</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateGuestCount("rooms", false)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={guests.rooms <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{guests.rooms}</span>
                        <button
                          onClick={() => updateGuestCount("rooms", true)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowGuestSelector(false)}
                    className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                &nbsp;
              </label>
              <Button
                className="bg-[#007DD0] hover:bg-primary text-white w-full h-11 !rounded-4xl"
                onClick={handleSearch}
                disabled={!checkInDate || !checkOutDate || isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </div>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="container mx-auto">
          {/* Room Selection Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              {/* Header */}
              <div className="bg-[#007DD0] text-white">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 p-4 text-sm font-medium">
                  <div className="lg:col-span-1">Room type</div>
                  <div className="text-center">Number of guests</div>
                  <div className="text-center">Price for 1 week</div>
                  <div>Your choices</div>
                  <div className="text-center">Select rooms</div>
                  <div className="text-center">Action</div>
                </div>
              </div>

              {/* Room Rows */}
              {roomData.map((room, index) => (
                <div
                  key={room.id}
                  className={`grid grid-cols-1 lg:grid-cols-6 gap-4 p-4 border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Room Type */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-blue-600">{room.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Bed className="w-4 h-4" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Square className="w-4 h-4" />
                      <span>Room</span>
                      <span className="ml-2">{room.size}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Snowflake className="w-3 h-3" />
                        Air condition
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        Bathroom
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Tv className="w-3 h-3" />
                        TV
                      </span>
                      <span className="flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        WiFi
                      </span>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div className="flex justify-center items-start pt-2">
                    <div className="flex gap-1">
                      {Array.from({ length: room.maxGuests }).map((_, i) => (
                        <Users key={i} className="w-5 h-5 text-gray-600" />
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <div className="text-2xl font-bold">${room.price}</div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    <div className="text-sm">{room.features}</div>
                    <div className="text-sm text-red-500 font-medium">
                      {room.availability}
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div className="flex justify-center">
                    <div className="relative min-w-[120px]">
                      <Select
                        value={selectedRooms[room.id].toString()}
                        onValueChange={(value: any) =>
                          updateRoomCount(room.id, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5].map((num: number) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Reserve Button */}
                  <div className="flex justify-center items-start ">
                    <Button className="bg-[#007DD0] w-full text-white px-2 py-2 !rounded-4xl font-medium hover:bg-blue-600 transition-colors ">
                      Reserve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          {getTotalSelectedRooms() > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Check-in:{" "}
                    {checkInDate
                      ? format(checkInDate, "EEE, dd MMM yyyy")
                      : "Not selected"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Check-out:{" "}
                    {checkOutDate
                      ? format(checkOutDate, "EEE, dd MMM yyyy")
                      : "Not selected"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Guests: {guests.adults} Adults, {guests.children} Children
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Total Rooms Selected: {getTotalSelectedRooms()}
                  </p>
                  <p className="text-lg font-semibold">
                    Total Price: $
                    {Object.entries(selectedRooms).reduce(
                      (total, [roomId, count]) => {
                        const room = roomData.find((r) => r.id === roomId);
                        return total + (room ? room.price * count : 0);
                      },
                      0
                    )}
                  </p>
                </div>
              </div>
              <button className="w-full md:w-auto mt-4 bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          <span className="sr-only">Chat Support</span>
        </button>
      </div>
    </div>
  );
};

export default HotelBookingApp;
