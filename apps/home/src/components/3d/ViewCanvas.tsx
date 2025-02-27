"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, type CanvasProps } from "@react-three/fiber";

export function MainCanvas({ children, ...rest }: CanvasProps) {
  const isAndroid =
    typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);

  return (
    <Canvas
      // WebGPU setup once it's more stable
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
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        touchAction: "none",
      }}
      {...rest}
      // frameloop="always"
      shadows={!isAndroid}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        // alpha: isAndroid,
      }}
      // linear flat
    >
      {children}
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
