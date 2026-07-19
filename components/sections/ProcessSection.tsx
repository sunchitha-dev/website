"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const stages = [
  {
    name: "Green",
    temp: "20°C",
    time: "0:00",
    color: "from-green-900/40 to-noir-900",
    description: "Raw, unroasted beans — pale green with grassy notes.",
  },
  {
    name: "Yellow",
    temp: "150°C",
    time: "4:00",
    color: "from-amber-dark/30 to-noir-900",
    description: "The beans yellow as moisture begins to evaporate.",
  },
  {
    name: "City",
    temp: "195°C",
    time: "8:00",
    color: "from-amber-gold/30 to-noir-900",
    description: "First crack — the beans expand and develop sweetness.",
  },
  {
    name: "Full City",
    temp: "215°C",
    time: "11:00",
    color: "from-amber-gold/50 to-noir-900",
    description: "Deep caramelization — bittersweet chocolate notes emerge.",
  },
  {
    name: "Vienna",
    temp: "225°C",
    time: "13:30",
    color: "from-amber-dark/60 to-noir-900",
    description: "Oily surface — bold, smoky, and intensely aromatic.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stagesRef.current.forEach((stage, i) => {
        if (!stage) return;

        gsap.fromTo(
          stage,
          { opacity: 0.3, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: stage,
              start: "top 70%",
              end: "top 30%",
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
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-4">
            The Craft
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-cream">
            Five Stages of Perfection
          </h2>
        </div>

        <div className="grid gap-8 md:gap-10">
          {stages.map((stage, i) => (
            <div
              key={stage.name}
              ref={(el) => { stagesRef.current[i] = el; }}
              className={`relative bg-gradient-to-r ${stage.color} border border-noir-700/50 p-10 md:p-14 transition-all duration-500 hover:border-amber-gold/20`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[11px] tracking-[0.3em] uppercase text-amber-gold/40 font-mono">
                      Stage {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-amber-gold/10" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-cream mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-cream/40 max-w-lg">{stage.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-2xl text-amber-gold">
                    {stage.temp}
                  </span>
                  <span className="text-[11px] tracking-[0.2em] text-cream/30 uppercase">
                    {stage.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
