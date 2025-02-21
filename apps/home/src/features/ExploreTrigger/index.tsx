"use client";
import { MainCanvas } from "@/components/3d/ViewCanvas";
import { Suspense, useRef } from "react";
import { Html, PerspectiveCamera, useProgress } from "@react-three/drei";
import {
  GuitarProvider,
  useGuitar,
} from "@/components/providers/GuitarProvider";
import { ExploreScene } from "./scene";

// GSAP
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import { Lighting } from "./scene/Lighting";
import { Underlay } from "./underlay";
import { SectionState } from "./store";
import { ProgressIndicator } from "./underlay/ProgressIndicator";
import { Parts } from "@/constants";
import { TextAccents } from "./underlay/Accents";
import { Customizer } from "./scene/Customizer";
import { useGuitarRefs } from "@/hooks/useGuitarRefs";

export default function Explore() {
  return (
    <GuitarProvider>
      <_Explore />
    </GuitarProvider>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-bold tracking-tighter">
          {Math.round(progress)}%
        </div>
        <div className="w-48 h-[1px] bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

function _Explore() {
  const ssnap = useSnapshot(SectionState);
  const containerRef = useGuitarRefs().containerRef;
  return (
    <main ref={containerRef} className="w-screen h-screen overflow-hidden main">
      {/* Background Layer */}
      <div className="fixed inset-0 ">
        {/* Text accents */}
        <TextAccents />
      </div>

      {/* Underlay Layer - Behind the canvas but above background */}
      <div className="absolute inset-0 z-30">
        <Underlay />
        <Customizer />
      </div>

      {/* Canvas Layer - Full viewport, above everything */}
      <div className="absolute top-0 left-0 z-20 bg-white">
        <MainCanvas eventSource={containerRef.current!} className="w-screen h-screen">
          <Suspense fallback={<Loader />}>
            <ExploreScene />
            <Lighting />
            <PerspectiveCamera
              fov={35}
              position={[0, 0, 20]}
              near={1}
              far={28}
              makeDefault
            />
          </Suspense>
        </MainCanvas>
      </div>
      {/* Progress Indicator - Always on top */}
      <div className="fixed z-30 bottom-0 w-full p-8">
        <ProgressIndicator
          currentSection={Parts.indexOf(ssnap.section)}
          totalSections={Parts.length}
        />
      </div>
    </main>
  );
}
