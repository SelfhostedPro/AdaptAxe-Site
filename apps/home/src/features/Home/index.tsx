"use client";
import { MainCanvas } from "@/components/3d/ViewCanvas";
import { PerspectiveCamera } from "@react-three/drei";
import { GuitarProvider } from "@/components/providers/GuitarProvider";
import { ExploreScene } from "./scene";

// GSAP
import { Lighting } from "./scene/Lighting";
import { Overlay } from "./content/overlay";
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


function _Explore() {
  const containerRef = useGuitarRefs().containerRef;

  return (
    <main
      ref={containerRef}
      className="w-screen h-dvh overflow-hidden main bg-background"
    >
      {/* Background Layer */}
      <div className="fixed top-0 left-0 w-screen h-dvh pointer-events-none">
        {/* Text accents */}
        <TextAccents />
      </div>

      {/* Underlay Layer - Behind the canvas but above background */}
      <div className="absolute left-0 top-0 w-screen h-dvh z-30">
        <Overlay />
        <Customizer />
      </div>

      {/* Canvas Layer - Full viewport, above everything */}
      <div className="absolute top-0 left-0 h-dvh w-screen z-20 ">
        <MainCanvas eventSource={containerRef} className="w-dvw h-dvh">
            <ExploreScene />

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
