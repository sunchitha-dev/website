"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import OriginStory from "@/components/sections/OriginStory";
import ProcessSection from "@/components/sections/ProcessSection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import Marquee from "@/components/ui/Marquee";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useSmoothScroll();
  return <>{children}</>;
};

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Marquee ticker */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-noir-900/80 backdrop-blur-sm border-b border-noir-700/30 overflow-hidden py-2">
        <Marquee speed={40}>
          <div className="flex items-center gap-8 px-4">
            {[
              "Single Origin",
              "Small Batch",
              "Hand Roasted",
              "Direct Trade",
              "Freshly Roasted",
              "Sustainably Sourced",
              "Award Winning",
              "Noir Roast",
            ].map((text) => (
              <span
                key={text}
                className="text-[10px] tracking-[0.3em] uppercase text-cream/20 whitespace-nowrap flex items-center gap-3"
              >
                {text}
                <span className="w-1 h-1 rounded-full bg-amber-gold/30" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <HeroSection />
      
      {/* Consistent section spacing */}
      <div className="h-20 md:h-32" />
      <OriginStory />
      
      <div className="h-20 md:h-32" />
      <ProcessSection />
      
      <div className="h-20 md:h-32" />
      <ProductShowcase />
      
      <div className="h-20 md:h-32" />
      <Testimonials />
      
      <div className="h-20 md:h-32" />
      <Newsletter />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-noir-700/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="font-display text-xl tracking-[0.2em] text-cream/60">
            NOIR ROAST
          </div>
          <div className="flex items-center gap-8">
            {["Instagram", "Twitter", "Journal"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] tracking-[0.2em] uppercase text-cream/30 hover:text-amber-gold transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-cream/20 tracking-wider">
            &copy; 2026 Noir Roast. All rights reserved.
          </p>
        </div>
      </footer>
    </SmoothScrollProvider>
  );
}
