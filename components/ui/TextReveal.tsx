"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  children,
  className,
  delay = 0,
  tag: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".reveal-char");
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [delay]);

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag className={cn("flex flex-wrap", className)}>
        {children.split("").map((char, i) => (
          <span key={i} className="reveal-char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Tag>
    </div>
  );
}
