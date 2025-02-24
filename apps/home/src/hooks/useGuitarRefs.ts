"use client";
import { useRef } from "react";
import * as THREE from "three";

export type GuitarRefs = ReturnType<typeof useGuitarRefs>

export function useGuitarRefs() {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Group>(null!);

  const leftRef = useRef<THREE.Group>(null!);
  const leftBody = useRef<THREE.Mesh>(null!);
  const leftPlate = useRef<THREE.Mesh>(null!);

  const rightRef = useRef<THREE.Group>(null!);
  const rightBody = useRef<THREE.Mesh>(null!);
  const rightPlate = useRef<THREE.Mesh>(null!);

  const pickupRef = useRef<THREE.Group>(null!);
  const pickup1 = useRef<THREE.Mesh>(null!);
  const pickup2 = useRef<THREE.Mesh>(null!);
  const pickup3 = useRef<THREE.Mesh>(null!);

  const bridgeRef = useRef<THREE.Mesh>(null!);
  const neckRef = useRef<THREE.Mesh>(null!);
  const highlightRef = useRef<THREE.Mesh>(null!);
  // const spotlightRef = useRef<THREE.SpotLight>(null);
  // const pointlightRef = useRef<THREE.PointLight>(null);
  const highlightMatRef = useRef<THREE.MeshStandardMaterial>(null!);

  const carbonRods = useRef<THREE.Mesh>(null!);
  // const quickReleasePin = useRef<THREE.Mesh>(null);

  const containerRef= useRef<HTMLElement>(null!);

  return {
    groupRef,
    coreRef,
    leftRef,
    leftBody,
    leftPlate,
    rightRef,
    rightBody,
    rightPlate,
    pickupRef,
    pickup1,
    pickup2,
    pickup3,
    bridgeRef,
    neckRef,
    // spotlightRef,
    // pointlightRef,
    highlightRef,
    highlightMatRef,
    carbonRods,
    containerRef
    // quickReleasePin,
  };
}
