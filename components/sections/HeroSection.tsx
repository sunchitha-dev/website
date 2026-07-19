"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });
const CoffeeBean = dynamic(() => import("@/components/canvas/CoffeeBean"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Bean fades in — always centered, no positional offset
      tl.fromTo(
        ".hero-bean",
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // Headline reveals
      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out" },
        "-=0.8"
      );

      // Subtitle fades in
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      // Scroll indicator pulse
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-noir-900/50 to-transparent pointer-events-none" />

      {/* 3D Canvas — absolutely centered, full viewport */}
      <div
        className="hero-bean absolute opacity-0"
        style={{ top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <Scene className="absolute inset-0">
          <CoffeeBean position={[0, 0, 0]} scale={1.2} />
        </Scene>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1
          ref={headlineRef}
          className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] text-cream mb-6 opacity-0"
        >
          NOIR ROAST
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-lg md:text-xl text-cream/60 tracking-[0.3em] uppercase mb-12 opacity-0"
        >
          Single-Origin Luxury Coffee
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-cream/40">
          Scroll to Explore
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-amber-gold/60 to-transparent" />
      </div>
    </section>
  );
}
