"use client";

import { useState, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import type { CartItem } from "@/store/cartStore";
import QuantityStepper from "./QuantityStepper";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string, variant?: string) => void;
  onUpdateQuantity: (id: string, qty: number, variant?: string) => void;
}

export default function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [removing, setRemoving] = useState(false);

  const handleRemove = useCallback(() => {
    if (!cardRef.current) {
      onRemove(item.id, item.variant);
      return;
    }
    setRemoving(true);
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -20,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => onRemove(item.id, item.variant),
    });
  }, [item.id, item.variant, onRemove]);

  const handleQtyChange = useCallback(
    (qty: number) => {
      onUpdateQuantity(item.id, qty, item.variant);
    },
    [item.id, item.variant, onUpdateQuantity]
  );

  return (
    <div
      ref={cardRef}
      className={`flex items-center gap-5 py-5 border-b border-noir-700/50 transition-opacity ${
        removing ? "pointer-events-none" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-noir-700 via-amber-gold/5 to-noir-800 border border-noir-700/50 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-amber-gold/10" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] text-cream truncate">{item.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {item.variant && (
            <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border border-amber-gold/20 text-amber-gold/60">
              {item.variant}
            </span>
          )}
          <span className="text-xs text-cream/30">${item.price} each</span>
        </div>
      </div>

      {/* Quantity + Price */}
      <div className="flex items-center gap-6">
        <QuantityStepper value={item.quantity} onChange={handleQtyChange} />
        <div className="text-right min-w-[70px]">
          <span className="text-amber-gold font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleRemove}
          className="text-xs text-cream/30 hover:text-cream underline underline-offset-2 transition-colors duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
