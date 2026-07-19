"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Sourcing",
    subtitle: "Direct from Origin",
    description:
      "We travel to each origin, cup hundreds of lots, and select only the top 2% of production. Every relationship is built on transparency and mutual respect.",
    details: [
      "Farm visits & cupping sessions",
      "Direct trade partnerships",
      "Quality scoring & selection",
      "Seasonal harvest planning",
    ],
  },
  {
    number: "02",
    title: "Roasting",
    subtitle: "Small-Batch Precision",
    description:
      "Our vintage Probat roaster gives us unparalleled control. Each profile is developed over weeks of cupping, calibrated to the specific lot's characteristics.",
    details: [
      "14-minute slow roast profiles",
      "Sample roasting & profiling",
      "Real-time temperature logging",
      "First crack monitoring",
    ],
  },
  {
    number: "03",
    title: "Resting",
    subtitle: "Patience is Everything",
    description:
      "Freshly roasted beans need time to degas. We rest each batch for 7-14 days, allowing CO₂ to escape and flavors to stabilize before packaging.",
    details: [
      "Degassing rest periods",
      "Aroma development monitoring",
      "Optimal freshness windows",
      "Batch dating & tracking",
    ],
  },
  {
    number: "04",
    title: "Packaging",
    subtitle: "Sealed for Freshness",
    description:
      "Every bag is flushed with nitrogen and sealed with a one-way valve to preserve peak flavor. Shipped within 48 hours of packaging.",
    details: [
      "Nitrogen-flushed packaging",
      "One-way valve technology",
      "Light-blocking materials",
      "48-hour shipping guarantee",
    ],
  },
  {
    number: "05",
    title: "Brewing",
    subtitle: "The Perfect Cup",
    description:
      "Every bag comes with our recommended brew guide. Because the best beans deserve the best preparation — and we want you to experience every note.",
    details: [
      "Custom brew guides included",
      "Water temperature guidelines",
      "Grind size recommendations",
      "Extraction time targets",
    ],
  },
];

export default function ProcessPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      steps.forEach((_, i) => {
        gsap.fromTo(
          `.process-step-${i}`,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.process-step-${i}`,
              start: "top 80%",
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-4">
            The Craft
          </span>
          <TextReveal
            tag="h1"
            className="font-display text-5xl md:text-7xl text-cream mb-6"
          >
            Our Process
          </TextReveal>
          <p className="text-cream/40 max-w-lg mx-auto">
            From seed to cup, every step is guided by an uncompromising
            commitment to quality. This is how we ensure every cup of Noir Roast
            is extraordinary.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`process-step-${i} grid md:grid-cols-[120px_1fr] gap-8 md:gap-16 py-16 border-b border-noir-700/30 last:border-b-0`}
            >
              {/* Number */}
              <div className="flex items-start">
                <span className="font-display text-5xl text-amber-gold/15">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-display text-3xl text-cream">
                    {step.title}
                  </h2>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-amber-gold/40 border border-amber-gold/15 px-3 py-1">
                    {step.subtitle}
                  </span>
                </div>

                <p className="text-cream/50 leading-relaxed mb-6 max-w-2xl">
                  {step.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-amber-gold/40" />
                      <span className="text-[11px] text-cream/35">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border border-noir-700/30 p-8">
          {[
            { value: "14", label: "Minutes per roast" },
            { value: "7-14", label: "Days rest period" },
            { value: "48hr", label: "Ship after packaging" },
            { value: "2%", label: "Of lots selected" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-amber-gold mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-cream/30">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
