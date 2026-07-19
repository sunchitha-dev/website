"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  targetPosition?: [number, number, number];
  lookAt?: [number, number, number];
}

export default function CameraRig({
  targetPosition = [0, 0, 5],
  lookAt = [0, 0, 0],
}: CameraRigProps) {
  const { camera } = useThree();
  const targetVec = useRef(new THREE.Vector3(...targetPosition));
  const lookAtVec = useRef(new THREE.Vector3(...lookAt));

  useFrame(() => {
    camera.position.lerp(targetVec.current, 0.02);
    camera.lookAt(lookAtVec.current);
  });

  return null;
}
