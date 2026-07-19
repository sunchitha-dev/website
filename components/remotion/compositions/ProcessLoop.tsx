"use client";

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface Stage {
  name: string;
  temperature: string;
  duration: string;
}

interface ProcessLoopProps {
  stages: Stage[];
}

const stageColors: Record<string, string> = {
  Green: "#2D4A2D",
  Yellow: "#8B7355",
  City: "#A07D5A",
  "Full City": "#8B6914",
  Vienna: "#654321",
};

export default function ProcessLoop({ stages }: ProcessLoopProps) {
  const frame = useCurrentFrame();

  // Each stage gets 60 frames (2 seconds)
  const stageDuration = 60;
  const currentStageIndex = Math.min(
    Math.floor(frame / stageDuration),
    stages.length - 1
  );
  const stageProgress = (frame % stageDuration) / stageDuration;

  const currentStage = stages[currentStageIndex];

  // Stage name animation
  const nameOpacity = interpolate(
    stageProgress,
    [0, 0.1, 0.8, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const nameY = interpolate(stageProgress, [0, 0.15], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  // Temperature counter
  const temp = parseInt(currentStage.temperature) || 20;
  const displayTemp = Math.round(
    interpolate(stageProgress, [0, 0.6], [0, temp], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Progress bar
  const totalProgress = frame / (stages.length * stageDuration);

  // Background color shift
  const bgColor =
    stageColors[currentStage.name] || "#0A0A0A";
  const bgBlend = interpolate(stageProgress, [0, 0.5], [0, 0.08], {
    extrapolateLeft: "clamp",
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
      {/* Background tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: bgColor,
          opacity: bgBlend,
        }}
      />

      {/* Stage indicator dots */}
      <div
        style={{
          position: "absolute",
          top: 60,
          display: "flex",
          gap: 12,
        }}
      >
        {stages.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentStageIndex ? 24 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                i === currentStageIndex
                  ? "#D4A574"
                  : i < currentStageIndex
                    ? "rgba(212,165,116,0.3)"
                    : "rgba(245,240,232,0.1)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      {/* Stage name */}
      <div
        style={{
          position: "absolute",
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "rgba(212,165,116,0.5)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Stage {String(currentStageIndex + 1).padStart(2, "0")}
        </div>
        <div
          style={{
            fontSize: 64,
            fontFamily: "serif",
            color: "#F5F0E8",
            letterSpacing: "0.15em",
            marginBottom: 24,
          }}
        >
          {currentStage.name}
        </div>
        <div
          style={{
            fontSize: 48,
            color: "#D4A574",
            fontFamily: "serif",
            letterSpacing: "0.05em",
          }}
        >
          {displayTemp}°C
        </div>
      </div>

      {/* Time */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "rgba(245,240,232,0.3)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Time
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(245,240,232,0.5)",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          {currentStage.duration}
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
          height: 1,
          backgroundColor: "rgba(245,240,232,0.05)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${totalProgress * 100}%`,
            backgroundColor: "#D4A574",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Brand */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          fontSize: 8,
          color: "rgba(245,240,232,0.15)",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
        }}
      >
        Noir Roast
      </div>
    </AbsoluteFill>
  );
}
