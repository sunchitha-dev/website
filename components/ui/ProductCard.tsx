"use client";

import { useRef, useCallback, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import CartToast from "@/components/ui/CartToast";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { addItem, isAdded } = useCart();
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ref.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image ?? "",
        variant: `${product.weight}g`,
      });
      setToastMsg(`${product.name} added to cart`);
      setToastVisible(true);
    },
    [addItem, product]
  );

  const added = isAdded(product.id, `${product.weight}g`);

  return (
    <>
      <Link href={`/shop/${product.slug}`}>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "group relative bg-noir-800 border border-noir-700/50 hover:border-amber-gold/30 transition-colors duration-500 overflow-hidden cursor-pointer",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="aspect-[4/5] bg-gradient-to-br from-noir-700 via-amber-gold/5 to-noir-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-[10px] tracking-[0.2em] text-amber-gold/60 uppercase">
                {product.origin}
              </div>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg text-cream group-hover:text-amber-gold transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs text-cream/40 mt-1 mb-3">
              {product.roastLevel} roast · {product.weight}g
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-amber-gold font-medium">${product.price}</span>
              <span className="text-[10px] tracking-[0.15em] text-cream/30 uppercase group-hover:text-amber-gold/60 transition-colors duration-300">
                View →
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-full py-2.5 text-[11px] tracking-[0.15em] uppercase border transition-all duration-300 cursor-pointer",
                added
                  ? "bg-amber-gold/10 border-amber-gold/30 text-amber-gold"
                  : "border-noir-600 text-cream/50 hover:border-amber-gold/30 hover:text-amber-gold"
              )}
            >
              {added ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </Link>
      <CartToast
        message={toastMsg}
        visible={toastVisible}
        onDone={() => setToastVisible(false)}
      />
    </>
  );
}
