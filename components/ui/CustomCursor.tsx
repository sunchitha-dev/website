"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    pos.current.x += (target.current.x - pos.current.x) * 0.15;
    pos.current.y += (target.current.y - pos.current.y) * 0.15;

    if (outerRef.current) {
      outerRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
    }
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none)");
    if (mq.matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [animate]);

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-amber-gold/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-gold pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
