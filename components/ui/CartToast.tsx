"use client";

import { useEffect, useState } from "react";

interface CartToastProps {
  message: string;
  visible: boolean;
  onDone: () => void;
}

export default function CartToast({ message, visible, onDone }: CartToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        setTimeout(onDone, 300);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [visible, onDone]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 px-6 py-3 bg-noir-800 border border-amber-gold/20 shadow-lg shadow-amber-gold/5">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-gold" />
        <span className="text-sm text-cream">{message}</span>
      </div>
    </div>
  );
}
