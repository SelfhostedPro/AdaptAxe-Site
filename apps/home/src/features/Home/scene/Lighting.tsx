"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Lighting() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.children
      .filter(
        (child) =>
          (child as unknown as THREE.DirectionalLight).isDirectionalLight
      )
      .forEach((child) => {
        child.lookAt(groupRef.current!.position);
      });
  }, [groupRef.current]);

  return (
    <group ref={groupRef}>
      {/* Key Light - Main illumination */}
      <directionalLight
        castShadow
        shadow-mapSize={[1024, 1024]}
        intensity={1}
        position={[-3, 3, 30]} // 45 degree angle from front-right
        shadow-bias={-0.0001}
      />

      {/* Fill Light - Softer light to fill shadows */}
      <directionalLight
        intensity={0.7}
        position={[10, 0, 30]} // Opposite side from key light, slightly lower
      />

      {/* Back/Rim Light - Separates subject from background */}
      <directionalLight
        intensity={0.4}
        position={[0, 5, -8]} // Behind and above subject
      />

      {/* Subtle ambient light to prevent completely dark areas */}
      <ambientLight intensity={0.2} />

      {/* Optional ground reflection */}
      <directionalLight
        intensity={0.3}
        position={[0, -20, 5]} // Coming from below
      />
    </group>
  );
}
