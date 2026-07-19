"use client";

import { useEffect, useRef, useState } from "react";
import {
  Player,
  PlayerRef,
} from "@remotion/player";
import ProductReveal from "./compositions/ProductReveal";
import OriginCinematic from "./compositions/OriginCinematic";
import ProcessLoop from "./compositions/ProcessLoop";

interface RemotionPlayerProps {
  compositionId: string;
}

const compositions: Record<
  string,
  {
    component: React.FC<any>;
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
    defaultProps: Record<string, any>;
  }
> = {
  ProductReveal: {
    component: ProductReveal,
    durationInFrames: 450,
    fps: 30,
    width: 1080,
    height: 1920,
    defaultProps: {
      productName: "Ethiopian Yirgacheffe",
      origin: "Ethiopia",
      flavorNotes: ["Jasmine", "Bergamot", "Honey"],
      price: 42,
    },
  },
  OriginCinematic: {
    component: OriginCinematic,
    durationInFrames: 900,
    fps: 30,
    width: 1920,
    height: 1080,
    defaultProps: {
      originName: "Ethiopia",
      story:
        "Born in the birthplace of coffee, our Yirgacheffe tells a story of ancient forests and third-generation farmers.",
      country: "Ethiopia",
    },
  },
  ProcessLoop: {
    component: ProcessLoop,
    durationInFrames: 300,
    fps: 30,
    width: 1920,
    height: 1080,
    defaultProps: {
      stages: [
        { name: "Green", temperature: "20°C", duration: "0:00" },
        { name: "Yellow", temperature: "150°C", duration: "4:00" },
        { name: "City", temperature: "195°C", duration: "8:00" },
        { name: "Full City", temperature: "215°C", duration: "11:00" },
        { name: "Vienna", temperature: "225°C", duration: "13:30" },
      ],
    },
  },
};

export default function RemotionPlayer({ compositionId }: RemotionPlayerProps) {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const comp = compositions[compositionId];
  if (!comp) return <div className="text-cream/30 p-8">Composition not found</div>;

  const { component: Comp, durationInFrames, fps, width, height, defaultProps } = comp;

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleFrame = (e: { detail: { frame: number } }) => {
      setCurrentFrame(e.detail.frame);
    };

    player.addEventListener("play", handlePlay);
    player.addEventListener("pause", handlePause);
    player.addEventListener("frameupdate", handleFrame as any);

    return () => {
      player.removeEventListener("play", handlePlay);
      player.removeEventListener("pause", handlePause);
      player.removeEventListener("frameupdate", handleFrame as any);
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  };

  const progress = (currentFrame / durationInFrames) * 100;

  return (
    <div className="relative w-full h-full bg-noir-900 flex flex-col">
      {/* Player */}
      <div className="flex-1 relative overflow-hidden">
        <Player
          ref={playerRef}
          component={Comp}
          compositionWidth={width}
          compositionHeight={height}
          durationInFrames={durationInFrames}
          fps={fps}
          inputProps={defaultProps}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          controls={false}
          loop
        />
      </div>

      {/* Custom Controls */}
      <div className="p-4 bg-noir-800/80 backdrop-blur-sm border-t border-noir-700/30">
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-noir-700/50 mb-3 cursor-pointer group"
          onClick={(e) => {
            if (!playerRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const frame = Math.round((x / rect.width) * durationInFrames);
            playerRef.current.seekTo(frame);
          }}
        >
          <div
            className="h-full bg-amber-gold/60 group-hover:bg-amber-gold transition-colors relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center text-cream hover:text-amber-gold transition-colors"
            >
              {isPlaying ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <rect x="1" y="1" width="4" height="12" rx="1" />
                  <rect x="9" y="1" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <path d="M2 1.5v11l10-5.5L2 1.5z" />
                </svg>
              )}
            </button>

            {/* Restart */}
            <button
              onClick={() => playerRef.current?.seekTo(0)}
              className="text-cream/40 hover:text-amber-gold transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
          </div>

          {/* Frame counter */}
          <div className="text-[10px] font-mono text-cream/30">
            {String(Math.floor(currentFrame / fps)).padStart(2, "0")}:
            {String(Math.floor((currentFrame % fps) * (100 / fps)))
              .padStart(2, "0")}{" "}
            / {Math.floor(durationInFrames / fps)}s
          </div>
        </div>
      </div>
    </div>
  );
}
