"use client";
import { RefObject, useCallback, useRef } from "react";
import gsap from "gsap";
import { OFFPAGE_DISTANCE, type PartType } from "@/constants";
import { useBreakpoints } from "@/hooks/use-media-query";
import { useScroll } from "@react-three/drei";
import { SectionState } from "../store";
import { useGSAP } from "@gsap/react";

type ShowcaseProps = {
  refs: ReturnType<typeof import("@/hooks/useGuitarRefs").useGuitarRefs>;
  tl?: GSAPTimeline;
  pageWidth: number;
};


export function useShowcaseAnimations({ refs }: ShowcaseProps) {
  const { lg } = useBreakpoints();
  const { fixed } = useScroll();

  const enterStart = "left right";
  const enterEnd = "left left";
  const exitStart = "left left";
  const exitEnd = "right center";

  const rightShowcase = useCallback(() => {
    if (!refs.groupRef.current || !refs.rightRef.current) return;
    gsap
      .timeline()
      .from([refs.rightRef.current.position, refs.groupRef.current.position], {
        x: 0,
      })
      .to(refs.groupRef.current.position, { y: -OFFPAGE_DISTANCE })
      .to(refs.rightRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
      .to(refs.rightRef.current.position, { x: lg ? -4 : -3 }, ">");

    // Reset
    gsap
      .timeline()
      .to(refs.rightRef.current.position, { x: 0 })
      .to(refs.groupRef.current.position, { y: 0 }, ">")
      .to(refs.rightRef.current.position, { z: 0 }, "<");
  }, [refs]);

  const leftShowcase = useCallback(() => {
    if (!refs.groupRef.current || !refs.leftRef.current) {
      return;
    }
    gsap
      .timeline()
      .to(refs.groupRef.current.position, { y: -OFFPAGE_DISTANCE })
      .to(refs.leftRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
      .to(refs.leftRef.current.position, { x: lg ? 1.5 : 0 }, ">");
    // Reset
    gsap
      .timeline()
      .to(refs.leftRef.current.position, { x: 0 })
      .to(refs.groupRef.current.position, { y: 0 }, ">")
      .to(refs.leftRef.current.position, { z: 0 }, "<");
  }, [refs]);

  const neckShowcase = useCallback(() => {
    if (!refs.groupRef.current || !refs.neckRef.current) return;
    gsap
      .timeline()
      .to([refs.neckRef.current?.rotation], { x: -0.7 })
      .to(
        [refs.neckRef.current?.position],
        { y: lg ? 4.5 : 2.7, z: lg ? -0.7 : -0.5 },
        "<"
      )
      .to([refs.neckRef.current?.position], { y: 3 }, ">")
      .to([refs.neckRef.current?.rotation], { x: 0 }, "<")
      .to([refs.groupRef.current.position], { y: -OFFPAGE_DISTANCE }, "<")
      .to(
        [refs.neckRef.current.position],
        { z: -OFFPAGE_DISTANCE / 1.2, y: 0 },
        "<"
      );

    // Reset
    gsap
      .timeline()
      .to(refs.neckRef.current.position, { y: 2 })
      .to(refs.groupRef.current.position, { y: 0 }, "<");
  }, [refs]);

  const pickupShowcase = useCallback(() => {
    if (
      !refs.groupRef.current ||
      !refs.coreRef.current ||
      !refs.pickupRef.current ||
      !refs.bridgeRef.current
    )
      return;
    gsap
      .timeline()
      .to(refs.groupRef.current.position, { y: OFFPAGE_DISTANCE })
      .to(refs.coreRef.current.position, { z: OFFPAGE_DISTANCE }, "<")
      .to(refs.pickupRef.current.position, { z: OFFPAGE_DISTANCE }, "<")
      .to(refs.bridgeRef.current.position, { z: OFFPAGE_DISTANCE * 2 }, "<");
    // .to(refs.coreRef.current.position, { x: 3 }, '>')

    // Reset
    gsap
      .timeline()
      .to(refs.pickupRef.current.position, { x: lg ? -4 : -3 }, ">");

    //     .to(refs.coreRef.current.position, { x: 0 })
  }, [refs]);

  const coreShowcase = useCallback(() => {
    if (
      !refs.pickupRef.current ||
      !refs.coreRef.current ||
      !refs.pickupRef.current ||
      !refs.groupRef.current ||
      !refs.bridgeRef.current
    )
      return;
    gsap
      .timeline()
      // .to(refs.pickupRef.current.position, { x: -3.5 })
      .to(refs.pickupRef.current.position, { z: 0 })
      .to(refs.coreRef.current.position, { x: 0 }, ">")
      .to(refs.pickupRef.current.position, { x: lg ? -4 : -3.5 }, "<");

    // Reset
    gsap
      .timeline()
      .to(refs.pickupRef.current.position, { z: OFFPAGE_DISTANCE })
      .to(refs.pickupRef.current.position, { x: 0 }, ">")
      .to(
        [
          refs.groupRef.current.position,
          refs.coreRef.current.position,
          refs.pickupRef.current.position,
          refs.bridgeRef.current.position,
        ],
        { z: 0 },
        ">"
      )
      .to([refs.groupRef.current.position], { y: 0 }, "<")
      .to([refs.neckRef.current?.rotation], { x: -0.7 })
      .to(
        [refs.neckRef.current?.position],
        { y: lg ? 4.5 : 2.7, z: lg ? -0.95 : -0.5 },
        "<"
      )
      .to([refs.neckRef.current?.position], { y: lg ? 4.2 : 3 }, ">")
      .to([refs.neckRef.current?.rotation], { x: 0 }, ">")

      .to([refs.neckRef.current?.position], { y: 0 }, "<")
      .to([refs.neckRef.current?.position], { z: 0.3 }, "<")

      .to([refs.neckRef.current?.position], { z: 0 }, "<60%");
  }, [refs]);

  const bridgeShowcase = useCallback(() => {
    if (!refs.bridgeRef.current || !refs.groupRef.current) return;
    gsap
      .timeline()
      .to(refs.bridgeRef.current.position, { z: OFFPAGE_DISTANCE / 1.2 })
      .to(refs.groupRef.current.position, { y: OFFPAGE_DISTANCE }, "<");

    // Reset
    gsap
      .timeline()
      .to(refs.bridgeRef.current.position, { z: 0 }, ">")
      .to(
        [refs.bridgeRef.current.position, refs.groupRef.current.position],
        { y: 0 },
        "<"
      );
  }, [refs]);

  const thanksShowcase = useCallback(() => {
    if (
      !refs.groupRef.current ||
      !refs.coreRef.current ||
      !refs.pickupRef.current ||
      !refs.leftRef.current ||
      !refs.rightRef.current ||
      !refs.bridgeRef.current ||
      !refs.neckRef.current
    )
      return;
    gsap
      .timeline()
      .to(
        [
          refs.groupRef.current.position,
          refs.leftRef.current.position,
          refs.rightRef.current.position,
          refs.pickupRef.current.position,
          refs.neckRef.current.position,
          refs.bridgeRef.current.position,
          refs.coreRef.current.position,
        ],
        { x: 0, y: 0, z: 0 },
        ">"
      )
      .to(
        [
          refs.leftRef.current.rotation,
          refs.rightRef.current.rotation,
          refs.pickupRef.current.rotation,
          refs.bridgeRef.current.rotation,
          refs.neckRef.current.position,
          refs.coreRef.current.rotation,
        ],
        {
          x: 0,
          y: 0,
          z: 0,
        },
        "<"
      )
      .to(refs.groupRef.current, { x: lg ? 0 : -2, y: lg ? 0 : -2 }, ">")
      .to(refs.groupRef.current.rotation, { z: 6.4 }, "<");
  }, [refs]);

  return {
    rightShowcase,
    leftShowcase,
    neckShowcase,
    pickupShowcase,
    coreShowcase,
    bridgeShowcase,
    thanksShowcase,
  };
}
