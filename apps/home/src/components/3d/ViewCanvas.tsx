"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { ScrollControls, View } from "@react-three/drei";
import { Suspense } from "react";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import { Parts } from "@/constants";

export function MainCanvas({ children, ...rest }: CanvasProps) {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        touchAction: "none",
      }}
      {...rest}
      shadows
      dpr={[1, 50]}
      gl={{ antialias: true }}
      // linear flat
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

export function ViewCanvas(props: Omit<CanvasProps, "children">) {
  const snap = useSnapshot(GuitarState);
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        touchAction: "none",
      }}
      {...props}
      frameloop="demand"
      shadows
      dpr={[1, 50]}
      gl={{ antialias: true }}
    >
      <ScrollControls pages={Parts.length} damping={0.2} horizontal>
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </ScrollControls>

      {/* <Html prepend fullscreen>
        <div
          style={{ backgroundColor: snap.primary }}
          className="w-screen h-screen fixed left-0 transition-colors duration-200 brightness-[290%]"
        />
      </Html> */}
    </Canvas>
  );
}
