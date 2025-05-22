import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#00548C] text-white rounded-bl-4xl rounded-br-4xl border-t mt-12">
      <div className="container">
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="relative w-32 h-8">
                  <div className="flex items-center">
                    <Image src="/images/logo-fotter.png" fill alt="logo" />
                  </div>
                </div>
              </Link>
              <p className="text-dayf-text mb-4">
                Find and book the best hotels, resorts, and properties around
                the world.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-dayf-text hover:text-dayf-primary"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-dayf-text hover:text-dayf-primary"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-dayf-text hover:text-dayf-primary"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-dayf-text hover:text-dayf-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-dayf-heading mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hotels"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-dayf-heading mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/hotels"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    Hotel Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/houses"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    House Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/list-property"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    List Your Property
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customer-support"
                    className="text-dayf-text hover:text-dayf-primary"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-dayf-heading mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-dayf-primary mr-2 mt-0.5" />
                  <span className="text-dayf-text">
                    123 Booking Street, City Name, Country
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-dayf-primary mr-2" />
                  <span className="text-dayf-text">+1 234 567 890</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-dayf-primary mr-2" />
                  <span className="text-dayf-text">info@dayfbookings.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dayf-text text-sm">
              &copy; {new Date().getFullYear()} DAYF Bookings. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-dayf-text hover:text-dayf-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-dayf-text hover:text-dayf-primary"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-dayf-text hover:text-dayf-primary"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
