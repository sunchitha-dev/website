"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  }, []);

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn("inline-flex items-center justify-center cursor-pointer", className)}
    >
      {children}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
