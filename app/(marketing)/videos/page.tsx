"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import TextReveal from "@/components/ui/TextReveal";

const RemotionPlayer = dynamic(
  () => import("@/components/remotion/RemotionPlayer"),
  { ssr: false }
);

const compositions = [
  {
    id: "ProductReveal",
    title: "Product Reveal",
    subtitle: "Instagram Reel / TikTok",
    duration: "15s",
    resolution: "1080×1920",
    description:
      "A cinematic 15-second product reveal: the coffee bean drops, transforms into a bag, explodes into particles, then reveals the product card.",
  },
  {
    id: "OriginCinematic",
    title: "Origin Cinematic",
    subtitle: "Brand Story / YouTube",
    duration: "30s",
    resolution: "1920×1080",
    description:
      "A 30-second brand story piece that reveals the origin country, tells the story, and presents the brand identity with elegant transitions.",
  },
  {
    id: "ProcessLoop",
    title: "Process Loop",
    subtitle: "Website Background",
    duration: "10s",
    resolution: "1920×1080",
    description:
      "A seamless 10-second loop showing the five stages of roasting, from green bean to Vienna roast, with real-time temperature display.",
  },
];

export default function VideoPage() {
  const [activeComp, setActiveComp] = useState("ProductReveal");

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-4">
            Video Pipeline
          </span>
          <TextReveal
            tag="h1"
            className="font-display text-5xl md:text-7xl text-cream mb-6"
          >
            Remotion Studio
          </TextReveal>
          <p className="text-cream/40 max-w-lg mx-auto">
            Preview and render cinematic video compositions powered by Remotion.
            Each composition is built with React and can be exported as MP4.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar — Composition List */}
          <div className="space-y-3">
            <div className="text-[10px] tracking-[0.3em] uppercase text-cream/30 mb-4">
              Compositions
            </div>
            {compositions.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveComp(comp.id)}
                className={`w-full text-left p-4 border transition-all duration-300 ${
                  activeComp === comp.id
                    ? "bg-noir-700/50 border-amber-gold/30"
                    : "bg-noir-800/30 border-noir-700/30 hover:border-noir-600"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-display text-sm ${
                      activeComp === comp.id ? "text-amber-gold" : "text-cream"
                    }`}
                  >
                    {comp.title}
                  </span>
                  <span className="text-[9px] text-cream/30 font-mono">
                    {comp.duration}
                  </span>
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-cream/30">
                  {comp.subtitle}
                </div>
              </button>
            ))}

            {/* Render instructions */}
            <div className="mt-8 p-4 bg-noir-800/30 border border-noir-700/30">
              <div className="text-[10px] tracking-[0.2em] uppercase text-amber-gold/40 mb-3">
                CLI Render
              </div>
              <code className="block text-[11px] text-cream/50 font-mono leading-relaxed">
                npx remotion render
                <br />
                &nbsp;&nbsp;remotion/index.ts
                <br />
                &nbsp;&nbsp;{activeComp}
                <br />
                &nbsp;&nbsp;out/{activeComp.toLowerCase()}.mp4
              </code>
            </div>
          </div>

          {/* Main — Preview */}
          <div className="space-y-6">
            {/* Video Preview */}
            <div
              className={`bg-noir-800/50 border border-noir-700/50 overflow-hidden ${
                activeComp === "ProductReveal"
                  ? "aspect-[9/16] max-w-[400px] mx-auto"
                  : "aspect-video"
              }`}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-cream/30 text-sm">Loading composition...</div>
                  </div>
                }
              >
                <RemotionPlayer compositionId={activeComp} />
              </Suspense>
            </div>

            {/* Composition Info */}
            {compositions
              .filter((c) => c.id === activeComp)
              .map((comp) => (
                <div
                  key={comp.id}
                  className="p-6 bg-noir-800/30 border border-noir-700/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-display text-xl text-cream">
                      {comp.title}
                    </h3>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 text-[9px] tracking-[0.15em] uppercase border border-noir-700 text-cream/40">
                        {comp.duration}
                      </span>
                      <span className="px-3 py-1 text-[9px] tracking-[0.15em] uppercase border border-noir-700 text-cream/40">
                        {comp.resolution}
                      </span>
                      <span className="px-3 py-1 text-[9px] tracking-[0.15em] uppercase border border-amber-gold/20 text-amber-gold/50">
                        30fps
                      </span>
                    </div>
                  </div>
                  <p className="text-cream/40 text-sm leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              ))}

            {/* API Render */}
            <div className="p-6 bg-noir-800/30 border border-noir-700/30">
              <div className="text-[10px] tracking-[0.2em] uppercase text-amber-gold/40 mb-3">
                API Render
              </div>
              <code className="block text-[11px] text-cream/50 font-mono leading-relaxed">
{`curl -X POST http://localhost:3000/api/remotion/render \\
  -H "Content-Type: application/json" \\
  -d '{"compositionId": "${activeComp}"}'`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
