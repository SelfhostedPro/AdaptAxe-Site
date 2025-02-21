"use client";
import { Card, CardContent } from "@workspace/ui/components/card";
import { useGuitar } from "@/components/providers/GuitarProvider";
import gsap from "gsap";
import { OFFPAGE_DISTANCE } from "@/constants";
import { useSnapshot } from "valtio/react";
import { GuitarState } from "@/store/guitar";
import { UIState } from "@/store/ui";
import { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Eye, EyeClosed, MoveHorizontal, Settings } from "lucide-react";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

type BodyRefs = Record<string, RefObject<THREE.Group | THREE.Mesh | null>>;

export function Customizer() {
  const gsnap = useSnapshot(GuitarState);
  const usnap = useSnapshot(UIState);
  const { refs } = useGuitar();
  const tl = useRef<GSAPTimeline>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);
  const bodyRefs = useRef<BodyRefs>(null);

  const [visibilityState, setVisibilityState] = useState<
    Record<string, boolean>
  >({});

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
    // Initialize visibility state
    const initialVisibility = Object.fromEntries(
      Object.entries(bodyRefs.current).map(([name, ref]) => [
        name,
        ref.current?.visible ?? true,
      ])
    );
    setVisibilityState(initialVisibility);
  }, [refs]);

  useGSAP(() => {
    tl.current = tl.current
      ? tl.current
      : gsap.timeline().set([controlsRef.current, visibilityRef.current], {
          x: 150,
          duration: 0,
        });
    tl.current.to(controlsRef.current, { x: usnap.controlsOpen ? 0 : 150 });
    tl.current.to(visibilityRef.current, { x: usnap.visibilityOpen ? 0 : 150 });
  }, [usnap.controlsOpen, usnap.visibilityOpen]);

  return (
    <>
      <div className="fixed top-0 right-7 z-50 flex flex-row items-center gap-2 p-2 text-foreground">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() => {
            UIState.display
              ? (UIState.display = false)
              : (UIState.display = true);
            if (
              !refs.coreRef.current ||
              !refs.leftRef.current ||
              !refs.rightRef.current ||
              !refs.groupRef.current ||
              !refs.pickupRef.current
            )
              return;
            gsap
              .timeline()
              .to(
                [
                  !refs.coreRef.current.position,
                  refs.leftRef.current.position,
                  refs.rightRef.current.position,
                  refs.groupRef.current.position,
                  refs.pickupRef.current.position,
                ],
                { x: 0, y: 0 }
              );
          }}
        >
          <MoveHorizontal strokeWidth={1} />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() =>
            (UIState.visibilityOpen = UIState.visibilityOpen ? false : true)
          }
          className="cursor-pointer"
        >
          <Eye strokeWidth={1}  />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() =>
            (UIState.controlsOpen = UIState.controlsOpen ? false : true)
          }
        >
          <Settings strokeWidth={1}  />
        </Button>
      </div>
      <div ref={visibilityRef} className="fixed top-10 right-1 z-50">
        <Card className="bg-background">
          <CardContent className="p-2 flex flex-col gap-2">
            <span>Visibility</span>
            {bodyRefs.current &&
              Object.entries(bodyRefs.current).map(([name, ref]) => (
                <Button
                  key={name}
                  variant={visibilityState[name] ? "default" : "ghost"}
                  onClick={() => {
                    const newVisibility = !visibilityState[name];
                    ref.current!.visible = newVisibility;
                    setVisibilityState((prev) => ({
                      ...prev,
                      [name]: newVisibility,
                    }));
                  }}
                >
                  {name} {visibilityState[name] ? <Eye /> : <EyeClosed />}
                </Button>
              ))}
          </CardContent>
        </Card>
      </div>
      <div ref={controlsRef} className="fixed top-10 right-1 z-50">
        <Card className="bg-background">
          <CardContent className="p-2 flex flex-row gap-2">
            <div className="flex flex-col gap-4 items-center justify-center">
              <span>P</span>
              {gsnap.primarys.map((color) => (
                <div
                  key={color}
                  className={`cursor-pointer size-10 rounded-full border border-neutral-100`}
                  style={{ background: color }}
                  onClick={() => (GuitarState.primary = color)}
                ></div>
              ))}
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              <span>S</span>
              {gsnap.secondarys.map((color) => (
                <div
                  key={color}
                  className={`cursor-pointer size-10 rounded-full border border-neutral-100`}
                  style={{ background: color }}
                  onClick={() => (GuitarState.secondary = color)}
                ></div>
              ))}
            </div>
          </CardContent>
          <CardContent>
            <div className="flex flex-col gap-2">
              {gsnap.styles.map((style) => (
                <div
                  key={style}
                  style={{
                    color: gsnap.style === style ? gsnap.primary : "#000",
                    backgroundColor:
                      gsnap.style === style ? gsnap.secondary : "#FFF",
                  }}
                  className={`cursor-pointer px-2 text-center rounded-full border border-neutral-100 transition-colors duration-200`}
                  onClick={() => {
                    if (!refs.leftRef.current || !refs.rightRef.current) return;
                    gsap
                      .timeline()
                      .to(
                        [
                          refs.leftRef.current.position,
                          refs.rightRef.current.position,
                        ],
                        {
                          z: -OFFPAGE_DISTANCE,
                          onComplete: () => {
                            GuitarState.style = style;
                          },
                        }
                      )
                      .to(
                        [
                          refs.leftRef.current.position,
                          refs.rightRef.current.position,
                        ],
                        { z: 0 },
                        ">"
                      );
                  }}
                >
                  {style}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
