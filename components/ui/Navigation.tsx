"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Origin", href: "/origin" },
  { label: "Process", href: "/process" },
  { label: "Shop", href: "/shop" },
];

function CartBadge() {
  const count = useCartStore((s) => s.totalItems());
  const prevCount = useRef(count);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (count !== prevCount.current && count > 0) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 400);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center w-10 h-10 text-cream/60 hover:text-amber-gold transition-colors duration-300"
      aria-label="Cart"
    >
      <ShoppingBag size={22} />
      {count > 0 && (
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 w-[18px] h-[18px] flex items-center justify-center rounded-full bg-amber-gold text-noir-900 text-[11px] font-medium leading-none",
            bounce && "animate-bounce"
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-noir-900/80 backdrop-blur-xl border-b border-amber-gold/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-[0.2em] text-cream">
          NOIR ROAST
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.15em] uppercase text-cream/60 hover:text-amber-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <CartBadge />
          <Link
            href="/shop"
            className="ml-2 px-6 py-2.5 bg-amber-gold text-noir-900 text-sm font-medium tracking-wider hover:bg-amber-light transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <CartBadge />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-cream"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-noir-900/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-2xl tracking-[0.15em] uppercase text-cream/80 hover:text-amber-gold transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/cart"
          onClick={() => setMobileOpen(false)}
          className="text-2xl tracking-[0.15em] uppercase text-cream/80 hover:text-amber-gold transition-colors duration-300"
        >
          Cart
        </Link>
      </div>
    </nav>
  );
}
