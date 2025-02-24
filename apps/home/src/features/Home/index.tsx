"use client";
import { MainCanvas } from "@/components/3d/ViewCanvas";
import { Suspense } from "react";
import { Html, PerspectiveCamera, useProgress } from "@react-three/drei";
import { GuitarProvider } from "@/components/providers/GuitarProvider";
import { ExploreScene } from "./scene";

// GSAP
import { useSnapshot } from "valtio";
import { Lighting } from "./scene/Lighting";
import { Overlay } from "./content/overlay";
import { SectionState } from "./store";
import { ProgressIndicator } from "./content/ProgressIndicator";
import { Parts } from "@/constants";
import { TextAccents } from "./content/accents/background";
import { Customizer } from "./content/customizer";
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
    <main ref={containerRef} className="w-dvw h-dvh overflow-hidden main">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Text accents */}
        <TextAccents />
      </div>

      {/* Underlay Layer - Behind the canvas but above background */}
      <div className="absolute inset-0 z-30">
        <Overlay />
        <Customizer />
      </div>

      {/* Canvas Layer - Full viewport, above everything */}
      <div className="absolute top-0 left-0 z-20 ">
        <MainCanvas eventSource={containerRef} className="w-dvw h-dvh">
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
      <div className="fixed z-40 bottom-0 w-full p-8">
        <ProgressIndicator
          currentSection={Parts.indexOf(ssnap.section)}
          totalSections={Parts.length}
        />
      </div>
    </main>
  );
}
