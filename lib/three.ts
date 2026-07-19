import * as THREE from "three";

export const BEAN_COLOR = new THREE.Color("#3D2314");
export const AMBER_COLOR = new THREE.Color("#D4A574");
export const NOIR_COLOR = new THREE.Color("#0A0A0A");

export function createBeanMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: BEAN_COLOR,
    roughness: 0.35,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    envMapIntensity: 0.8,
  });
}
