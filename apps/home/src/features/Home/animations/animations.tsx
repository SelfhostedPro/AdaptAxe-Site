"use client";
import gsap from "gsap";
import { OFFPAGE_DISTANCE, PartType } from "@/constants";
import { SectionState } from "../store";

interface RefProps {
  refs: ReturnType<typeof import("@/hooks/useGuitarRefs").useGuitarRefs>;
}

export type AnimationProps = RefProps & {
  scrollTween: gsap.core.Animation;
  lg: boolean;
};

const enterStart = "center right";
const enterEnd = "center center";
const exitStart = "center center";
const exitEnd = "right 75%";

function createAnimation(
  name: string,
  enterFn: (props: AnimationProps) => gsap.core.Timeline,
  exitFn?: (props: AnimationProps) => gsap.core.Timeline
) {
  return {
    enter: ({ refs, lg, scrollTween }: AnimationProps) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: `${name}Enter`,
          trigger: `.${name}-title`,
          containerAnimation: scrollTween,
          start: enterStart,
          end: enterEnd,
          scrub: true,
        },
        onStart: () => {
          SectionState.section = name as PartType;
        },
        onReverseComplete:
          name === "left"
            ? () => {
                SectionState.section = "explore";
              }
            : undefined,
      });

      // Add the animations to this timeline
      return tl.add(enterFn({ refs, lg, scrollTween }));
    },
    exit: ({ refs, lg, scrollTween }: AnimationProps) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: `${name}Exit`,
          trigger: `.${name}-section`,
          containerAnimation: scrollTween,
          start: exitStart,
          end: exitEnd,
          scrub: true,
          onEnterBack: () => (SectionState.section = name as PartType),
        },
        // onStart: () => console.log(`${name} - Exit - Start`),
        // onComplete: () => console.log(`${name} - Exit - End`),
      });

      return tl.add(
        exitFn
          ? exitFn({ refs, lg, scrollTween })
          : enterFn({ refs, lg, scrollTween }).reverse()
      );
    },
  };
}

const LeftAnimation = createAnimation(
  "left",
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.groupRef.current.position, { y: -OFFPAGE_DISTANCE })
      .to(refs.leftRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
      .to(refs.leftRef.current.position, { x: 1.5 }, ">");
  },
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.leftRef.current.position, { x: 0 })
      .to(refs.groupRef.current.position, { y: 0 })
      .to(refs.leftRef.current.position, { z: 0 }, "<");
  }
);

const RightAnimation = createAnimation(
  "right",
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .from([refs.rightRef.current.position, refs.groupRef.current.position], {
        x: 0,
      })
      .to(refs.groupRef.current.position, { y: -OFFPAGE_DISTANCE })
      .to(refs.rightRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
      .to(refs.rightRef.current.position, { x: lg ? -4 : -3 }, ">");
  },
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.rightRef.current!.position, { x: 0 }, ">")
      .to(refs.groupRef.current!.position, { y: 0 }, ">")
      .to(refs.rightRef.current!.position, { z: 0 }, "<");
  }
);

const NeckAnimation = createAnimation(
  "neck",
  ({ refs, lg }) => {
    return gsap
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
  },
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.neckRef.current.position, { y: 2 })
      .to(refs.groupRef.current.position, { y: 0 }, "<");
  }
);

const PickupsAnimation = createAnimation(
  "pickup",
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.groupRef.current.position, { y: OFFPAGE_DISTANCE })
      .to(refs.coreRef.current.position, { z: OFFPAGE_DISTANCE }, "<")
      .to(refs.pickupRef.current.position, { z: OFFPAGE_DISTANCE }, "<")
      .to(refs.bridgeRef.current.position, { z: OFFPAGE_DISTANCE * 2 }, "<");
  },
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.pickupRef.current.position, { x: -4.5 }, ">");
  }
);

const CoreAnimation = createAnimation(
  "core",
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.pickupRef.current.position, { z: 0 })
      .to(refs.coreRef.current.position, { x: 0 }, ">")
      .to(refs.pickupRef.current.position, { x: -4 }, "<");
  },
  ({ refs, lg }) => {
    return gsap
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
  }
);

const BridgeAnimation = createAnimation(
  "bridge",
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.bridgeRef.current.position, { z: OFFPAGE_DISTANCE / 1.2 })
      .to(refs.groupRef.current.position, { y: OFFPAGE_DISTANCE }, "<");
  },
  ({ refs, lg }) => {
    return gsap
      .timeline()
      .to(refs.bridgeRef.current.position, { z: 0 }, ">")
      .to(
        [refs.bridgeRef.current.position, refs.groupRef.current.position],
        { y: 0 },
        "<"
      );
  }
);

const ThanksAnimation = createAnimation("thanks", ({ refs, lg }) => {
  return gsap
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
});

export const { enter: LeftEnter, exit: LeftExit } = LeftAnimation;

export const { enter: RightEnter, exit: RightExit } = RightAnimation;

export const { enter: NeckEnter, exit: NeckExit } = NeckAnimation;

export const { enter: PickupsEnter, exit: PickupsExit } = PickupsAnimation;

export const { enter: CoreEnter, exit: CoreExit } = CoreAnimation;

export const { enter: BridgeEnter, exit: BridgeExit } = BridgeAnimation;

export const { enter: ThanksEnter, exit: ThanksExit } = ThanksAnimation;
