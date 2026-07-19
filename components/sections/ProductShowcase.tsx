"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      gsap.fromTo(
        ".showcase-image",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <div className="showcase-content">
            <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-6">
              Featured Origin
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
              Ethiopian
              <br />
              Yirgacheffe
            </h2>
            <p className="text-cream/50 leading-relaxed mb-8 max-w-lg">
              Grown at 1,800 meters in the birthplace of coffee. Notes of
              jasmine, bergamot, and wild honey unfold in every sip. A
              single-origin experience that transcends the ordinary.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              {["Floral", "Citrus", "Honey", "Tea-like"].map((note) => (
                <span
                  key={note}
                  className="px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border border-amber-gold/20 text-amber-gold/70"
                >
                  {note}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-8">
              <span className="font-display text-3xl text-amber-gold">$42</span>
              <MagneticButton className="px-8 py-3 bg-amber-gold text-noir-900 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-light transition-colors duration-300">
                Add to Cart
              </MagneticButton>
            </div>
          </div>

          {/* Product visual */}
          <div className="showcase-image relative">
            <div className="aspect-square bg-gradient-to-br from-noir-800 to-noir-900 border border-noir-700/50 flex items-center justify-center relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-amber-gold/8 blur-3xl" />
              </div>
              {/* Placeholder content */}
              <div className="relative text-center">
                <div className="w-32 h-40 mx-auto bg-gradient-to-b from-noir-700 to-noir-800 border border-noir-600/50 mb-6 flex items-center justify-center">
                  <span className="font-display text-4xl text-amber-gold/20">NR</span>
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-cream/20">
                  250g Bag
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
