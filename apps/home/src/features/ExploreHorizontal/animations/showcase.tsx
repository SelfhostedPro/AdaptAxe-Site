"use client";
import gsap from "gsap";
import { OFFPAGE_DISTANCE } from "@/constants";

interface RefProps {
  refs: ReturnType<typeof import("@/hooks/useGuitarRefs").useGuitarRefs>;
}

export type AnimationProps = RefProps & {
  lg: boolean;
};

export function LeftEnter({ refs, lg }: AnimationProps) {
  const tl = gsap
    .timeline({})
    .to(refs.groupRef.current.position, { y: -OFFPAGE_DISTANCE }, ">")
    .to(refs.leftRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
    .to(refs.leftRef.current.position, { x: lg ? 1.5 : 0 }, ">");
  return tl;
}

export function LeftExit({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline({});
  tl.from(
    [refs.leftRef.current.position, refs.groupRef.current!.position],
    {
      x: 0,
      y: 0,
    },
    ">"
  )
    .to(refs.leftRef.current.position, { x: 0 }, ">")
    .to(refs.groupRef.current.position, { y: 0 }, ">")
    .to(refs.leftRef.current.position, { z: 0 }, "<");
  return tl;
}
export function RightEnter({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.from(
    [refs.rightRef.current.position, refs.groupRef.current!.position],
    {
      x: 0,
    },
    ">"
  )
    .to(refs.groupRef.current.position, { y: -OFFPAGE_DISTANCE })
    .to(refs.rightRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
    .to(refs.rightRef.current.position, { x: lg ? -4 : -3 }, ">")
    .duration();

  return tl;
}
export function RightExit({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.rightRef.current!.position, { x: 0 }, ">")
    .to(refs.groupRef.current!.position, { y: 0 }, ">")
    .to(refs.rightRef.current!.position, { z: 0 }, "<")
    .duration();

  return tl;
}

export function NeckEnter({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to([refs.neckRef.current?.rotation], { x: -0.7 }, ">")
    .to(
      [refs.neckRef.current?.position],
      { y: lg ? 4.5 : 2.7, z: lg ? -0.7 : -0.5 },
      "<"
    )
    .to([refs.neckRef.current!.position], { y: 3 }, ">")
    .to([refs.neckRef.current!.rotation], { x: 0 }, "<")
    .to([refs.groupRef.current!.position], { y: -OFFPAGE_DISTANCE }, "<")
    .to(
      [refs.neckRef.current!.position],
      { z: -OFFPAGE_DISTANCE / 1.2, y: 0 },
      "<"
    )
    .duration();

  return tl;
}

export function NeckExit({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.neckRef.current!.position, { y: 2 }, ">")
    .to(refs.groupRef.current!.position, { y: 0 }, "<")
    .duration();

  return tl;
}

export function PickupsEnter({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.groupRef.current!.position, { y: OFFPAGE_DISTANCE }, ">")
    .to(refs.coreRef.current!.position, { z: OFFPAGE_DISTANCE }, "<")
    .to(refs.pickupRef.current!.position, { z: OFFPAGE_DISTANCE }, "<")
    .to(refs.bridgeRef.current!.position, { z: OFFPAGE_DISTANCE * 2 }, "<")
    .duration();

  return tl;
}

export function PickupsExit({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.pickupRef.current!.position, { x: lg ? -4 : -3 }, ">").duration();

  return tl;
}

export function CoreEnter({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.pickupRef.current!.position, { z: 0 }, ">")
    .to(refs.coreRef.current!.position, { x: 0 }, ">")
    .to(refs.pickupRef.current!.position, { x: lg ? -4 : -3.5 }, "<")
    .duration();

  return tl;
}
export function CoreExit({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.pickupRef.current!.position, { z: OFFPAGE_DISTANCE }, ">")
    .to(refs.pickupRef.current!.position, { x: 0 }, ">")
    .to(
      [
        refs.groupRef.current!.position,
        refs.coreRef.current!.position,
        refs.pickupRef.current!.position,
        refs.bridgeRef.current!.position,
      ],
      { z: 0 },
      ">"
    )
    .to([refs.groupRef.current!.position], { y: 0 }, "<")
    .to([refs.neckRef.current!.rotation], { x: -0.7 })
    .to(
      [refs.neckRef.current!.position],
      { y: lg ? 4.5 : 2.7, z: lg ? -0.95 : -0.5 },
      "<"
    )
    .to([refs.neckRef.current!.position], { y: lg ? 4.2 : 3 }, ">")
    .to([refs.neckRef.current!.rotation], { x: 0 }, ">")

    .to([refs.neckRef.current!.position], { y: 0 }, "<")
    .to([refs.neckRef.current!.position], { z: 0.3 }, "<")

    .to([refs.neckRef.current!.position], { z: 0 }, "<60%")
    .duration();

  return tl;
}

export function BridgeEnter({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.bridgeRef.current!.position, { z: OFFPAGE_DISTANCE / 1.2 }, ">")
    .to(refs.groupRef.current!.position, { y: OFFPAGE_DISTANCE }, "<")
    .duration();

  return tl;
}

export function BridgeExit({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(refs.bridgeRef.current!.position, { z: 0 }, ">").to(
    [refs.bridgeRef.current!.position, refs.groupRef.current!.position],
    { y: 0 },
    "<"
  );
  return tl;
}

export function ThanksEnter({ refs, lg }: AnimationProps) {
  const tl = gsap.timeline();
  tl.to(
    [
      refs.groupRef.current!.position,
      refs.leftRef.current!.position,
      refs.rightRef.current!.position,
      refs.pickupRef.current!.position,
      refs.neckRef.current!.position,
      refs.bridgeRef.current!.position,
      refs.coreRef.current!.position,
    ],
    { x: 0, y: 0, z: 0 },
    ">"
  )
    .to(
      [
        refs.leftRef.current!.rotation,
        refs.rightRef.current!.rotation,
        refs.pickupRef.current!.rotation,
        refs.bridgeRef.current!.rotation,
        refs.neckRef.current!.position,
        refs.coreRef.current!.rotation,
      ],
      {
        x: 0,
        y: 0,
        z: 0,
      },
      "<"
    )
    .to(
      refs.groupRef.current!.position,
      { x: lg ? 0 : -2, y: lg ? 0 : -2 },
      ">"
    )
    .to(refs.groupRef.current!.rotation, { z: 6.4 }, "<")
    .duration();

  return tl;
}
