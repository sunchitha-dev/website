"use client";

import { useParams } from "next/navigation";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";
import CartToast from "@/components/ui/CartToast";
import { useCart } from "@/hooks/useCart";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });
const CoffeeBean = dynamic(() => import("@/components/canvas/CoffeeBean"), { ssr: false });

const products: Record<string, {
  name: string;
  origin: string;
  region: string;
  altitude: string;
  process: string;
  roastLevel: string;
  flavorNotes: string[];
  price: number;
  weight: number;
  fullDescription: string;
}> = {
  "ethiopian-yirgacheffe": {
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    region: "Yirgacheffe",
    altitude: "1,800m",
    process: "Washed",
    roastLevel: "Light",
    flavorNotes: ["Jasmine", "Bergamot", "Honey"],
    price: 42,
    weight: 250,
    fullDescription:
      "Grown at 1,800 meters in the birthplace of coffee, this Yirgacheffe is a masterclass in complexity. The washed process preserves the delicate floral aromatics while the altitude develops a bright, clean acidity. Every sip reveals new layers — jasmine on the nose, bergamot citrus on the palate, and a lingering honey sweetness that keeps you coming back.",
  },
  "kenyan-aa": {
    name: "Kenyan AA",
    origin: "Kenya",
    region: "Nyeri County",
    altitude: "1,700m",
    process: "Washed",
    roastLevel: "Light",
    flavorNotes: ["Blackcurrant", "Grapefruit", "Brown Sugar"],
    price: 46,
    weight: 250,
    fullDescription:
      "From the volcanic slopes of Nyeri County, this Kenyan AA exemplifies why Kenya produces some of the world's most sought-after coffees. The AA grading ensures only the largest, densest beans make the cut. Expect a wine-like acidity, pronounced blackcurrant notes, and a grapefruit brightness that softens into brown sugar sweetness.",
  },
  "colombian-huila": {
    name: "Colombian Huila",
    origin: "Colombia",
    region: "Huila",
    altitude: "1,650m",
    process: "Honey",
    roastLevel: "Medium",
    flavorNotes: ["Caramel", "Red Apple", "Chocolate"],
    price: 38,
    weight: 250,
    fullDescription:
      "The honey process gives this Colombian Huila a distinctive sweetness and silky body. Grown by third-generation farmers in the Huila department, it delivers caramel richness, bright red apple acidity, and a dark chocolate undertone that deepens as the cup cools. A crowd-pleaser with surprising depth.",
  },
  "guatemalan-antigua": {
    name: "Guatemalan Antigua",
    origin: "Guatemala",
    region: "Antigua Valley",
    altitude: "1,500m",
    process: "Fully Washed",
    roastLevel: "Medium",
    flavorNotes: ["Dark Chocolate", "Spice", "Smoke"],
    price: 40,
    weight: 250,
    fullDescription:
      "Sheltered by three volcanoes — Agua, Fuego, and Acatenango — Antigua's unique microclimate produces coffees of remarkable intensity. This fully washed lot delivers dark chocolate richness, warm spice complexity, and a subtle smoky finish that evokes the volcanic terroir. Full-bodied and deeply satisfying.",
  },
  "sumatran-mandheling": {
    name: "Sumatran Mandheling",
    origin: "Indonesia",
    region: "Sumatra",
    altitude: "1,200m",
    process: "Wet-Hulled",
    roastLevel: "Dark",
    flavorNotes: ["Earth", "Cedar", "Dark Cocoa"],
    price: 36,
    weight: 250,
    fullDescription:
      "The traditional wet-hulled process gives this Sumatran its signature earthy character. Grown in the Mandheling highlands at 1,200 meters, it delivers cedar aromatics, dark cocoa richness, and a full-bodied mouthfeel that coats the palate. For those who prefer their coffee bold, complex, and unapologetically distinctive.",
  },
  "costa-rican-tarrazu": {
    name: "Costa Rican Tarrazú",
    origin: "Costa Rica",
    region: "Tarrazú",
    altitude: "1,400m",
    process: "Honey",
    roastLevel: "Medium",
    flavorNotes: ["Peach", "Almond", "Milk Chocolate"],
    price: 44,
    weight: 250,
    fullDescription:
      "From the high altitude slopes of Tarrazú, this honey-processed Costa Rican is elegance in a cup. Ripe peach sweetness leads, followed by almond nuttiness and a creamy milk chocolate finish. The medium roast preserves the delicate fruit notes while developing a smooth, approachable body. Perfect for pour-over.",
  },
};

export default function ProductDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = useParams();
  const slug = (resolvedParams?.slug as string) || "ethiopian-yirgacheffe";
  const pageRef = useRef<HTMLDivElement>(null);
  const { addItem, isAdded } = useCart();
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const product = products[slug] || products["ethiopian-yirgacheffe"];
  const added = isAdded(slug, `${product.weight}g`);

  const handleAddToCart = useCallback(() => {
    addItem({
      id: slug,
      name: product.name,
      price: product.price,
      image: "",
      variant: `${product.weight}g`,
    });
    setToastMsg(`${product.name} added to cart`);
    setToastVisible(true);
  }, [addItem, slug, product]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-detail",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [slug]);

  return (
    <div ref={pageRef} className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="product-detail grid md:grid-cols-2 gap-16 items-start">
          {/* 3D Product Visual */}
          <div className="sticky top-28">
            <div className="aspect-square bg-gradient-to-br from-noir-800 to-noir-900 border border-noir-700/50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Scene className="w-full h-full">
                  <CoffeeBean position={[0, 0, 0]} scale={1} />
                </Scene>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full bg-amber-gold/5 blur-3xl" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-4">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-cream/30 mb-8">
              <span>Shop</span>
              <span>/</span>
              <span className="text-amber-gold/50">{product.origin}</span>
            </div>

            <div className="mb-4">
              <span className="px-3 py-1 text-[9px] tracking-[0.2em] uppercase bg-amber-gold/10 text-amber-gold border border-amber-gold/20">
                {product.roastLevel} Roast
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-cream mb-2">
              {product.name}
            </h1>

            <p className="text-cream/40 text-sm mb-6">
              {product.origin} · {product.region}
            </p>

            <div className="font-display text-3xl text-amber-gold mb-8">
              ${product.price}
            </div>

            <div className="mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-cream/30 block mb-3">
                Tasting Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase border border-noir-700 text-cream/50 hover:border-amber-gold/20 hover:text-amber-gold transition-all duration-300"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-noir-700/30">
              {[
                { label: "Altitude", value: product.altitude },
                { label: "Process", value: product.process },
                { label: "Weight", value: `${product.weight}g` },
                { label: "Roast", value: product.roastLevel },
              ].map((detail) => (
                <div key={detail.label}>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-amber-gold/30 block mb-1">
                    {detail.label}
                  </span>
                  <span className="text-cream text-sm">{detail.value}</span>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-cream/30 block mb-3">
                About This Coffee
              </span>
              <p className="text-cream/50 leading-relaxed text-sm">
                {product.fullDescription}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <MagneticButton
                onClick={handleAddToCart}
                className={`flex-1 px-8 py-4 text-sm font-medium tracking-[0.1em] uppercase transition-colors duration-300 text-center justify-center ${
                  added
                    ? "bg-amber-gold/20 text-amber-gold border border-amber-gold/30"
                    : "bg-amber-gold text-noir-900 hover:bg-amber-light"
                }`}
              >
                {added ? "Added" : `Add to Cart — $${product.price}`}
              </MagneticButton>
            </div>

            <p className="text-[10px] text-cream/25 mt-4 tracking-wider">
              Free shipping on orders over $80. Roasted and shipped within 48 hours.
            </p>
          </div>
        </div>
      </div>

      <CartToast
        message={toastMsg}
        visible={toastVisible}
        onDone={() => setToastVisible(false)}
      />
    </div>
  );
}
