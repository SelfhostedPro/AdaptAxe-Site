"use client";
import { Float } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useGuitar } from "@/components/providers/GuitarProvider";
import { Controls } from "./Controls";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import * as THREE from "three";
import { easing } from "maath";
import dynamic from "next/dynamic";
import { SectionState } from "../store";
import { useBreakpoints } from "@/hooks/use-media-query";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { DepthOfFieldEffect, BloomEffect } from "postprocessing";
import { OFFPAGE_DISTANCE } from "@/constants";
import gsap from "gsap";

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
  const parentRef = useRef<ThreeElements["group"]>(null);
  const { refs } = useGuitar();
  const { mobile } = useBreakpoints();

  useEffect(() => {
    if (snap.ready && parentRef.current) {
      // Start slide-in animation when model is ready
      gsap.set(parentRef.current.position as [number, number, number], {
        x: mobile ? -OFFPAGE_DISTANCE : OFFPAGE_DISTANCE,
        onComplete: () => {
          parentRef.current!.visible = true;
        },
      });
      gsap.fromTo(
        parentRef.current.position as [number, number, number],
        { x: mobile ? -OFFPAGE_DISTANCE : OFFPAGE_DISTANCE },
        {
          x: 0,
          duration: 1.5,
          ease: "power4.inOut",
        }
      );
    }
  }, [snap.ready, parentRef.current]);

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

  // useFrame((_, delta) => {
  //   // @ts-expect-error Ref is usable here
  //   easing.dampC(primaryColor, snap.primary, 0.25, delta);
  //   // @ts-expect-error Ref is usable here
  //   easing.dampC(secondaryColor, snap.secondary, 0.25, delta);
  // });

  // Scale Factor
  const sf = Math.min(Math.max(window.innerWidth / 1260, 0.6), 1);

  return (
    <>
      <Controls>
        <Float enabled={ssnap.section === "thanks"}>
          <group ref={parentRef} visible={false} scale={1 * sf}>
            <Guitar
              active={ssnap.section}
              primaryMaterial={
                <meshPhysicalMaterial
                  color={snap.animatePrimary}
                  emissive={snap.animatePrimary}
                  {...primaryMaterialProps}
                />
              }
              secondaryMaterial={
                <meshPhongMaterial
                  color={snap.animateSecondary}
                  emissive={snap.animateSecondary}
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
          </group>
        </Float>
      </Controls>
    </>
  );
}
