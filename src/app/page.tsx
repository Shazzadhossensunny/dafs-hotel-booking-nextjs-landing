import HotelAvailability from "@/components/hotel/Hotel-avaiability";
import HotelFeatures from "@/components/hotel/Hotel-features";
import HotelGallery from "@/components/hotel/Hotel-gallery";
import HotelHeader from "@/components/hotel/Hotel-header";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function HotelHomePage({ params }: any) {
  const hotelData = {
    id: "el-aurassi",
    name: "El Aurassi Hotel",
    description:
      "Spacious, modern rooms with panoramic views of the Mediterranean Sea.",
    images: [
      "/images/gallery1.png",
      "/images/gallery2.png",
      "/images/gallery3.png",
      "/images/gallery4.png",
      "/images/gallery5.png",
      "/images/gallery6.png",
      "/images/gallery7.png",
      "/images/gallery8.png",
      "/images/gallery9.png",
    ],
    price: 6112,
    currency: "USD",
    type: "Resort",
    size: "12000 sqft",
    features: [
      { name: "WiFi", icon: "wifi" },
      { name: "Dining", icon: "utensils" },
      { name: "Swimming Pool", icon: "swimming-pool" },
      { name: "Air Conditioning", icon: "snowflake" },
      { name: "Gym", icon: "dumbbell" },
    ],
    location: {
      address: "Mediterranean Coast, Algeria",
      coordinates: { lat: 36.7528, lng: 3.0422 },
    },
    reviews: {
      average: 4.7,
      count: 203,
    },
  };
  return (
    <div className="pt-4 pb-12">
      <div className="container">
        <div>
          <div className="lg:col-span-3 space-y-8">
            {/* Hotel Header */}
            <HotelHeader hotel={hotelData} />

            {/* Hotel Gallery */}
            <div className="w-full">
              <HotelGallery images={hotelData.images} />
            </div>

            <div className="space-y-8">
              {/* features */}
              <HotelFeatures hotel={hotelData} />

              {/* hotel availability*/}
              <HotelAvailability />
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 transition-all">
              {/* <BookCard /> */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-dayf-primary">
                    ${hotelData.price}
                  </span>
                  <span className="text-dayf-text">per night</span>
                </div>
                <Button className="w-full bg-dayf-primary hover:bg-dayf-highlight">
                  Reserve Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
