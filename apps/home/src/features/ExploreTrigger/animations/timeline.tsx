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

// ScrollTrigger.defaults({markers: {startColor: "white", endColor: "white"}});

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
  const [animating, setAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(
    () => {
      if (!gsnap.ready) return;
      // Set up GSAP animations
      console.log("Setting up GSAP animations");
      timeline.current = gsap.timeline();

      const sections = gsap.utils.toArray(".section");
      console.log("Found sections:", sections.length);

      // const scrollTween = gsap.timeline();

      // const scrollToSection = (index: number, direction: number) => {
      //   setAnimating(true);
      //   console.log("from", currentIndex, "to", index);
      //   scrollTween.to(sections, {
      //     xPercent: (i) => (i - index) * 100, // Move by 100% in scroll direction
      //     duration: 0.5,
      //     ease: "power2.inOut",
      //     onComplete: () => {
      //       setCurrentIndex(index); // Update index after animation
      //       setAnimating(false);
      //     },
      //   });
      // };

      // ScrollTrigger.observe({
      //   type: "wheel,touch,pointer",
      //   preventDefault: true,
      //   onChange: () => {
      //     console.log("animating", animating);
      //     console.log("current Index", currentIndex);
      //     console.log("sections", sections);
      //   },
      //   onLeft: () => {
      //     if (animating || currentIndex <= 0) return;
      //     scrollToSection(currentIndex - 1, -1);
      //   },
      //   onRight: () => {
      //     if (animating || currentIndex >= sections.length - 1) return;
      //     scrollToSection(currentIndex + 1, +1);
      //   },
      //   tolerance: 10,
      // });

      const scrollTween = gsap.to(sections, {
        id: "container",
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".scontainer",
          pin: true,
          scrub: true,
          snap: {
            snapTo: directionalSnap(1 / (sections.length - 1), 0.4),
            delay: 0,
            inertia: false,
            duration: { min: 0.01, max: 0.3 },
            ease: "power1.Out",
            directional: true,
          },
          end: `+=${sections.length * 1000}`,
        },
      });

      const contents = gsap.utils.toArray(".content");
      contents.forEach((content, i) => {
        if (i === 0) return; // Skip first section
        gsap.fromTo(
          content as gsap.TweenTarget,
          {
            clipPath: "inset(0 100% 0 0)",
          },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.5,
            ease: "none",
            scrub: true,
            scrollTrigger: {
              trigger: content as gsap.DOMTarget,
              start: "left 30%",
              containerAnimation: scrollTween,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      console.log(gsnap.ready);

      console.log("ScrollTween created:", scrollTween);

      timeline.current
        .add(LeftEnter({ refs, lg, scrollTween }))
        .add(LeftExit({ refs, lg, scrollTween }));
      timeline.current
        .add(RightEnter({ refs, lg, scrollTween }))
        .add(RightExit({ refs, lg, scrollTween }));
      timeline.current
        .add(NeckEnter({ refs, lg, scrollTween }))
        .add(NeckExit({ refs, lg, scrollTween }));
      timeline.current
        .add(PickupsEnter({ refs, lg, scrollTween }))
        .add(PickupsExit({ refs, lg, scrollTween }));
      timeline.current
        .add(CoreEnter({ refs, lg, scrollTween }))
        .add(CoreExit({ refs, lg, scrollTween }));
      timeline.current
        .add(BridgeEnter({ refs, lg, scrollTween }))
        .add(BridgeExit({ refs, lg, scrollTween }));
      timeline.current.add(ThanksEnter({ refs, lg, scrollTween }));

      console.log(timeline.current);
    },
    {
      dependencies: [lg, gsnap.ready, active, progress],
    }
  );

  return null;
}
