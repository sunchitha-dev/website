"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollAnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const defaults: ScrollAnimationOptions = {
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      ...options,
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: defaults.trigger as gsap.DOMTarget,
        start: defaults.start,
        end: defaults.end,
        scrub: defaults.scrub,
        pin: defaults.pin,
        onEnter: defaults.onEnter,
        onLeave: defaults.onLeave,
        onEnterBack: defaults.onEnterBack,
        onLeaveBack: defaults.onLeaveBack,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
