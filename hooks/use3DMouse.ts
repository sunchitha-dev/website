"use client";

import { useState, useEffect, useRef } from "react";

export function use3DMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let raf: number;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;
      setMouse({ x: current.current.x, y: current.current.y });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return mouse;
}
