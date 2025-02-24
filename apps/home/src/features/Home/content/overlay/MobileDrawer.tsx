import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { cn } from "@workspace/ui/lib/utils";

interface DrawerProps {
  children: React.ReactNode;
  minHeight: string;
  maxHeight: string;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isAnimating?: boolean;
  setIsAnimating?: (animating: boolean) => void;
}

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
      className="mt-auto pointer-events-auto cursor-auto mx-10"
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
        className="w-full h-full rounded-t-2xl bg-background/40 backdrop-blur-lg"
        drag="y"
        dragControls={dragControls}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onTap={() => setIsExpanded(!isExpanded)}
      >
        {/* Handle area */}
        <div
          className="w-full px-4 py-4 text-center cursor-grab active:cursor-grabbing z-50"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="w-12 h-1 rounded-full bg-foreground/40 mx-auto" />
          <span
            style={{
              writingMode: "vertical-lr",
              textOrientation: "sideways",
            }}
            className={cn(
              "absolute transition-all flex flex-row gap-2 text-foreground/40 left-0 top-5 font-mono text-xs font-bold"
            )}
          >
            <span
              className={cn(
                isExpanded ? "opacity-100" : "opacity-0",
                "transition-all duration-100"
              )}
            >
              {"<<< "}
            </span>
            FEATURES
            <span
              className={cn(
                isExpanded ? "opacity-0" : "opacity-100",
                "transition-all duration-100"
              )}
            >
              {" >>>"}
            </span>
          </span>
        </div>
        {/* Content area */}
        <div
          className="px-5 overflow-y-auto"
          style={{
            height: `calc(${height} - 3rem)`,
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
