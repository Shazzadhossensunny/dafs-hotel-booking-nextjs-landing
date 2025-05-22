"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: 1,
    title: "Breathtaking Views and Luxury Comfort!",
    content:
      "The Executive Suite exceeded all my expectations! The panoramic views of the Mediterranean Sea were stunning. Everything was top-notch. Perfect for both work and relaxation!",
    author: "Sofia B., France",
    rating: 5,
    date: "23.10.2024",
  },
  {
    id: 2,
    title: "Exceptional Stay with Excellent Amenities",
    content:
      "The Executive Suite provided an exceptional experience. The room was spotless. Location perfect for exploring the city, and the staff was amazing.",
    author: "Youssef R., Morocco",
    rating: 5,
    date: "20.10.2024",
  },
  {
    id: 3,
    title: "Tranquility in the Heart of the City",
    content:
      "A peaceful escape in the middle of the bustling city. Loved the rooftop view and daily breakfast. Would definitely come back.",
    author: "Linda M., Germany",
    rating: 4,
    date: "12.09.2024",
  },
  {
    id: 4,
    title: "Excellent Family-Friendly Hotel",
    content:
      "Great service and very kid-friendly. My children loved the play area. Clean rooms and delicious food made our stay memorable.",
    author: "Raj K., India",
    rating: 5,
    date: "04.09.2024",
  },
  {
    id: 5,
    title: "Modern Design Meets Warm Hospitality",
    content:
      "A truly stylish hotel with warm, welcoming staff. The spa experience was world-class. I felt pampered every second.",
    author: "Emma T., Australia",
    rating: 5,
    date: "22.08.2024",
  },
];

const renderStars = (rating: number) =>
  Array(5)
    .fill(0)
    .map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )}
      />
    ));

const HotelReviewSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="mt-10">
      {/* Header and Navigation */}
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-heading">
          What Our Guests Say
        </h2>
        <div className="flex items-center justify-between mt-10 px-14">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2"
            >
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="bg-blue-100 hover:bg-blue-200 rounded-full p-2"
            >
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </button>
          </div>
          {/* Link to see all */}
          <div className="flex justify-end mt-3 border-b border-primary">
            <a href="#" className="text-blue-500 flex items-center">
              See All.. <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[300px] md:min-w-[400px] lg:min-w-[460px] bg-white rounded-lg border p-5 shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-2">{`“${review.title}”`}</h3>
              <p className="text-sm text-gray-700 mb-2">"{review.content}"</p>
              <div className="flex mb-2">{renderStars(review.rating)}</div>
              <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span>— {review.author}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelReviewSlider;
