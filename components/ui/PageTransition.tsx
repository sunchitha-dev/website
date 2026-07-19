"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) {
      setDisplayChildren(children);
      return;
    }

    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      y: -30, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power2.inOut",
      onComplete: () => { setDisplayChildren(children); prevPathname.current = pathname; },
    });
    tl.fromTo(containerRef.current,
      { y: 30, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
    );

    return () => { tl.kill(); };
  }, [pathname, children]);

  return <div ref={containerRef}>{displayChildren}</div>;
}
