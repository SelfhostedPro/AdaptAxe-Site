import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { cn } from "@workspace/ui/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
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
    <div className="w-full  py-4 text-center z-50">
      <div className="absolute top-0 w-full py-0.5 flex flex-row items-center gap-4 justify-around pt-1 text-foreground/60 px-5">
        <span
          className={cn(
            isExpanded ? "rotate-180" : "rotate-0",
            "transition-all",
            `duration-100`
          )}
        >
          {"^^^"}
        </span>
        <span>{isExpanded ? "close" : "open"}</span>
        <span
          className={cn(
            isExpanded ? "rotate-180" : "rotate-0",
            "transition-all",
            `duration-100`
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
          "absolute transition-all flex flex-row gap-2 text-foreground/60 left-0 top-5 font-mono text-xs font-bold"
        )}
      >
        <span
          className={cn(
            isExpanded ? "opacity-0" : "opacity-100",
            "transition-all duration-100"
          )}
        >
          {"<<< "}
        </span>
        FEATURES
        <span
          className={cn(
            isExpanded ? "opacity-100" : "opacity-0",
            "transition-all duration-100"
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
  const height = isExpanded ? maxHeight : minHeight;
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any) => {
    ScrollTrigger.getById("container")?.enable();
    Observer.getById("ios-observe")?.enable();

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
      className="mt-auto overflow-hidden pointer-events-auto cursor-auto mx-10 absolute bottom-0"
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
        className="w-full h-full rounded-t-2xl bg-background/60 backdrop-blur-lg cursor-grab active:cursor-grabbing flex flex-col"
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
          e.stopPropagation();
          ScrollTrigger.getById("container")?.disable(false);
          Observer.getById("ios-observe")?.disable();
        }}
        onTap={() => setIsExpanded(!isExpanded)}
        onPointerDown={(e) => {
          e.stopPropagation();
          ScrollTrigger.getById("container")?.disable(false);
          Observer.getById("ios-observe")?.disable();

          dragControls.start(e);
        }}
        onPointerUp={(e) => {
          ScrollTrigger.getById("container")?.enable();
          Observer.getById("ios-observe")?.enable();
        }}
      >
        {/* Handle area */}
        <DrawerHandle isExpanded={isExpanded} />
        {/* Content area */}
        <div
          className="px-5 flex-1 inline-block overflow-y-auto"
          style={{
            height: `calc(${height} - 3rem)`,
            overscrollBehavior: "contain",
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
