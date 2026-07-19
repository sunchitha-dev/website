"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CoffeeBeanProps {
  scrollProgress?: number;
  position?: [number, number, number];
  scale?: number;
}

export default function CoffeeBean({
  scrollProgress = 0,
  position = [0, 0, 0],
  scale = 1,
}: CoffeeBeanProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 128, 128);
    const positions = geo.attributes.position;
    const vector = new THREE.Vector3();

    for (let i = 0; i < positions.count; i++) {
      vector.fromBufferAttribute(positions, i);
      const theta = Math.atan2(vector.z, vector.x);
      const phi = Math.acos(Math.min(Math.max(vector.y / vector.length(), -1), 1));
      const crease = Math.exp(-Math.pow(theta * 3, 2)) * 0.15;
      const noise = Math.sin(theta * 8 + phi * 6) * 0.02;
      const r = 1 + crease * Math.sin(phi * 4) + noise;
      positions.setXYZ(i, vector.x * r, vector.y * (0.85 + crease * 0.3), vector.z * r);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#3D2314"),
        roughness: 0.35,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 0.8,
      }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x = scrollProgress * Math.PI;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
}
