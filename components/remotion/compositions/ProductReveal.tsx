"use client";

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

interface ProductRevealProps {
  productName: string;
  origin: string;
  flavorNotes: string[];
  price: number;
}

export default function ProductReveal({
  productName = "Ethiopian Yirgacheffe",
  origin = "Ethiopia",
  flavorNotes = ["Jasmine", "Bergamot", "Honey"],
  price = 42,
}: ProductRevealProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bean entrance
  const beanY = interpolate(frame, [0, 30], [200, 0], {
    easing: Easing.out(Easing.exp),
    extrapolateRight: "clamp",
  });

  const beanScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 8, stiffness: 80 },
  });

  const beanOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Bean to bag transition
  const bagOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beanToBagX = interpolate(frame, [120, 180], [0, -200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const beanToBagScale = interpolate(frame, [120, 180], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particle burst
  const particleProgress = interpolate(frame, [180, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text reveals
  const nameOpacity = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameY = interpolate(frame, [240, 270], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  const detailsOpacity = interpolate(frame, [300, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background
  const bgOpacity = interpolate(frame, [0, 30], [1, 0.3], {
    extrapolateRight: "clamp",
  });

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
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,165,116,0.08) 0%, transparent 70%)",
          opacity: bagOpacity,
        }}
      />

      {/* Coffee bean / bag */}
      <div
        style={{
          position: "relative",
          width: 300,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Bean */}
        {frame < 240 && (
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3D2314, #5C3A28)",
              boxShadow: "0 0 60px rgba(61,35,20,0.5)",
              transform: `translateY(${beanY}px) translateX(${beanToBagX}px) scale(${beanScale * beanToBagScale})`,
              opacity: beanOpacity,
            }}
          />
        )}

        {/* Bag */}
        <div
          style={{
            position: "absolute",
            width: 160,
            height: 220,
            background: "linear-gradient(180deg, #1A1A1A, #0F0F0F)",
            border: "1px solid rgba(212,165,116,0.2)",
            borderRadius: 4,
            opacity: bagOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontFamily: "serif",
              color: "#D4A574",
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            NR
          </div>
          <div
            style={{
              fontSize: 8,
              color: "rgba(245,240,232,0.4)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {origin}
          </div>
        </div>
      </div>

      {/* Particles */}
      {frame >= 180 && frame < 300 &&
        Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = particleProgress * 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const particleOpacity = interpolate(
            frame,
            [180, 210, 270, 300],
            [0, 0.8, 0.8, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: 4 + Math.random() * 4,
                height: 4 + Math.random() * 4,
                borderRadius: 1,
                background: "#3D2314",
                opacity: particleOpacity,
              }}
            />
          );
        })}

      {/* Product name */}
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          textAlign: "center",
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "rgba(212,165,116,0.6)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {origin}
        </div>
        <div
          style={{
            fontSize: 36,
            fontFamily: "serif",
            color: "#F5F0E8",
            letterSpacing: "0.1em",
          }}
        >
          {productName}
        </div>
      </div>

      {/* Details */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          textAlign: "center",
          opacity: detailsOpacity,
        }}
      >
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 16 }}>
          {flavorNotes.map((note) => (
            <span
              key={note}
              style={{
                fontSize: 9,
                color: "rgba(245,240,232,0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "1px solid rgba(245,240,232,0.1)",
                padding: "4px 12px",
              }}
            >
              {note}
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: 24,
            fontFamily: "serif",
            color: "#D4A574",
          }}
        >
          ${price}
        </div>
      </div>

      {/* Brand mark */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 10,
          color: "rgba(245,240,232,0.2)",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
        }}
      >
        Noir Roast
      </div>
    </AbsoluteFill>
  );
}
