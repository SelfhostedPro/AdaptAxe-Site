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
  const ssnap = useSnapshot(SectionState)
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
    tl.current = tl.current
      ? tl.current
      : gsap.timeline().set([controlsRef.current, visibilityRef.current], {
          x: 200,
        });
    tl.current.to(controlsRef.current, {
      x: usnap.controlsOpen ? 0 : 200,
      duration: 0.2,
    });
    tl.current.to(visibilityRef.current, {
      x: usnap.visibilityOpen ? 0 : 200,
      duration: 0.2,
    });
  }, [usnap.controlsOpen, usnap.visibilityOpen]);

  return (
    <>
      <ControlButtons />
      <div ref={visibilityRef} className="fixed top-10 right-1 z-50">
        <VisibilityControls />
      </div>
      <div ref={controlsRef} className="fixed top-10 right-1 z-50">
        <Card className="bg-background">
          <CardContent className="p-2 flex flex-row gap-2">
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
