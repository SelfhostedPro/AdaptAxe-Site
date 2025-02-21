"use client";
import { Card, CardContent } from "@workspace/ui/components/card";
import { useGuitar } from "@/components/providers/GuitarProvider";
import gsap from "gsap";
import { OFFPAGE_DISTANCE, Parts, PartType } from "@/constants";
import { useSnapshot } from "valtio/react";
import { GuitarState } from "@/store/guitar";
import { UIState } from "@/store/ui";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
  useMemo,
} from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Eye,
  EyeClosed,
  LucideIcon,
  MoveHorizontal,
  Settings2,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useBreakpoints } from "@/hooks/use-media-query";
import * as THREE from "three";
import { cn } from "@workspace/ui/lib/utils";
import { Socials } from "@/components/Links";
import { useProgress, useScroll } from "@react-three/drei";
import { SectionState } from "@/features/ExploreHorizontal/store";
import { useSections } from "../sections";
import {
  AnimationProps,
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
} from "../animations/showcase";
import React from "react";

type BodyRefs = Record<string, RefObject<THREE.Group | THREE.Mesh | null>>;

interface DebugInfo {
  currentSection?: PartType;
  currentPage?: number;
  pageWidth?: number;
  scrollPosition?: number;
  scrollLeft?: number;
  clientWidth?: number;
  processingQueue?: PartType[];
}

interface FeatureType {
  name: string;
  description: string;
  icon?: LucideIcon;
  onClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  href?: string;
}

interface RefProps {
  refs: ReturnType<typeof import("@/hooks/useGuitarRefs").useGuitarRefs>;
}

type GuitarRefs = ReturnType<
  typeof import("@/hooks/useGuitarRefs").useGuitarRefs
>;

const ANIMATION_CONFIG: Record<
  PartType,
  {
    enter?: ({ refs, lg }: AnimationProps) => gsap.core.Timeline;
    exit?: ({ refs, lg }: AnimationProps) => gsap.core.Timeline;
  }
> = {
  explore: {},
  left: { enter: LeftEnter, exit: LeftExit },
  right: { enter: RightEnter, exit: RightExit },
  neck: { enter: NeckEnter, exit: NeckExit },
  core: { enter: CoreEnter, exit: CoreExit },
  pickup: { enter: PickupsEnter, exit: PickupsExit },
  bridge: { enter: BridgeEnter, exit: BridgeExit },
  thanks: { enter: ThanksEnter },
} as const;

function checkRefs({ refs }: RefProps) {
  return Object.values(refs).every((ref) => ref.current !== null);
}

const throttle = (fn: Function, wait: number) => {
  let lastTime = Date.now();
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  };
};

const FeatureItem = React.memo(({ feature }: { feature: FeatureType }) => (
  <div
    className={cn(
      "p-4 hover:bg-muted-foreground/20 rounded z-50",
      (feature.onClick || feature.onPointerEnter || feature.onPointerLeave) &&
        "cursor-pointer"
    )}
    onClick={() => feature.onClick?.()}
  >
    {feature.href ? (
      <a href={feature.href} target="_blank">
        <h4 className="font-semibold pb-1 flex gap-2 items-center">
          {feature.icon && <feature.icon className="size-4" />}
          {feature.name}
        </h4>
        <p className="text-sm ">{feature.description}</p>
      </a>
    ) : (
      <div>
        <h4 className="font-semibold pb-1 flex gap-2 items-center">
          {feature.icon && <feature.icon className="size-4" />}
          {feature.name}
        </h4>
        <p className="text-sm ">{feature.description}</p>
      </div>
    )}
  </div>
));

const SectionCard = React.memo(
  ({
    section,
    index,
  }: {
    section: ReturnType<typeof useSections>[number];
    index: number;
  }) => (
    <div
      style={{ position: "absolute", top: 0, left: `${index * 100}vw` }}
      className={`bg-neutral-800 ${section.class}-container h-[20vh] pt-24 w-[40vw] pl-2 md:pl-4 flex items-end justify-stretch relative z-50`}
    >
      <div
        className={`${section.class}-card min-h-72 max-h-screen w-full px-0 md:px-4 brightness-[290%] pointer-events-auto`}
      >
        <span className="text-7xl font-extrabold leading-none tracking-tight mb-2">
          {section.title}
        </span>
        <div className="z-50 flex flex-col gap-4 py-2">
          <p className="text-xl font-semibold ">{section.content}</p>
          <ul className="gap-4 h-full flex flex-col">
            {section.features?.map((feature) => (
              <FeatureItem key={feature.name} feature={feature} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
);

interface OverlayProps {
  refs: GuitarRefs;
  overlayRef: React.RefObject<HTMLDivElement>;
}

export const Overlay = // React.memo(
  ({ refs, overlayRef }: OverlayProps) => {
    const { lg } = useBreakpoints();
    const gsnap = useSnapshot(GuitarState);
    const data = useScroll();
    const usnap = useSnapshot(UIState);
    const timeline = useRef<gsap.core.Timeline | null>(null);
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>(null);
    const isScrolling = useRef(false);

    const sections = useSections({ refs });

    const animateSectionChange = useCallback(
      async (from: PartType, to: PartType) => {
        if (from === to) return;

        const currentIndex = Parts.indexOf(from);
        const targetIndex = Parts.indexOf(to);
        const direction = targetIndex > currentIndex ? 1 : -1;
        const pagesScrolled = Math.abs(targetIndex - currentIndex);

        // Create timeline if it doesn't exist, otherwise use existing
        timeline.current = timeline.current ?? gsap.timeline();

        // Animate through all intermediate pages
        for (let i = 0; i < pagesScrolled; i++) {
          const currentStep = currentIndex + i * direction;
          const nextStep = currentStep + direction;

          const exitSection = Parts[currentStep];
          const enterSection = Parts[nextStep];

          // Add exit animation if exists
          const exitAnim = ANIMATION_CONFIG[exitSection as PartType]?.exit;
          if (exitAnim) {
            timeline.current.add(
              exitAnim({ refs, lg }),
              i === 0 ? undefined : ">"
            );
          }

          // Add enter animation if exists
          const enterAnim = ANIMATION_CONFIG[enterSection as PartType]?.enter;
          if (enterAnim) {
            timeline.current.add(
              enterAnim({ refs, lg }),
              exitAnim ? "<+=0.1" : ">"
            );
          }
        }
      },
      [data.el, lg, refs, SectionState.section]
    );

    // Scroll handler with threshold
    const handleScroll = useCallback(() => {
      // Clear existing timeout
      // Clear any existing timeout
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      // Don't process new scrolls while scrolling
      if (isScrolling.current) {
        return;
      }

      // Set a new timeout to give the scroll time to start moving
      scrollTimer.current = setTimeout(() => {
        console.log("handle scroll running!");
        const SENSITIVITY = 0.4;
        const pageCount = Parts.length;

        const prevSection = SectionState.section;
        const prevPageNum = Parts.indexOf(SectionState.section);

        // Widths for 1 page in normalized(offset) and scroll values
        const offsetPageWidth = 1 / pageCount;
        const scrollPageWith = data.el.scrollWidth / pageCount;

        // Get current scroll position in normalized form (0 to 1)
        const currentOffset = data.offset;
        // Calculate expected offset for current section
        const expectedOffset = prevPageNum * offsetPageWidth;
        console.log(expectedOffset, currentOffset);

        // Get Page number equivalent from the offset
        const offsetPageNum = data.offset / offsetPageWidth;

        const diff = offsetPageNum - prevPageNum;
        const direction = Math.sign(diff);

        // Determine target section
        let targetPage = prevPageNum;
        if (Math.abs(diff) > SENSITIVITY) {
          targetPage = prevPageNum + Math.round(diff);
        }

        targetPage = Math.max(0, Math.min(pageCount - 1, targetPage));
        const targetSection = Parts[targetPage]! satisfies PartType;

        if (targetSection !== SectionState.section) {
          // 1. Update state immediately
          SectionState.section = targetSection;

          // 2. Adjust scroll position
          data.el.scrollTo({
            behavior: "smooth",
            left: targetPage * scrollPageWith,
          });
          data.el.scrollTo({
            behavior: "instant",
            left: targetPage * scrollPageWith,
          });

          // 3. Trigger animations
          animateSectionChange(prevSection, targetSection);
        } else {
          data.el.scrollTo({
            behavior: "smooth",
            left: Parts.indexOf(prevSection) * scrollPageWith,
          });
          data.el.scrollTo({
            behavior: "instant",
            left: Parts.indexOf(prevSection) * scrollPageWith,
          });
        }
        // Allow new scrolls after scroll animation should be complete
        setTimeout(() => {
          isScrolling.current = false;
        }, 500); // Typical smooth scroll takes ~500ms
      }, 50);
    }, [data.offset]);

    useEffect(() => {
      const el = data.el;
      if (el) el.addEventListener("scroll", handleScroll);
      return () => {
        el?.removeEventListener("scroll", handleScroll);
      };
    }, [data.el, handleScroll]);

    return (
      <>
        {/* {debug && <DebugPanel debugInfo={debugInfo} queue={animationQueue.current} />} */}
        <div
          style={{
            color: gsnap.primary,
            display: usnap.display ? "none" : "unset",
          }}
          className="absolute w-full h-full pointer-events-none z-50 transition-colors duration-200"
        >
          {sections.map((section, index) => (
            <SectionCard key={section.class} section={section} index={index} />
          ))}
        </div>
        <div className="flex flex-row fixed left-2 bottom-2 z-50 gap-4 bg-neutral-800 p-2 rounded-md">
          <Socials home className={cn("text-foreground size-6")} />
        </div>
      </>
    );
  };
//);
