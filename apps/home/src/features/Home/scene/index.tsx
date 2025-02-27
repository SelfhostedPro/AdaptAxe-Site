"use client";
import { Float, Html, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { useGuitar } from "@/components/providers/GuitarProvider";
import { Controls } from "./Controls";
import { type ThreeElements } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import dynamic from "next/dynamic";
import { SectionState } from "../store";
import { useBreakpoints } from "@/hooks/use-media-query";
import { OFFPAGE_DISTANCE } from "@/constants";
import gsap from "gsap";

// Dynamically import the Guitar model to prevent SSR issues
// Needed to prevent ProgressEvent Error
const Guitar = dynamic(
  () => import("@/components/models/Guitar").then((mod) => mod.Model),
  { ssr: false }
);

function Loader() {
  const { progress } = useProgress();
  return (
    <Html fullscreen>
      <div className="absolute h-screen w-screen flex flex-col items-center space-y-4 z-50">
        <div className="text-4xl font-bold tracking-tighter font-mono">
          <span
            style={{
              borderRight: "2px solid white",
              paddingRight: "0.2rem",
              animation: "cursor-blink 1s infinite",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-48 h-[2px] bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 w-1 h-2 bg-white top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
        <div className="text-xs text-white/60 font-mono">LOADING ADAPTAXE</div>
      </div>
    </Html>
  );
}

/**
 * ExploreScene is the main 3D scene component for the guitar explorer.
 * It handles the rendering of the guitar model, materials, animations,
 * and positioning based on the current state.
 */
export function ExploreScene() {
  const snap = useSnapshot(GuitarState);
  const ssnap = useSnapshot(SectionState);
  const parentRef = useRef<ThreeElements["group"]>(null);
  const { refs } = useGuitar();
  const { mobile } = useBreakpoints();

  // Handle initial animation when the model is ready
  useEffect(() => {
    if (snap.ready && parentRef.current) {
      // Start slide-in animation when model is ready
      gsap.set(parentRef.current.position as [number, number, number], {
        x: mobile ? -OFFPAGE_DISTANCE : OFFPAGE_DISTANCE, // Start position depends on device type
        onComplete: () => {
          parentRef.current!.visible = true; // Make visible after positioning
        },
      });

      // Animate the guitar model into view
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

  // Material properties for the secondary/back parts of the guitar
  const backMaterialProps: ThreeElements["meshPhongMaterial"] = {
    toneMapped: false,
    shininess: 100,
    reflectivity: 1,
    refractionRatio: 0.98,
    emissiveIntensity: 0.4,
  };

  // Material properties for the primary/front parts of the guitar
  const primaryMaterialProps: ThreeElements["meshPhysicalMaterial"] = {
    toneMapped: false,
    roughness: 0.5,
    metalness: 0.3,
    emissiveIntensity: 0.4,
    envMapIntensity: 1,
  };

  // Color animation is commented out but kept for reference
  // useFrame((_, delta) => {
  //   // @ts-expect-error Ref is usable here
  //   easing.dampC(primaryColor, snap.primary, 0.25, delta);
  //   // @ts-expect-error Ref is usable here
  //   easing.dampC(secondaryColor, snap.secondary, 0.25, delta);
  // });

  // Calculate responsive scale factor based on screen width
  const sf = Math.min(Math.max(window.innerWidth / 1260, 0.6), 1);

  return (
    <>
      <Controls>
        {/* Float animation only enabled on the "thanks" section */}
        <Suspense fallback={<Loader />}>
          <Float enabled={ssnap.section === "thanks"}>
            <group ref={parentRef} visible={false} scale={1 * sf}>
              {/* Guitar model with dynamic materials based on selected colors */}
              <Suspense
                fallback={
                  <Guitar
                    highQuality={false}
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
                }
              >
                <Guitar
                  highQuality={true}
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
              </Suspense>

              {/* Highlight sphere used for feature demonstrations */}
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
        </Suspense>
      </Controls>
    </>
  );
}
