import { useEffect, useRef } from "react";
import { motion, PanInfo, useDragControls } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
import {
  enableControllers,
  disableControllers,
} from "../../animations/scrollers";

gsap.registerPlugin(ScrollTrigger, Observer);

/**
 * Props for the MobileDrawer component
 */
interface DrawerProps {
  children: React.ReactNode;
  minHeight: string; // Height when drawer is collapsed
  maxHeight: string; // Height when drawer is expanded
  isExpanded: boolean; // Current expansion state
  setIsExpanded: (expanded: boolean) => void; // Function to update expansion state
  isAnimating?: boolean; // Whether the drawer is currently animating
  setIsAnimating?: (animating: boolean) => void; // Function to update animation state
}

/**
 * DrawerHandle component renders the handle at the top of the drawer
 * that users can interact with to expand or collapse the drawer
 */
export const DrawerHandle = ({ isExpanded }: { isExpanded: boolean }) => {
  const handleRef = useRef<HTMLDivElement>(null);
  // Add a subtle pulse animation when the page loads to draw attention to the drawer
  useEffect(() => {
    if (handleRef.current) {
      gsap.to(handleRef.current, {
        y: 3,
        duration: 0.5,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2, // Wait for initial page load
      });
    }
  }, []);
  return (
    <div className="w-full py-4 text-center z-50">
      {/* Top handle with arrows and text */}
      <div
        ref={handleRef}
        className="absolute rounded-t-xs top-0 w-full py-0.5 flex flex-row items-center gap-4 justify-around pt-1 text-foreground/60 px-5"
      >
        <span
          className={cn(
            isExpanded ? "rotate-180" : "rotate-0",
            "transition-all",
            `duration-200`
          )}
        >
          {"^^^"}
        </span>
        <span>{isExpanded ? "close" : "open"}</span>
        <span
          className={cn(
            isExpanded ? "rotate-180" : "rotate-0",
            "transition-all",
            `duration-200`
          )}
        >
          {"^^^"}
        </span>
      </div>
      {/* <div className="w-12 h-1 rounded-full bg-foreground/40 mx-auto" /> */}

      {/* Vertical "FEATURES" text on the left side */}
      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "sideways",
        }}
        className={cn(
          "absolute transition-all flex flex-row gap-2 text-foreground/60 left-0.5 top-8 font-mono text-xs font-bold"
        )}
      >
        <span
          className={cn(
            isExpanded ? "opacity-0" : "opacity-100",
            "transition-all duration-200"
          )}
        >
          {"<<< "}
        </span>
        FEATURES
        <span
          className={cn(
            isExpanded ? "opacity-100" : "opacity-0",
            "transition-all duration-200"
          )}
        >
          {" >>>"}
        </span>
      </span>
    </div>
  );
};

/**
 * MobileDrawer component creates a draggable drawer that can be expanded or collapsed
 * to show additional content on mobile devices. It includes gesture handling for
 * drag interactions and prevents scroll conflicts with the main page.
 */
export const MobileDrawer = ({
  children,
  minHeight,
  maxHeight,
  isExpanded,
  setIsExpanded,
  isAnimating,
}: DrawerProps) => {
  const gsnap = useSnapshot(GuitarState);
  const height = isExpanded ? maxHeight : minHeight;
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  // Provide haptic feedback when interacting with the drawer (if supported)
  const triggerHapticFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  };

  /**
   * Handle the end of a drag gesture to determine whether to expand or collapse
   * the drawer based on the drag distance
   */
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    enableControllers(event);

    if (isAnimating) return;

    const threshold = 50; // pixels to determine expand/collapse
    if (info.offset.y < -threshold) {
      setIsExpanded(true);
    } else if (info.offset.y > threshold) {
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="mt-auto overflow-hidden pointer-events-auto cursor-auto mx-10 absolute bottom-0 overscroll-contain"
      initial={false}
      animate={{
        height: isExpanded ? maxHeight : minHeight,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className="w-full h-full rounded-t-2xl bg-background/90 dark:bg-background/60 backdrop-blur-3xl border-t-2 border-x-2 overscroll-contain border-foreground/10 cursor-grab active:cursor-grabbing flex flex-col px-1"
        drag="y"
        dragControls={dragControls}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onDragStart={(e) => {
          // Disable page scrolling while dragging
          disableControllers(e);
        }}
        onTap={() => {
          // Toggle drawer state on tap and provide haptic feedback
          triggerHapticFeedback();
          setIsExpanded(!isExpanded);
        }}
        onPointerDown={(e) => {
          disableControllers(e);
          dragControls.start(e);
        }}
        onPointerUp={(e) => {
          enableControllers();
        }}
      >
        {/* Drawer handle for user interaction */}
        <DrawerHandle isExpanded={isExpanded} />

        {/* Content container with scroll handling */}
        <div
          className="mx-4 flex-1 pb-4 inline-block cursor-auto overflow-y-auto rounded-t-lg bg-background"
          style={{
            height: `calc(${height} - 3rem)`,
            overscrollBehavior: "contain",
          }}
          onWheelCapture={(e) => e.stopPropagation()}
          onPointerDownCapture={(e) => {
            disableControllers(e);
          }}
          onPointerUpCapture={(e) => {
            enableControllers(e);
          }}
          onTouchStartCapture={(e) => {
            // Allow default touch behavior for scrolling
            e.stopPropagation();
          }}
          onTouchMoveCapture={(e) => {
            // Allow the default scrolling behavior
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
