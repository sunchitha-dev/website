import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import PageTransition from "@/components/ui/PageTransition";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NOIR ROAST — Single-Origin Luxury Coffee",
  description:
    "Discover the world's finest single-origin coffees, roasted to perfection. Every bean tells a story of craft, origin, and uncompromising quality.",
  keywords: ["coffee", "single-origin", "luxury", "specialty", "roasted", "NOIR ROAST"],
  openGraph: {
    title: "NOIR ROAST — Single-Origin Luxury Coffee",
    description:
      "Discover the world's finest single-origin coffees, roasted to perfection.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-noir-900 text-cream font-body antialiased">
        <Navigation />
        <CustomCursor />
        <GrainOverlay />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
