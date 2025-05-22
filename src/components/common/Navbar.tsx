// src/components/common/navbar.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Globe,
  ChevronDown,
  ListFilter,
  User,
  MoveUpRight,
  MessageCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const [country, setCountry] = useState<string>("ES");
  const [currency, setCurrency] = useState<string>("EUR");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const formattedCountries: Country[] = data.map((country: any) => ({
          code: country.cca2,
          name: country.name.common,
          flag: country.flags.png,
          currency: Object.keys(country.currencies || { USD: "" })[0] || "USD",
          symbol: country.currencies
            ? (Object.values(country.currencies)[0] as { symbol: string })
                .symbol
            : "$",
        }));

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    const selectedCountry = countries.find((c) => c.code === value);
    if (selectedCountry) {
      setCurrency(selectedCountry.currency);
    }
  };

  const currentCountry = countries.find((c) => c.code === country);
  const currentCurrency = countries.find((c) => c.currency === currency);

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotels" },
    { name: "House", href: "/house" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#E9F6FF] shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-8">
              <Image
                src="/images/logo.png"
                fill
                alt="logo"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-foreground hover:text-primary"
                } transition-colors duration-300`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className=" border-[#A5D3F1] rounded-full focus:ring-0 bg-transparent">
                <div className="flex items-center gap-2 border-[#535353] border-1 w-5 h-5 rounded-full justify-center">
                  <span className="">{currentCurrency?.symbol}</span>
                  {/* <ChevronDown className="h-4 w-4 opacity-50 ml-auto" /> */}
                </div>
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(countries.map((c) => c.currency))).map(
                  (curr) => {
                    const currency = countries.find((c) => c.currency === curr);
                    return (
                      <SelectItem key={curr} value={curr}>
                        <div className="flex items-center gap-2">
                          <span>{currency?.symbol}</span>
                          <span>{curr}</span>
                        </div>
                      </SelectItem>
                    );
                  }
                )}
              </SelectContent>
            </Select>
            {/* flag Selector */}
            <Select value={country} onValueChange={handleCountryChange}>
              <SelectTrigger className="border-[#A5D3F1] rounded-full  focus:ring-0 bg-transparent">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden">
                    {currentCountry?.flag && (
                      <Image
                        src={currentCountry.flag}
                        width={20}
                        height={20}
                        alt={`${currentCountry.name} flag`}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  {/* <ChevronDown className="h-4 w-4 opacity-50 ml-auto" /> */}
                </div>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={country.flag}
                          width={20}
                          height={20}
                          alt={`${country.name} flag`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* List Property */}

            <Link
              href="#"
              className="hidden border-[#A5D3F1] border-1 rounded-full md:flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 px-3 py-2"
            >
              <span>List your property</span>
              <MoveUpRight className="h-4 w-4 mr-1" />
            </Link>
            {/* message */}

            <div className="relative rounded-full bg-[#FFFFFF80] p-3 hover:text-accent transition-colors duration-300">
              {/* Message icon */}
              <div className="relative">
                <MessageCircle className="h-6 w-6 text-primary" />
                {/* Status dot */}
                <div className="absolute top-0 right-0">
                  <div className="w-2 h-2 rounded-full bg-[#FFAC47] border border-white"></div>
                </div>
              </div>
            </div>

            {/* User */}
            <Link
              href="#"
              className="hidden md:flex items-center bg-[#FFFFFF80] p-3 rounded-full text-primary hover:text-primary transition-colors duration-300"
            >
              <User className="h-5 w-5" />
              <span className="ml-1">Sunan</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-foreground"
                } hover:bg-muted`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2">
              <Link
                href="/list-property"
                className="flex items-center text-primary hover:text-accent"
              >
                <ListFilter className="h-4 w-4 mr-1" />
                List your property
              </Link>
              <Link
                href="/account"
                className="flex items-center text-foreground hover:text-primary"
              >
                <User className="h-5 w-5 mr-1" />
                Sunan
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
