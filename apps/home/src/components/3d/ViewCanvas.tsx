"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { ScrollControls, View } from "@react-three/drei";
import { Suspense } from "react";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import { Parts } from "@/constants";
import * as THREE from "three/webgpu";
export function MainCanvas({ children, ...rest }: CanvasProps) {
  const isAndroid =
    typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);

  return (
    <Canvas
      // gl={async (props) => {
      //   const renderer = new THREE.WebGPURenderer({
      //     antialias: !isAndroid,
      //     precision: isAndroid ? "lowp" : "mediump", // Use lowest precision on Android
      //     depth: true,
      //     stencil: false,
      //     ...(props as any),
      //   });
      //   await renderer.init();
      //   return renderer;
      // }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        height: "100dvh",
        overflow: "hidden",
        pointerEvents: "none",
        touchAction: "none",
      }}
      {...rest}
      // frameloop="always"
      shadows
      dpr={isAndroid ? 0.75 : [1, 1.5]} // Lower resolution on Android
      gl={{
        antialias: true,
        alpha: true,
      }}
      // linear flat
    >
      {children}
    </Canvas>
  );
}
