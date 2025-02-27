import { Html } from "@react-three/drei";

export function Loading() {
  return (
    <Html fullscreen>
      <div className="w-[100vw] h-[100dvh] bg-background flex items-center justify-center">
        <span className="text-center text-7xl font-bold">Loading ...</span>
      </div>
    </Html>
  );
}
