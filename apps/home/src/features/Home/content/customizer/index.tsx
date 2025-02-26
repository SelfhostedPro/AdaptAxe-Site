import { useGuitar } from "@/components/providers/GuitarProvider";
import { GuitarState } from "@/store/guitar";
import { UIState } from "@/store/ui";
import { useGSAP } from "@gsap/react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { useRef, useEffect, RefObject } from "react";
import { useSnapshot } from "valtio";
import { ControlButtons } from "./Buttons";
import { ColorPicker } from "./ColorPicker";
import { StyleSelector } from "./StyleSelector";
import { VisibilityControls } from "./VisibilityControls";
import gsap from "gsap";
import * as THREE from "three";
import { ProgressIndicator } from "../ProgressIndicator";
import { Parts } from "@/constants";
import { SectionState } from "../../store";

type BodyRefs = Record<string, RefObject<THREE.Group | THREE.Mesh | null>>;
export function Customizer() {
  const gsnap = useSnapshot(GuitarState);
  const usnap = useSnapshot(UIState);
  const ssnap = useSnapshot(SectionState);
  const { refs } = useGuitar();
  const tl = useRef<GSAPTimeline>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);
  const bodyRefs = useRef<BodyRefs>(null);

  useEffect(() => {
    bodyRefs.current = {
      Core: refs.coreRef,
      "Right Body": refs.rightBody,
      "Right Plate": refs.rightPlate,
      "Left Body": refs.leftBody,
      "Left Plate": refs.leftPlate,
      Pickups: refs.pickupRef,
      Bridge: refs.bridgeRef,
    };
  }, [refs]);

  useGSAP(() => {
    // Define animation states
    const offscreenState = { x: 300, opacity: 0, duration: 0.2 };
    const onscreenState = { x: 0, opacity: 1, duration: 0.2 };

    const open = (ref: RefObject<HTMLDivElement | null>, state: boolean) => {
      if (!ref.current) return;
      if (state) {
        tl.current!.to(ref.current, onscreenState, ">");
      } else {
        tl.current!.to(ref.current, offscreenState);
      }
    };

    // Initialize timeline if it doesn't exist
    if (!tl.current) {
      tl.current = gsap.timeline();
      // Set initial state for both panels (offscreen and transparent)
      tl.current.set([controlsRef.current, visibilityRef.current], {
        x: 300,
        opacity: 0,
      });
    }

    // Clear the timeline to prevent conflicting animations
    tl.current.clear();

    // If both states are attempting to change (one opening, one closing)
    if (usnap.visibilityOpen && usnap.controlsOpen) {
      // Force mutual exclusivity - only one panel can be open at a time
      // This should already be handled by the button click handlers
      // but we'll ensure it here as well
      UIState.visibilityOpen = false;
      open(visibilityRef, false);
      open(controlsRef, true);
    } else {
      // Handle animations separately with proper sequencing
      if (!usnap.visibilityOpen) {
        open(visibilityRef, false);
      }
      if (!usnap.controlsOpen) {
        open(controlsRef, false);
      }

      // Now handle openings after closings
      if (usnap.visibilityOpen) {
        open(visibilityRef, true);
      }
      if (usnap.controlsOpen) {
        open(controlsRef, true);
      }
    }
  }, [usnap.controlsOpen, usnap.visibilityOpen]);

  return (
    <>
      <ControlButtons />
      <div
        ref={visibilityRef}
        className="fixed top-9 md:top-10 right-8 md:right-10 z-50"
      >
        <VisibilityControls />
      </div>
      <div
        ref={controlsRef}
        className="fixed top-9 md:top-10 right-8 md:right-10 z-50"
      >
        <Card className="bg-background/40 border-foreground/10 backdrop-blur-3xl rounded-2xl p-4 flex flex-col gap-4">
          <CardContent className="flex flex-row gap-2">
            <ColorPicker colors={gsnap.primarys} label="P" stateKey="primary" />
            <ColorPicker
              colors={gsnap.secondarys}
              label="S"
              stateKey="secondary"
            />
          </CardContent>
          <CardContent>
            <StyleSelector />
          </CardContent>
        </Card>
      </div>
      <div className="fixed bottom-0 w-full p-8 transition-all duration-200 delay-300 z-0">
        <ProgressIndicator
          currentSection={Parts.indexOf(ssnap.section)}
          totalSections={Parts.length}
        />
      </div>
    </>
  );
}
