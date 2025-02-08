import { type ReactNode } from "react";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import { useBreakpoints } from "@/hooks/use-media-query";
import { useSnapshot } from "valtio";
import { state } from "@/store/snapshot";
import { useIsMobile } from "@/hooks/use-mobile";

export function Controls({
  children,
  refs,
}: {
  children?: ReactNode;
  refs: ReturnType<typeof import("../hooks/useGuitarRefs").useGuitarRefs>;
}) {
  const mobile = useIsMobile();
  const snap = useSnapshot(state);
  return (
    <group position={[snap.display ? 0 : 3.5, 0, 0]}>
      <PresentationControls
        enabled={!snap.display && !mobile}
        snap
        polar={[-Math.PI / 2, Math.PI / 2]}
      >
        {children}
      </PresentationControls>
      <OrbitControls
        enabled={snap.display}
        enableZoom={false}
        enablePan={false}
        makeDefault
      />
    </group>
  );
}
