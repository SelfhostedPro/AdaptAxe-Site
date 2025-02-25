"use client";
import { type ReactNode } from "react";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { UIState } from "@/store/ui";

import { useBreakpoints } from "@/hooks/use-media-query";

export function Controls({ children }: { children?: ReactNode }) {
  const { mobile } = useBreakpoints();
  const usnap = useSnapshot(UIState);

  return (
    // [-3.5, -0.2, 0] : [0, 0, 0]
    <group position={[usnap.display ? 0 : mobile ? 0 : 3.5, 0, 0]}>
      <PresentationControls
        enabled={!usnap.display && !mobile}
        snap
        polar={[-Math.PI / 2, Math.PI / 2]}
      >
        {children}
      </PresentationControls>
      <OrbitControls
        enabled={usnap.display}
        enableZoom={false}
        enablePan={false}
        makeDefault
      />
    </group>
  );
}
