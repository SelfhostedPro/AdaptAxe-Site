"use client";
import { MainCanvas, ViewCanvas } from "@/components/3d/ViewCanvas";
import { Suspense, useRef } from "react";
import {
  Html,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  useProgress,
  View,
} from "@react-three/drei";
import {
  GuitarProvider,
  useGuitar,
} from "@/components/providers/GuitarProvider";
import {
  Overlay,
} from "@/features/ExploreHorizontal/components/Overlay";
import { ExploreScene } from "./components/Scene";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import { Parts } from "@/constants";
import { Lighting } from "./components/Lighting";
import { useGuitarRefs } from "@/hooks/useGuitarRefs";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Explore() {
  return (
    <GuitarProvider>
      <_Explore />
    </GuitarProvider>
  );
}

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function _Explore() {
  const { refs } = useGuitar();
  const container = useRef<HTMLDivElement>(null!);
  const snap = useSnapshot(GuitarState);
  return (
    <main className="w-screen h-screen" ref={container}>
      <div
        style={{ backgroundColor: snap.primary }}
        className="w-screen h-screen fixed left-0 transition-colors duration-200 brightness-[290%]"
      />
      <div className="w-full flex flex-row z-0">
        <MainCanvas
          style={{
            position: "fixed",
            right: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10,
          }}
        >
          <ScrollControls horizontal pages={Parts.length} damping={0.2}>
            <Suspense fallback={<Loader />}>
              <ExploreScene refs={refs} />
            </Suspense>
          </ScrollControls>
          <Lighting />
          <PerspectiveCamera
            fov={35}
            position={[0, 0, 20]}
            near={1}
            far={30}
            makeDefault
          />
          {/* <Perf /> */}
        </MainCanvas>
      </div>
      {/* <ViewCanvas eventSource={container} /> */}
    </main>
  );
}
