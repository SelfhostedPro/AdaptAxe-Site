"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense } from "react";

export default function ViewCanvas(props: Omit<CanvasProps, "children">) {
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
      shadows
      dpr={[1, 50]}
      gl={{ antialias: true }}
      // linear flat
    >
      <Suspense fallback={null}>
        <View.Port />
      </Suspense>
    </Canvas>
  );
}
