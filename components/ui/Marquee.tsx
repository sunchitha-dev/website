"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ children, className, speed = 30, reverse = false }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
