"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ProductCard from "@/components/ui/ProductCard";
import TextReveal from "@/components/ui/TextReveal";
import type { Product } from "@/types";

const products: Product[] = [
  {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    slug: "ethiopian-yirgacheffe",
    origin: "Ethiopia",
    region: "Yirgacheffe",
    altitude: "1,800m",
    process: "Washed",
    roastLevel: "light",
    flavorNotes: ["Jasmine", "Bergamot", "Honey"],
    price: 42,
    weight: 250,
    description: "Bright and floral with notes of jasmine, bergamot, and wild honey. Grown at 1,800 meters in the birthplace of coffee.",
  },
  {
    id: "2",
    name: "Kenyan AA",
    slug: "kenyan-aa",
    origin: "Kenya",
    region: "Nyeri",
    altitude: "1,700m",
    process: "Washed",
    roastLevel: "light",
    flavorNotes: ["Blackcurrant", "Grapefruit", "Brown Sugar"],
    price: 46,
    weight: 250,
    description: "Vibrant and complex with blackcurrant acidity, grapefruit brightness, and a sweet brown sugar finish.",
  },
  {
    id: "3",
    name: "Colombian Huila",
    slug: "colombian-huila",
    origin: "Colombia",
    region: "Huila",
    altitude: "1,650m",
    process: "Honey",
    roastLevel: "medium",
    flavorNotes: ["Caramel", "Red Apple", "Chocolate"],
    price: 38,
    weight: 250,
    description: "Silky and balanced with rich caramel sweetness, red apple acidity, and dark chocolate undertones.",
  },
  {
    id: "4",
    name: "Guatemalan Antigua",
    slug: "guatemalan-antigua",
    origin: "Guatemala",
    region: "Antigua",
    altitude: "1,500m",
    process: "Fully Washed",
    roastLevel: "medium",
    flavorNotes: ["Dark Chocolate", "Spice", "Smoke"],
    price: 40,
    weight: 250,
    description: "Bold and smoky with dark chocolate depth, warm spice notes, and a lingering smoky finish.",
  },
  {
    id: "5",
    name: "Sumatran Mandheling",
    slug: "sumatran-mandheling",
    origin: "Indonesia",
    region: "Sumatra",
    altitude: "1,200m",
    process: "Wet-Hulled",
    roastLevel: "dark",
    flavorNotes: ["Earth", "Cedar", "Dark Cocoa"],
    price: 36,
    weight: 250,
    description: "Deep and earthy with cedar aromatics, dark cocoa richness, and a full-bodied mouthfeel.",
  },
  {
    id: "6",
    name: "Costa Rican Tarrazú",
    slug: "costa-rican-tarrazu",
    origin: "Costa Rica",
    region: "Tarrazú",
    altitude: "1,400m",
    process: "Honey",
    roastLevel: "medium",
    flavorNotes: ["Peach", "Almond", "Milk Chocolate"],
    price: 44,
    weight: 250,
    description: "Elegant and smooth with ripe peach sweetness, almond nuttiness, and creamy milk chocolate.",
  },
];

export default function ShopPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-4">
            The Collection
          </span>
          <TextReveal
            tag="h1"
            className="font-display text-5xl md:text-7xl text-cream mb-6"
          >
            Shop Our Origins
          </TextReveal>
          <p className="text-cream/40 max-w-lg mx-auto">
            Each bean is sourced directly from farmers who share our obsession
            with quality. Roasted in small batches and shipped within 48 hours.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["All", "Light", "Medium", "Dark"].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 text-[11px] tracking-[0.2em] uppercase border border-noir-700 text-cream/40 hover:border-amber-gold/30 hover:text-amber-gold transition-all duration-300"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
