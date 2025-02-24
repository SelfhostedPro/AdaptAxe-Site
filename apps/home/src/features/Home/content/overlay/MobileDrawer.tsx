import { useRef } from "react";
import { motion, PanInfo, useDragControls } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useSnapshot } from "valtio";
import { GuitarState } from "@/store/guitar";
gsap.registerPlugin(ScrollTrigger, Observer);
interface DrawerProps {
  children: React.ReactNode;
  minHeight: string;
  maxHeight: string;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isAnimating?: boolean;
  setIsAnimating?: (animating: boolean) => void;
}

export const DrawerHandle = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <div className="w-full py-4 text-center z-50">
      <div className="absolute rounded-t-xs top-0 w-full py-0.5 flex flex-row items-center gap-4 justify-around pt-1 text-foreground/60 px-5">
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

  const disableControllers = (
    e?: React.PointerEvent<HTMLElement> | PointerEvent | MouseEvent | TouchEvent
  ) => {
    e?.stopPropagation();
    ScrollTrigger.getById("container")?.disable(false, false);
    Observer.getById("ios-observe")?.disable();
  };
  const enableControllers = (
    e?: React.PointerEvent<HTMLElement> | PointerEvent | MouseEvent | TouchEvent
  ) => {
    e?.stopPropagation();
    ScrollTrigger.getById("container")?.enable(false, false);
    Observer.getById("ios-observe")?.enable();
  };

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
        className="w-full h-full rounded-t-2xl bg-background/40 border-t-2 border-x-2 overscroll-contain border-foreground/10 cursor-grab backdrop-blur-3xl active:cursor-grabbing flex flex-col px-1"
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
          disableControllers(e);
        }}
        onTap={() => setIsExpanded(!isExpanded)}
        onPointerDown={(e) => {
          disableControllers(e);
          dragControls.start(e);
        }}
        onPointerUp={(e) => {
          enableControllers();
        }}
      >
        <DrawerHandle isExpanded={isExpanded} />
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
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
