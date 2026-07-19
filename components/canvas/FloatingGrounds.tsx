"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGroundsProps {
  count?: number;
  active?: boolean;
}

export default function FloatingGrounds({ count = 200, active = true }: FloatingGroundsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        Math.random() * 0.003 + 0.001,
        (Math.random() - 0.5) * 0.005
      ),
      scale: Math.random() * 0.02 + 0.005,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    }));
  }, [count]);

  useFrame(() => {
    if (!meshRef.current || !active) return;

    particles.forEach((p, i) => {
      p.position.add(p.velocity);
      p.position.y += Math.sin(Date.now() * 0.001 + i) * 0.0002;
      if (p.position.y > 4) p.position.y = -4;
      if (Math.abs(p.position.x) > 4) p.position.x *= -0.9;
      if (Math.abs(p.position.z) > 4) p.position.z *= -0.9;

      dummy.position.copy(p.position);
      dummy.scale.setScalar(p.scale);
      dummy.rotation.x += p.rotSpeed;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#3D2314" roughness={0.8} metalness={0.1} transparent opacity={0.6} />
    </instancedMesh>
  );
}
