"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useDesktopScroll, useMobileScroll } from "./scrollers";
// GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import {
  BridgeEnter,
  BridgeExit,
  CoreEnter,
  CoreExit,
  LeftEnter,
  LeftExit,
  NeckEnter,
  NeckExit,
  PickupsEnter,
  PickupsExit,
  RightEnter,
  RightExit,
  ThanksEnter,
} from "./animations";
import gsap from "gsap";
import { useBreakpoints } from "@/hooks/use-media-query";
import { type GuitarRefs } from "@/hooks/useGuitarRefs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ExploreAnimations({ refs }: { refs: GuitarRefs }) {
  const { lg } = useBreakpoints();
  const timeline = useRef<GSAPTimeline>(null);
  const gsnap = useSnapshot(GuitarState);
  const { active, progress } = useProgress();
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  const animating = useRef(false);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  useGSAP(
    () => {
      if (!gsnap.ready) return;
      // Set up GSAP animations
      console.log("Setting up GSAP animations");
      timeline.current = gsap.timeline();

      // Setup Scroll Animations
      const sections = gsap.utils.toArray(".section") as HTMLDivElement[];

      // Use appropriate scroll controller
      const scrollTween = isIOS
        ? useMobileScroll(sections, animating)
        : useDesktopScroll(sections);

      const contents = gsap.utils.toArray(".content");
      contents.forEach((content, i) => {
        if (i === 0) return; // Skip first section
        gsap.fromTo(
          content as gsap.TweenTarget,
          {
            // clipPath: "inset(0 100% 0 0)",
            filter: "blur(2px)",
            opacity: 0,
          },
          {
            // clipPath: "inset(0 0% 0 0)",
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.5,
            ease: "none",
            scrollTrigger: {
              invalidateOnRefresh: true,
              // markers: { indent: i * 30 },
              // pin: sections[i] as HTMLDivElement,
              pin: true,
              pinSpacing: true,
              pinnedContainer: ".scroll-container",
              trigger: content as gsap.DOMTarget,
              scrub: true,
              start: () => "left 40%",
              end: () => "left 5%",
              containerAnimation: scrollTween,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      timeline.current
        .add(LeftEnter({ refs, lg, scrollTween: scrollTween }))
        .add(LeftExit({ refs, lg, scrollTween: scrollTween }));
      timeline.current
        .add(RightEnter({ refs, lg, scrollTween: scrollTween }))
        .add(RightExit({ refs, lg, scrollTween: scrollTween }));
      timeline.current
        .add(NeckEnter({ refs, lg, scrollTween: scrollTween }))
        .add(NeckExit({ refs, lg, scrollTween: scrollTween }));
      timeline.current
        .add(PickupsEnter({ refs, lg, scrollTween: scrollTween }))
        .add(PickupsExit({ refs, lg, scrollTween: scrollTween }));
      timeline.current
        .add(CoreEnter({ refs, lg, scrollTween: scrollTween }))
        .add(CoreExit({ refs, lg, scrollTween: scrollTween }));
      timeline.current
        .add(BridgeEnter({ refs, lg, scrollTween: scrollTween }))
        .add(BridgeExit({ refs, lg, scrollTween: scrollTween }));
      timeline.current.add(ThanksEnter({ refs, lg, scrollTween: scrollTween }));

      // Fix IOS Scrolling
      ScrollTrigger.config({ ignoreMobileResize: true });
      ScrollTrigger.normalizeScroll(true);
    },
    {
      dependencies: [lg, gsnap.ready, active, progress],
    }
  );

  return null;
}
