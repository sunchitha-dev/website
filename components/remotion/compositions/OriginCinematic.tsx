"use client";

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface OriginCinematicProps {
  originName: string;
  story: string;
  country: string;
}

export default function OriginCinematic({
  originName,
  story,
  country,
}: OriginCinematicProps) {
  const frame = useCurrentFrame();

  // Phase 1: Country name reveal (0-90)
  const countryOpacity = interpolate(frame, [0, 30, 90, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const countryScale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  // Phase 2: Story text (90-300)
  const storyOpacity = interpolate(frame, [120, 150, 350, 380], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const storyY = interpolate(frame, [120, 180], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Phase 3: Origin name (300-600)
  const originOpacity = interpolate(frame, [380, 420, 650, 680], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const originScale = interpolate(frame, [380, 450], [1.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  // Phase 4: Ending (600-900)
  const endOpacity = interpolate(frame, [700, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated line
  const lineWidth = interpolate(frame, [0, 300], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background grain
  const grainSeed = Math.floor(frame / 2);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Ambient gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(212,165,116,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Decorative line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${lineWidth}%`,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(212,165,116,0.15), transparent)",
        }}
      />

      {/* Country name */}
      <div
        style={{
          position: "absolute",
          opacity: countryOpacity,
          transform: `scale(${countryScale})`,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontFamily: "serif",
            color: "#F5F0E8",
            letterSpacing: "0.2em",
            textAlign: "center",
          }}
        >
          {country}
        </div>
      </div>

      {/* Story */}
      <div
        style={{
          position: "absolute",
          maxWidth: 600,
          textAlign: "center",
          padding: "0 40px",
          opacity: storyOpacity,
          transform: `translateY(${storyY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "rgba(212,165,116,0.5)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          The Origin
        </div>
        <div
          style={{
            fontSize: 18,
            color: "rgba(245,240,232,0.6)",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          {story}
        </div>
      </div>

      {/* Origin name large */}
      <div
        style={{
          position: "absolute",
          opacity: originOpacity,
          transform: `scale(${originScale})`,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontFamily: "serif",
            color: "#D4A574",
            letterSpacing: "0.15em",
            textAlign: "center",
          }}
        >
          {originName}
        </div>
      </div>

      {/* Ending brand */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: endOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#F5F0E8",
            letterSpacing: "0.3em",
            fontFamily: "serif",
            marginBottom: 8,
          }}
        >
          NOIR ROAST
        </div>
        <div
          style={{
            fontSize: 8,
            color: "rgba(245,240,232,0.3)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
          }}
        >
          Single-Origin Luxury Coffee
        </div>
      </div>
    </AbsoluteFill>
  );
}
