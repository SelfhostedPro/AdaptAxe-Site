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
import { UIState } from "@/store/ui";
import { cn } from "@workspace/ui/lib/utils";

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

function _Explore() {
  const ssnap = useSnapshot(SectionState);
  const usnap = useSnapshot(UIState);
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
          </Suspense>

          <Lighting />
          <PerspectiveCamera
            fov={35}
            position={[0, 0, 20]}
            near={1}
            far={28}
            makeDefault
          />
        </MainCanvas>
      </div>
      {/* Progress Indicator - Always on top */}
    </main>
  );
}
