'use client'
import { type ReactNode } from "react";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { UIState } from "@/store/ui";

import { useIsMobile } from "@/hooks/use-mobile";
import { useGuitar } from "@/components/providers/GuitarProvider";

export function Controls({
  children,
}: {
  children?: ReactNode;
}) {
  const mobile = useIsMobile();
  const usnap = useSnapshot(UIState);
  const { refs } = useGuitar();

  return (
    <group position={[usnap.display ? 0 : 3.5, 0, 0]}>
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
