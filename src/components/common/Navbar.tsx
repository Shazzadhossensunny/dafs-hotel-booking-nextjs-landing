// src/components/common/navbar.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, ListFilter, User } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const pathname = usePathname();
  const [language, setLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotels" },
    { name: "House", href: "/house" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#E9F6FF] shadow-sm z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-8">
              <div className="flex items-center">
                <Image src="/public/images/logo.png" fill alt="logo" />
              </div>
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

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="hidden md:block">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-fit border-none focus:ring-0 bg-transparent text-foreground">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="mx-1">{currentLanguage?.flag}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* List Property */}
            <Link
              href="/list-property"
              className="hidden md:flex items-center text-primary hover:text-accent transition-colors duration-300"
            >
              <ListFilter className="h-4 w-4 mr-1" />
              <span>List your property</span>
            </Link>

            {/* User */}
            <Link
              href="/account"
              className="hidden md:flex items-center text-foreground hover:text-primary transition-colors duration-300"
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
                aria-hidden="true"
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container">
            <div className="pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-primary font-medium"
                      : "text-foreground"
                  } block px-3 py-2 rounded-md text-base font-medium hover:bg-muted`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/list-property"
                    className="flex items-center text-primary hover:text-accent"
                  >
                    <ListFilter className="h-4 w-4 mr-1" />
                    <span>List your property</span>
                  </Link>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-foreground" />
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-fit border-none focus:ring-0 p-0 bg-transparent text-foreground">
                        <div className="flex items-center">
                          <span className="mx-1">{currentLanguage?.flag}</span>
                          <span className="mx-1">{currentLanguage?.name}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <div className="flex items-center">
                              <span className="mr-2">{lang.flag}</span>
                              <span>{lang.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
