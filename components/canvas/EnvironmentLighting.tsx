"use client";

import { Environment } from "@react-three/drei";

export default function EnvironmentLighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#F5F0E8" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#F5F0E8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-3, 4, -2]}
        intensity={1.5}
        color="#D4A574"
        angle={0.4}
        penumbra={0.8}
        castShadow
      />
      <spotLight position={[3, 3, 2]} intensity={0.8} color="#E8C9A0" angle={0.5} penumbra={1} />
      <Environment preset="studio" environmentIntensity={0.3} />
      <fog attach="fog" args={["#0A0A0A", 8, 25]} />
    </>
  );
}
