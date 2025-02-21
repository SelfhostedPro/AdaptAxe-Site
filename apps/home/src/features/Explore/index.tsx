'use client'
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useGuitar } from "@/components/providers/GuitarProvider";
import { useShowcaseAnimations } from "./animations/useShowcaseAnimations";
import { Lighting } from "./components/Lighting";
import type { PartType } from "@/constants";
import { Controls } from "./components/Controls";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import * as THREE from "three";
import { easing } from "maath";
import dynamic from "next/dynamic";

// Needed to prevent ProgressEvent Error
const Guitar = dynamic(() => import('@/components/models/Guitar').then((mod) => mod.Model), { ssr: false })


export function ExploreScene() {
  const [active, setActive] = useState<PartType>("none");
  const { refs } = useGuitar();
  const snap = useSnapshot(GuitarState);
  const primaryColor = useRef(new THREE.Color(snap.primary));
  const secondaryColor = useRef(new THREE.Color(snap.secondary));

  const {
    rightShowcase,
    leftShowcase,
    neckShowcase,
    pickupShowcase,
    coreShowcase,
    bridgeShowcase,
    thanksShowcase,
  } = useShowcaseAnimations({ refs, setActive });

  useGSAP(() => {
    leftShowcase();
    rightShowcase();
    neckShowcase();
    pickupShowcase();
    coreShowcase();
    bridgeShowcase();
    thanksShowcase();
  }, [refs]);

  // useFrame((state, delta) => {
  //   easing.dampC(primaryColor.current, snap.primary, 0.25, delta);
  // });

  const backMaterialProps: ThreeElements["meshPhongMaterial"] = {
    toneMapped: false,
    shininess: 100,
    reflectivity: 1,
    refractionRatio: 0.98,
    emissiveIntensity: 0.4,
    // envMapIntensity: 1,
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
      <Controls refs={refs}>
        <Float enabled={active === "thanks"}>
          <Guitar
            refs={refs}
            active={active}
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
        </Float>
        <mesh ref={refs.highlightRef} position={[0, 0, 0]}>
          <sphereGeometry scale={1} />
          <meshBasicMaterial
            ref={refs.highlightMatRef}
            color="white"
            opacity={0}
            transparent
          />
        </mesh>
      </Controls>
      <Lighting />
      <PerspectiveCamera
        fov={35}
        position={[0, 0, 20]}
        near={1}
        far={30}
        makeDefault
      />
    </>
  );
}
