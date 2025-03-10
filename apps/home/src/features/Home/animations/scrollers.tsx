import { RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { useBreakpoints } from "@/hooks/use-media-query";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

// Helper function to disable scroll controllers and observers
export const disableControllers = (
  e?: React.PointerEvent<HTMLElement> | PointerEvent | MouseEvent | TouchEvent
) => {
  e?.stopPropagation();
  ScrollTrigger.getById("container-scroll")?.disable(false, false);
  Observer.getById("container-observe")?.disable();
};

// Helper function to enable scroll controllers and observers
export const enableControllers = (
  e?: React.PointerEvent<HTMLElement> | PointerEvent | MouseEvent | TouchEvent
) => {
  e?.stopPropagation();
  ScrollTrigger.getById("container-scroll")?.enable(false, false);
  Observer.getById("container-observe")?.enable();
};

// Desktop scroll controller implementation
export const useDesktopScroll = (
  sections: Element[],
  percent: number,
  sensitivity: number = 0.3
  //   onSectionChange: (index: number) => void
) => {
  return gsap.to(sections, {
    id: "container",
    xPercent: () => -percent * (sections.length - 1), // Calculate total scroll distance
    ease: "none",
    scrollTrigger: {
      id: "container-scroll",
      trigger: ".scroll-container",
      pin: true, // Pin the container while scrolling
      pinSpacing: true,
      scrub: 0.9, // Smooth scrolling effect
      invalidateOnRefresh: true,
      snap: {
        snapTo: directionalSnap(1 / (sections.length - 1), sensitivity), // Snap to sections
        delay: 0,
        inertia: false,
        duration: { min: 0.1, max: 0.3 }, // Faster snap duration
        ease: "none",
        directional: true,
      },
      start: "left left",
      end: () => `+=${sections.length * percent}%`, // Calculate end position
    },
  });
};

// Mobile scroll controller implementation using touch/wheel events
export const useMobileScroll = (
  sections: Element[],
  animating: RefObject<boolean>
) => {
  // Create paused timeline for manual control
  const timeline = gsap.timeline({ paused: true }).to(sections, {
    xPercent: () => -150 * (sections.length - 1), // Calculate total movement distance
    ease: "none",
    duration: sections.length - 1,
  });

  // Set up touch/wheel observer for mobile interaction
  ScrollTrigger.observe({
    id: "container-observe",
    type: "touch,wheel",
    tolerance: 50,
    lockAxis: true,
    debounce: true,
    onChange: (self) => {
      if (animating.current) return;

      // Determine scroll direction based on touch/wheel input
      const direction =
        Math.abs(self.deltaX) > Math.abs(self.deltaY)
          ? self.deltaX > 0
            ? -1
            : 1
          : self.deltaY > 0
            ? -1
            : 1;

      const currentProgress = timeline.progress();
      const increment = 1 / (sections.length - 1);

      // Calculate target progress with directional snapping
      const targetProgress = directionalSnap(increment, 0.4)(
        currentProgress + direction * increment,
        { direction, lastSnap: currentProgress }
      );

      // Animate to target progress if different from current
      if (targetProgress !== currentProgress) {
        animating.current = true;
        gsap.to(timeline, {
          progress: targetProgress,
          duration: 0.8,
          ease: "power1.inOut",
          onComplete: () => {
            // Reset animating flag after delay
            gsap.delayedCall(0.5, () => {
              animating.current = false;
            });
          },
        });
      }
    },
  });

  return timeline;
};

// Helper function for directional snapping between sections
export function directionalSnap(increment: number, sensitivity: number = 0.1) {
  const snapFunc = gsap.utils.snap(increment);
  return (raw: number, self: any) => {
    let n = snapFunc(raw);

    // Calculate section movement
    const currentSection = Math.round(self.lastSnap / increment);
    const targetSection = Math.round(raw / increment);
    const sectionsToMove = Math.abs(targetSection - currentSection);

    // Check momentum requirements for multi-section jumps
    const momentum = Math.abs(raw - self.lastSnap) / increment;
    const requiredMomentum = sectionsToMove * 0.4; // Momentum threshold for multi-section jumps

    // If not enough momentum, snap to adjacent section only
    if (momentum < requiredMomentum) {
      return self.direction < 0
        ? self.lastSnap - increment
        : self.lastSnap + increment;
    }

    // With sufficient momentum, allow multi-section jumps
    return Math.abs(n - raw) < 1e-4 + increment * sensitivity ||
      n < raw === self.direction < 0
      ? n
      : self.direction < 0
        ? n - increment
        : n + increment;
  };
}
