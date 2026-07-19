"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface OrderSummaryProps {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  }, []);

  return (
    <div className="bg-noir-800 border border-noir-700/50 p-8">
      <h3 className="font-display text-lg text-cream mb-6">Order Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-cream/50">Subtotal</span>
          <span className="text-cream">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-cream/50">Shipping</span>
          <span className="text-cream">
            {shipping === 0 ? (
              <span className="text-amber-gold">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-cream/50">Tax</span>
          <span className="text-cream">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-noir-600 pt-4 mb-6">
        <div className="flex justify-between">
          <span className="text-cream text-lg">Total</span>
          <span className="text-amber-gold font-semibold text-xl">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full"
      >
        <button className="w-full h-12 bg-amber-gold text-noir-900 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-light transition-colors duration-300 cursor-pointer">
          Proceed to Checkout
        </button>
      </div>

      {shipping > 0 && (
        <p className="text-center text-[10px] text-cream/30 mt-3">
          Add ${(50 - subtotal).toFixed(2)} more for free shipping
        </p>
      )}
    </div>
  );
}
