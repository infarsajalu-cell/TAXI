import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starego | Premium Taxi Service in Wayanad & Kerala",
  description: "Book the best taxi service in Wayanad with Starego. Premium Kerala taxi agency offering sightseeing tours, airport transfers, and 24/7 travel support in Sulthan Bathery.",
  keywords: ["Wayanad Taxi", "Kerala Taxi Service", "Premium Taxi Wayanad", "Sulthan Bathery Taxi", "Calicut Airport to Wayanad Taxi", "Starego Travels", "Best Taxi in Kerala"],
  openGraph: {
    title: "Starego | Premium Taxi Service in Wayanad",
    description: "Reliable, comfortable, and professional taxi services across Wayanad and Kerala.",
    url: "https://starego.in", // Adjust if actual domain is different
    siteName: "Starego Travels",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starego | Wayanad Taxi Service",
    description: "Experience the ultimate comfort and safety with Starego's premium taxi service.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Starego Premium Travel Agency",
  "description": "Leading premium taxi service in Wayanad providing sightseeing tours, airport transfers, and Kerala tour packages.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Starego Travels",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sulthan Bathery",
      "addressRegion": "Wayanad, Kerala",
      "addressCountry": "IN"
    },
    "telephone": "+91 95448 19365"
  },
  "areaServed": ["Wayanad", "Kerala", "Calicut", "Mysore"],
  "url": "https://starego.in"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
