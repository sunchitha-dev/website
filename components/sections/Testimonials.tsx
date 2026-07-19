"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const testimonials = [
  {
    name: "James Chen",
    role: "Coffee Director, The Ritz-Carlton",
    content:
      "Noir Roast has redefined what single-origin can be. The Yirgacheffe is otherworldly — every service starts with this bean.",
    rating: 5,
  },
  {
    name: "Sarah Blackwood",
    role: "Food & Wine Magazine",
    content:
      "If coffee is a ritual, Noir Roast is the temple. The attention to provenance and roast profile is unmatched in specialty coffee.",
    rating: 5,
  },
  {
    name: "Marco Bellini",
    role: "Head Barista, Dumbo House",
    content:
      "I've served thousands of cups. Noir Roast is the only origin that consistently makes guests close their eyes on the first sip.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 100 + i * 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
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
        <div className="text-center mb-20">
          <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-4">
            Praise
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-cream">
            What They Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-noir-800/50 border border-noir-700/50 p-8 hover:border-amber-gold/20 transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-amber-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-cream/60 leading-relaxed mb-8 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              <div>
                <p className="font-display text-cream text-lg">{t.name}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-cream/30 mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
