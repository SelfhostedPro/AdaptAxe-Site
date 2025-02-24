"use client";
import { useRef, useState } from "react";
import { useProgress } from "@react-three/drei";

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

// helper function for causing the sections to always snap in the direction of the scroll
function directionalSnap(increment: number, sensitivity: number = 0.1) {
  const snapFunc = gsap.utils.snap(increment);
  return (raw: number, self: any) => {
    let n = snapFunc(raw);

    // Only snap back if we haven't scrolled far from current section
    if (Math.abs(raw - self.lastSnap) < increment * sensitivity) {
      return self.lastSnap; // Stay at the current section
    }

    return Math.abs(n - raw) < 1e-4 + increment * sensitivity ||
      n < raw === self.direction < 0
      ? n
      : self.direction < 0
        ? n - increment
        : n + increment;
  };
}

export function ExploreAnimations({ refs }: { refs: GuitarRefs }) {
  const { lg } = useBreakpoints();
  const timeline = useRef<GSAPTimeline>(null);
  const gsnap = useSnapshot(GuitarState);
  const { active, progress } = useProgress();
  // const scrollTween = useRef<gsap.core.Tween>(null);
  const isAnimating = useRef(false);
  const currentSection = useRef(0);
  const scrollTween = useRef<gsap.core.Tween>(null);

  useGSAP(
    () => {
      if (!gsnap.ready) return;
      // Set up GSAP animations
      console.log("Setting up GSAP animations");
      timeline.current = gsap.timeline();

      // Setup Scroll Animations
      const sections = gsap.utils.toArray(".section");

      // const scrollTween = gsap.timeline({ paused: true }).to(sections, {
      //   id: "container",
      //   xPercent: -100 * (sections.length - 1),
      //   ease: "none",
      //   duration: sections.length - 1,
      // });

      const scrollTween = gsap.to(sections, {
        id: "container",
        xPercent: () => -100 * (sections.length - 1),
        ease: "none",
        // duration: sections.length,
        scrollTrigger: {
          trigger: ".scroll-container",
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: directionalSnap(1 / (sections.length - 1), 0.4),
            delay: 0,
            inertia: false,
            duration: { min: 0.2, max: 0.5 },
            ease: "none",
            directional: true,
          },
          start: "left left",
          end: () => `+=${sections.length * 100}%`,
        },
      });

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
