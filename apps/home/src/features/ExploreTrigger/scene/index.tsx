"use client";
import {
  Float,
  Html,
  PerspectiveCamera,
  Scroll,
  useProgress,
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useGuitar } from "@/components/providers/GuitarProvider";
import { Lighting } from "./Lighting";
import type { PartType } from "@/constants";
import { Controls } from "./Controls";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import * as THREE from "three";
import { easing } from "maath";
import dynamic from "next/dynamic";
import { SectionState } from "../store";
import { useIsMobile } from "@/hooks/use-mobile";

// Needed to prevent ProgressEvent Error
const Guitar = dynamic(
  () => import("@/components/models/Guitar").then((mod) => mod.Model),
  { ssr: false }
);

export function ExploreScene() {
  const snap = useSnapshot(GuitarState);
  const ssnap = useSnapshot(SectionState);
  const primaryColor = useRef(new THREE.Color(snap.primary));
  const secondaryColor = useRef(new THREE.Color(snap.secondary));
  const { refs } = useGuitar();
  const mobile = useIsMobile();

  const backMaterialProps: ThreeElements["meshPhongMaterial"] = {
    toneMapped: false,
    shininess: 100,
    reflectivity: 1,
    refractionRatio: 0.98,
    emissiveIntensity: 0.4,
  };

  const primaryMaterialProps: ThreeElements["meshPhysicalMaterial"] = {
    toneMapped: false,
    roughness: 0.5,
    metalness: 0.3,
    emissiveIntensity: 0.4,
    envMapIntensity: 1,
  };

  useFrame((_, delta) => {
    // @ts-expect-error Ref is usable here
    easing.dampC(primaryColor, snap.primary, 0.25, delta);
    // @ts-expect-error Ref is usable here
    easing.dampC(secondaryColor, snap.secondary, 0.25, delta);
  });

  return (
    <>
      {/* <Scroll html>
        <div className="w-full h-full">
          <Overlay refs={refs} overlayRef={overlayRef} />
        </div>
      </Scroll> */}
      <Controls>
        <Float enabled={ssnap.section === "thanks"}>
          <Guitar
            active={ssnap.section}
            primaryMaterial={
              <meshPhysicalMaterial
                //@ts-expect-error Ref is usable here
                color={primaryColor}
                //@ts-expect-error Ref is usable here
                emissive={primaryColor}
                {...primaryMaterialProps}
              />
            }
            secondaryMaterial={
              <meshPhongMaterial
                //@ts-expect-error Ref is usable here
                color={secondaryColor}
                //@ts-expect-error Ref is usable here
                emissive={secondaryColor}
                {...backMaterialProps}
              />
            }
          />
          <mesh ref={refs.highlightRef} position={[0, 0, 0]}>
            <sphereGeometry scale={1} />
            <meshBasicMaterial
              ref={refs.highlightMatRef}
              color="white"
              opacity={0}
              transparent
            />
          </mesh>
        </Float>
      </Controls>
    </>
  );
}
