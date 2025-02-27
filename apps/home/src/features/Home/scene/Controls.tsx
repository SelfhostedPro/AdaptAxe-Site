"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { UIState } from "@/store/ui";

import { useBreakpoints } from "@/hooks/use-media-query";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ThreeElements } from "@react-three/fiber";
import { Perf } from "r3f-perf";

/**
 * Controls component manages the interactive camera controls for the 3D scene.
 * It switches between PresentationControls (guided movement) and OrbitControls (free movement)
 * based on the UI state and device type.
 *
 * @param children - The 3D content to be controlled
 */
export function Controls({ children }: { children?: ReactNode }) {
  const { mobile } = useBreakpoints();
  const usnap = useSnapshot(UIState);
  const controlsRef = useRef<ThreeElements["mesh"]>(null);
  const timeline = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    if (!controlsRef.current) return;
    timeline.current = gsap.timeline();

    timeline.current.to(
      controlsRef.current.position as [number, number, number],
      {
        x: usnap.display ? 0 : mobile ? 0 : 3.5,
      }
    );
  }, [usnap.display, mobile]);

  return (
    // Position the group based on display mode and device type
    // When display is true, center the model; otherwise offset it for desktop
    <group ref={controlsRef}>
      {/* PresentationControls for guided, limited movement */}
      <PresentationControls
        enabled={!usnap.display && !mobile} // Only enabled on desktop when not in display mode
        snap // Snap to original position when released
        polar={[-Math.PI / 2, Math.PI / 2]} // Limit vertical rotation
      >
        {children}
      </PresentationControls>

      {/* OrbitControls for free movement when in display mode */}
      <OrbitControls
        enabled={usnap.display} // Only enabled when in display mode
        onUpdate={(self) => {
          // Reset controls when disabled
          if (!self.enabled) {
            self.reset();
            self.enabled = false;
          }
        }}
        enableZoom={false} // Prevent zooming
        enablePan={false} // Prevent panning
        makeDefault // Make these controls the default
      />
    </group>
  );
}
