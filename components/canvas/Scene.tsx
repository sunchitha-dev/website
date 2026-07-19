"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import EnvironmentLighting from "./EnvironmentLighting";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
}

export default function Scene({ children, className = "", camera }: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{
          position: camera?.position ?? [0, 0, 5],
          fov: camera?.fov ?? 45,
        }}
        style={{ background: "transparent", position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <EnvironmentLighting />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
