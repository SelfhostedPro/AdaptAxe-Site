import { RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

export const disableControllers = (
  e?: React.PointerEvent<HTMLElement> | PointerEvent | MouseEvent | TouchEvent
) => {
  e?.stopPropagation();
  ScrollTrigger.getById("container")?.disable(false, false);
  Observer.getById("ios-observe")?.disable();
};
export const enableControllers = (
  e?: React.PointerEvent<HTMLElement> | PointerEvent | MouseEvent | TouchEvent
) => {
  e?.stopPropagation();
  ScrollTrigger.getById("container")?.enable(false, false);
  Observer.getById("ios-observe")?.enable();
};

// Separate scroll controller implementations
export const useDesktopScroll = (
  sections: Element[]
  //   onSectionChange: (index: number) => void
) => {
  return gsap.to(sections, {
    id: "container",
    xPercent: () => -100 * (sections.length - 1),
    ease: "none",
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
      onUpdate: (self) => {
        // onSectionChange(Math.round(self.progress * (sections.length - 1)));
      },
    },
  });
};

export const useMobileScroll = (
  sections: Element[],
  animating: RefObject<boolean>
) => {
  const timeline = gsap
    .timeline()
    .to(sections, {
      xPercent: () => -100 * (sections.length - 1),
      ease: "none",
      duration: sections.length - 1,
    })
    .pause();

  ScrollTrigger.observe({
    id: "ios-observe",
    type: "touch,wheel",
    tolerance: 50,
    lockAxis: true,
    debounce: true,
    onChange: (self) => {
      if (animating.current) return;

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

      const targetProgress = directionalSnap(increment, 0.4)(
        currentProgress + direction * increment,
        { direction, lastSnap: currentProgress }
      );

      if (targetProgress !== currentProgress) {
        animating.current = true;
        gsap.to(timeline, {
          progress: targetProgress,
          duration: 0.5,
          ease: "none",
          onComplete: () => {
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

// helper function for causing the sections to always snap in the direction of the scroll
export function directionalSnap(increment: number, sensitivity: number = 0.1) {
  const snapFunc = gsap.utils.snap(increment);
  return (raw: number, self: any) => {
    let n = snapFunc(raw);

    // Calculate how many sections we're trying to move
    const currentSection = Math.round(self.lastSnap / increment);
    const targetSection = Math.round(raw / increment);
    const sectionsToMove = Math.abs(targetSection - currentSection);

    // Require more momentum for multi-section jumps
    const momentum = Math.abs(raw - self.lastSnap) / increment;
    const requiredMomentum = sectionsToMove * 0.4; // Adjust this value to make multi-jumps easier/harder

    if (momentum < requiredMomentum) {
      // Not enough momentum, snap to adjacent section
      return self.direction < 0
        ? self.lastSnap - increment
        : self.lastSnap + increment;
    }

    // Enough momentum, allow the jump
    return Math.abs(n - raw) < 1e-4 + increment * sensitivity ||
      n < raw === self.direction < 0
      ? n
      : self.direction < 0
        ? n - increment
        : n + increment;
  };
}
