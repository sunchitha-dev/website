"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const origins = [
  {
    country: "Ethiopia",
    region: "Yirgacheffe",
    altitude: "1,800m",
    story:
      "The birthplace of coffee. In the misty highlands, wild coffee trees still grow among ancient forests. Our partnerships with local cooperatives ensure every bean is hand-picked at peak ripeness.",
    notes: "Jasmine, Bergamot, Honey",
  },
  {
    country: "Kenya",
    region: "Nyeri County",
    altitude: "1,700m",
    story:
      "Volcanic soil and equatorial sun create the perfect conditions for Kenya's legendary bright, fruity coffees. Each lot is double-sorted and processed with meticulous care.",
    notes: "Blackcurrant, Grapefruit, Brown Sugar",
  },
  {
    country: "Colombia",
    region: "Huila",
    altitude: "1,650m",
    story:
      "In the shadow of the Andes, third-generation farmers tend their plots with a devotion that borders on reverence. The result is coffee of extraordinary sweetness and balance.",
    notes: "Caramel, Red Apple, Chocolate",
  },
  {
    country: "Guatemala",
    region: "Antigua Valley",
    altitude: "1,500m",
    story:
      "Sheltered by three volcanoes, Antigua's unique microclimate produces coffees of remarkable depth. Rich volcanic soil, cool nights, and warm days create ideal growing conditions.",
    notes: "Dark Chocolate, Spice, Smoke",
  },
];

export default function OriginPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".origin-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".origins-grid",
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-4">
            Our Origins
          </span>
          <TextReveal
            tag="h1"
            className="font-display text-5xl md:text-7xl text-cream mb-6"
          >
            The Birthplace of Coffee
          </TextReveal>
          <p className="text-cream/40 max-w-lg mx-auto">
            We travel to the world&apos;s most celebrated coffee-growing
            regions, building direct relationships with the farmers who share
            our obsession with quality.
          </p>
        </div>

        {/* Origins Grid */}
        <div className="origins-grid grid md:grid-cols-2 gap-8">
          {origins.map((origin, i) => (
            <div
              key={origin.country}
              className="origin-card group bg-noir-800/50 border border-noir-700/50 overflow-hidden hover:border-amber-gold/20 transition-all duration-500"
            >
              {/* Visual area */}
              <div className="aspect-[16/9] bg-gradient-to-br from-noir-700 to-noir-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-display text-4xl text-amber-gold/15 group-hover:text-amber-gold/25 transition-colors duration-500">
                      {origin.country}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-noir-800 to-transparent" />
                {/* Index */}
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] text-amber-gold/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-2xl text-cream">
                    {origin.country}
                  </h3>
                  <span className="text-cream/20">·</span>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-cream/40">
                    {origin.region}
                  </span>
                </div>

                <p className="text-cream/50 text-sm leading-relaxed mb-6">
                  {origin.story}
                </p>

                <div className="flex items-center justify-between border-t border-noir-700/50 pt-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-amber-gold/30 block">
                        Altitude
                      </span>
                      <span className="text-cream text-sm">{origin.altitude}</span>
                    </div>
                    <div className="w-px h-6 bg-noir-700/50" />
                    <div>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-amber-gold/30 block">
                        Tasting Notes
                      </span>
                      <span className="text-cream text-sm">{origin.notes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
