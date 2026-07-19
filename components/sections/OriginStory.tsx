"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const steps = [
  {
    number: "01",
    title: "The Seed",
    description:
      "Every cup begins as a single seed, planted in volcanic soil at 1,800 meters in the highlands of Ethiopia.",
  },
  {
    number: "02",
    title: "The Harvest",
    description:
      "Hand-picked at peak ripeness by third-generation farmers who know every tree by name.",
  },
  {
    number: "03",
    title: "The Roast",
    description:
      "Slow-roasted in small batches, each bean coaxed to reveal its unique character over 14 minutes of precise heat.",
  },
  {
    number: "04",
    title: "The Cup",
    description:
      "The result is not just coffee — it is a moment of stillness, a ritual of quality over quantity.",
  },
];

export default function OriginStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        if (!step) return;

        gsap.fromTo(
          step,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-24">
          <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-4">
            The Journey
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-cream">
            From Seed to Cup
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line - centered */}
          <div className="absolute left-[31px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-gold/20 to-transparent" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="relative flex items-start gap-6 md:gap-0 mb-24 last:mb-0"
            >
              {/* Number - left side on all screens */}
              <div className="flex-shrink-0 w-[62px] md:w-1/2 md:pr-12 md:text-right">
                <span className="font-display text-5xl md:text-7xl text-amber-gold/10">
                  {step.number}
                </span>
              </div>

              {/* Dot - centered on the line */}
              <div className="absolute left-[31px] md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-amber-gold border-4 border-noir-900 z-10" />

              {/* Content - right side on all screens */}
              <div className="flex-1 pl-8 md:pl-12 md:w-1/2">
                <h3 className="font-display text-2xl md:text-3xl text-cream mb-3">
                  {step.title}
                </h3>
                <p className="text-cream/50 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
