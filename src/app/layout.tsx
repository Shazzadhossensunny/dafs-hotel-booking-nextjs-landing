import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "DAYF Bookings | Hotel and Property Booking",
  description: "Find and book hotels, resorts, and properties worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(dmSans.variable, "font-dm-sans")}
    >
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
