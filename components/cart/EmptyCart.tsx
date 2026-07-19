"use client";

import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      {/* Bean silhouette */}
      <div className="w-12 h-12 mb-8 opacity-30">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="24" cy="24" rx="16" ry="20" stroke="#D4A574" strokeWidth="1.5" />
          <path d="M24 4C24 4 20 18 20 24C20 30 24 44 24 44" stroke="#D4A574" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      <h2 className="font-display text-2xl text-cream mb-3">Your cart is empty</h2>
      <p className="text-sm text-cream/40 mb-8">
        Discover our collection of single-origin coffees.
      </p>

      <Link
        href="/shop"
        className="inline-flex items-center justify-center px-8 py-3 bg-amber-gold text-noir-900 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-light transition-colors duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
