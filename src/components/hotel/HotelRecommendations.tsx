"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Bed,
  Bath,
  Square,
  Info,
  MapPin,
  Wifi,
  Car,
  Coffee,
} from "lucide-react";
import Image from "next/image";

// Mock data for recommended hotels
const recommendedHotels = [
  {
    id: 1,
    name: "Sofitel Algiers Hamma Garden",
    description:
      "Sofitel Algiers Hamma Garden offers luxurious accommodations overlooking the stunning Botanical Garden of Hamma.",
    image: "/images/hotel12.png",
    price: 699,
    currency: "DZD",
    period: "Per Night",
    rating: 4.5,
    reviewCount: 128,
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq ft",
    location: "Hamma, Algiers",
    features: ["Pool", "Spa", "Garden View"],
    amenities: ["Wifi", "Parking", "Restaurant"],
    badge: "Luxury",
  },
  {
    id: 2,
    name: "Grand Hotel Mercure",
    description:
      "Experience luxury in the heart of Algiers with stunning city views and premium amenities.",
    image: "/images/hotel12.png",
    price: 799,
    currency: "DZD",
    period: "Per Night",
    rating: 4.6,
    reviewCount: 95,
    bedrooms: 3,
    bathrooms: 2,
    area: "1400 sq ft",
    location: "City Center, Algiers",
    features: ["Pool", "Gym", "City View"],
    amenities: ["Wifi", "Spa", "Business Center"],
    badge: "Popular",
  },
  {
    id: 3,
    name: "Hotel Safir Algiers",
    description:
      "Modern accommodations with Mediterranean charm and exceptional service.",
    image: "/images/hotel12.png",
    price: 599,
    currency: "DZD",
    period: "Per Night",
    rating: 4.3,
    reviewCount: 76,
    bedrooms: 2,
    bathrooms: 1,
    area: "1000 sq ft",
    location: "Waterfront, Algiers",
    features: ["Pool", "Restaurant", "Beach Access"],
    amenities: ["Wifi", "Parking", "Room Service"],
    badge: "Best Value",
  },
  {
    id: 4,
    name: "Hilton Algiers",
    description:
      "Premium hotel offering world-class service and stunning Mediterranean views.",
    image: "/images/hotel12.png",
    price: 899,
    currency: "DZD",
    period: "Per Night",
    rating: 4.7,
    reviewCount: 156,
    bedrooms: 2,
    bathrooms: 2,
    area: "1300 sq ft",
    location: "Bay Area, Algiers",
    features: ["Pool", "Spa", "Sea View"],
    amenities: ["Wifi", "Gym", "Concierge"],
    badge: "Premium",
  },
  {
    id: 5,
    name: "Sheraton Algiers Hotel",
    description:
      "Elegant accommodations with modern amenities in the heart of the diplomatic district.",
    image: "/images/hotel12.png",
    price: 749,
    currency: "DZD",
    period: "Per Night",
    rating: 4.4,
    reviewCount: 203,
    bedrooms: 2,
    bathrooms: 2,
    area: "1150 sq ft",
    location: "Diplomatic District, Algiers",
    features: ["Pool", "Business Center", "Garden"],
    amenities: ["Wifi", "Parking", "Restaurant"],
    badge: "Business",
  },
  {
    id: 6,
    name: "El Aurassi Hotel",
    description:
      "Historic luxury hotel with panoramic views of Algiers Bay and the Mediterranean Sea.",
    image: "/images/hotel12.png",
    price: 649,
    currency: "DZD",
    period: "Per Night",
    rating: 4.2,
    reviewCount: 89,
    bedrooms: 2,
    bathrooms: 1,
    area: "1100 sq ft",
    location: "Heights, Algiers",
    features: ["Pool", "Panoramic View", "Terrace"],
    amenities: ["Wifi", "Restaurant", "Bar"],
    badge: "Historic",
  },
];

const HotelRecommendationsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlide = recommendedHotels.length - slidesToShow;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, isHovered]);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Luxury":
        return "bg-gradient-to-r from-purple-500 to-purple-600";
      case "Popular":
        return "bg-gradient-to-r from-orange-500 to-orange-600";
      case "Best Value":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "Premium":
        return "bg-gradient-to-r from-blue-500 to-blue-600";
      case "Business":
        return "bg-gradient-to-r from-gray-600 to-gray-700";
      case "Historic":
        return "bg-gradient-to-r from-amber-500 to-amber-600";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-600";
    }
  };

  const HotelCard = ({ hotel }: { hotel: (typeof recommendedHotels)[0] }) => (
    <div className="flex-shrink-0 w-full px-2">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
        {/* Hotel Image */}
        <div className="relative h-56 overflow-hidden">
          {/* Background gradient as fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300" />

          {/* Overlay gradients for better image presentation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 z-10" />

          {/* Image placeholder with better styling */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-20">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                <svg
                  className="w-10 h-10 text-white/80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-white/90">Hotel Image</p>
            </div>
          </div>

          {/* If you want to use actual images, uncomment this: */}
          <Image
            src={hotel.image}
            fill
            alt={hotel.name}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Hotel Badge */}
          <div
            className={`absolute top-4 left-4 ${getBadgeColor(
              hotel.badge
            )} text-white px-3 py-1.5 rounded-full text-xs font-semibold z-20 shadow-lg`}
          >
            {hotel.badge}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 z-20 border border-white/20">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{hotel.rating}</span>
            <span className="text-xs text-white/80">({hotel.reviewCount})</span>
          </div>

          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 z-20 shadow-md">
            <MapPin className="w-3 h-3" />
            <span className="font-medium">{hotel.location}</span>
          </div>
        </div>

        {/* Hotel Details */}
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {hotel.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>

          {/* Amenities */}
          <div className="flex items-center gap-3 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-gray-500"
              >
                {amenity === "Wifi" && <Wifi className="w-3.5 h-3.5" />}
                {amenity === "Parking" && <Car className="w-3.5 h-3.5" />}
                {amenity === "Restaurant" && <Coffee className="w-3.5 h-3.5" />}
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                {hotel.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600 font-medium">
                {hotel.currency}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {hotel.period}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between mb-5 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Bed className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{hotel.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Bath className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{hotel.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Square className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{hotel.area}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
              Book Now
            </button>
            <button className="p-3 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
              <Info className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            You may also like
          </h2>
          <p className="text-gray-600">
            Discover more amazing hotels in Algiers
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            disabled={currentSlide >= maxSlide}
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            width: `${(recommendedHotels.length / slidesToShow) * 100}%`,
          }}
        >
          {recommendedHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="flex-shrink-0"
              style={{ width: `${100 / recommendedHotels.length}%` }}
            >
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-200 ${
              currentSlide === index
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelRecommendationsCarousel;
