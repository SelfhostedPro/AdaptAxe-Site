import { ErrorBoundary } from "@/components/Utils/ErrorBoundry";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

interface MainCanvasProps {
  children?: ReactNode;
  className?: string;
}

export function MainCanvas({ children, className }: MainCanvasProps) {
  return (
    <ErrorBoundary>
      <Canvas
        dpr={[1, 200]}
        className={cn("w-full h-full", className)}
        gl={{
          antialias: false,
        }}
        // linear
        // flat
        shadows
      >
        {children}
      </Canvas>
    </ErrorBoundary>
  );
}
