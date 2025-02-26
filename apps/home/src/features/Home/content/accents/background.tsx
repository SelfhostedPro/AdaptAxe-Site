"use client";
import { GuitarState } from "@/store/guitar";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useBreakpoints } from "@/hooks/use-media-query";
import { cn } from "@workspace/ui/lib/utils";
gsap.registerPlugin(ScrollTrigger);

// Component that shows a scroll/swipe indicator that fades after user activity
const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { mobile } = useBreakpoints();

  useEffect(() => {
    // Hide indicator on user activity and show again after delay
    const handleActivity = () => {
      setIsVisible(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(true), 3000);
    };

    // Listen for various user interaction events
    const events = ["mousemove", "scroll", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, handleActivity));
    handleActivity(); // Initial setup

    // Cleanup event listeners
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        mobile ? "right-6 bottom-2" : "left-12 bottom-2",
        "fixed animate-bounce z-50 "
      )}
      style={{
        animation: "bounce 3.5s ease-in-out infinite",
      }}
    >
      <div
        style={{
          animation: "wipe-from-center 0.3s linear forwards",
          opacity: 0,
          writingMode: "vertical-rl",
          textOrientation: "sideways",
        }}
        className="transition-all font-mono text-foreground/70 text-xs"
      >
        {mobile ? "SWIPE" : "SCROLL"} DOWN {">>>"}
      </div>
    </div>
  );
};
export function TextAccents() {
  const snap = useSnapshot(GuitarState);
  const leftMarqueeRef = useRef<HTMLDivElement>(null);
  const rightMarqueeRef = useRef<HTMLDivElement>(null);
  const currentSpeedRef = useRef(40); // Track current speed for marquee animation

  // Common styles for vertical text orientation
  const leftAccentStyle = {
    writingMode: "vertical-lr",
    textOrientation: "sideways",
  } as CSSProperties;
  const rightAccentStyle = {
    writingMode: "vertical-rl",
    textOrientation: "sideways",
  } as CSSProperties;

  // Component for left side decorative text
  const LeftAccents = () => (
    <div className="flex flex-col gap-8">
      <span
        style={leftAccentStyle}
        className="text-xs font-mono text-foreground/40"
      >
        2K25 //EST
      </span>
      <span
        style={leftAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr] [text-orientation: sideways]"
      >
        MODULARITY:FULL
      </span>
      <span
        style={leftAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr] [text-orientation: sideways]"
      >
        PATENT:PENDING
      </span>
      <span
        style={leftAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr] [text-orientation: sideways]"
      >
        SWAP_TIME:SEC
      </span>
      <span
        style={leftAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr] [text-orientation: sideways]"
      >
        TEMP:UNKNOWN
      </span>
      <span
        style={leftAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr] [text-orientation: sideways]"
      >
        MODE:
        <span style={{ color: snap.animatePrimary, opacity: 40 }} className="uppercase">
          {snap.style}
        </span>
      </span>
    </div>
  );

  // Component for right side decorative text
  const RightAccents = () => (
    <div className="flex flex-col gap-8">
      <span
        style={rightAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl] [text-orientation: sideways]"
      >
        UN1Q //UE
      </span>
      <span
        style={rightAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl] [text-orientation: sideways]"
      >
        PKUP_CFG:HOT_SWAP
      </span>
      <span
        style={rightAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl] [text-orientation: sideways]"
      >
        PATENT:PENDING
      </span>
      <span
        style={rightAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl] [text-orientation: sideways]"
      >
        RODS:CRBN
      </span>
      <span
        style={rightAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl] [text-orientation: sideways]"
      >
        HUM:UNKNOWN
      </span>
      <span
        style={rightAccentStyle}
        className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl] [text-orientation: sideways]"
      >
        SYS:
        <span style={{ color: snap.animatePrimary, opacity: 0.4 }}>
          NOMINAL
        </span>
      </span>
    </div>
  );

  // Component for additional left side accents with divider lines
  const LeftSubAccents = () => (
    <>
      <div className="flex-1 w-[1px] bg-foreground/40" />
      <span>PATENT:PENDING</span>
      <div className="h-[30%] w-[1px] bg-foreground/40" />
      <span>
        STATUS:
        <span
          className="transition-colors duration-200"
          style={{ color: "firebrick" }}
        >
          CLASSIFIED
        </span>
      </span>

      <div className="flex-1 w-[1px] bg-foreground/40" />
    </>
  );

  // Component for grid background (currently commented out)
  const Grid = () => (
    <>
      {/* <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
        {Array.from({ length: 4 }).map((_, gridIndex) => (
          <div
            key={`grid-${gridIndex}`}
            className="absolute inset-0 flex justify-between"
            style={{
              transform: `rotate(${gridIndex * 30}deg)`,
              animationDelay: `${-((12 - gridIndex) * 0.5)}s`,
              // animation: `vortex-spin 10s linear infinite`,
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className={`h-[200%] w-[1px] bg-foreground/10`}
                style={{
                  animation: `line-shadow 10s ease-in-out infinite`,
                  animationDelay: `${-((12 - i) * 0.5)}s`,
                  transform: `translateY(-25%)`, // Centers the extended lines
                }}
              />
            ))}
          </div>
        ))}
      </div> */}

      {/* Horizontal lines */}
      {/* <div className="absolute inset-0 flex flex-col justify-between grid-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="w-full h-[1px] bg-foreground/10"
            style={{
              animation: `grid-float-y ${50 / i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div> */}
    </>
  );

  // Effect to handle scroll velocity-based marquee speed
  useEffect(() => {
    const updateSpeed = (velocity: number) => {
      const baseSpeed = 100; // Base animation duration in seconds
      const minDuration = 20; // Minimum animation duration
      const targetSpeed = Math.max(
        minDuration,
        baseSpeed - Math.abs(velocity) * 20
      );

      // Smooth interpolation between current and target speed
      currentSpeedRef.current = gsap.utils.interpolate(
        currentSpeedRef.current,
        targetSpeed,
        0.1 // Interpolation factor
      );

      // Update animation duration for both marquees
      if (leftMarqueeRef.current) {
        leftMarqueeRef.current.style.animationDuration = `${Math.abs(currentSpeedRef.current)}s`;
      }
      if (rightMarqueeRef.current) {
        rightMarqueeRef.current.style.animationDuration = `${Math.abs(currentSpeedRef.current)}s`;
      }
    };

    // Set up scroll velocity observer
    const trigger = ScrollTrigger.observe({
      type: "wheel,touch,scroll",
      onChange: (self) => {
        updateSpeed(
          Math.abs((Math.abs(self.velocityX) + Math.abs(self.velocityY)) / 1000)
        );
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      {/* Background grid */}
      <Grid />

      {/* Corner accent strips */}
      <div
        className="absolute top-0 left-0 w-1 h-32 z-20"
        style={{ background: snap.animatePrimary }}
      />
      <div
        className="absolute top-0 right-0 w-32 h-1 z-20"
        style={{ background: snap.animatePrimary }}
      />
      <div
        className="absolute bottom-0 left-0 w-1 h-32 z-20"
        style={{ background: snap.animatePrimary }}
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-1 z-20"
        style={{ background: snap.animatePrimary }}
      />

      {/* Left side sub-accents with slide animation */}
      <div
        style={{
          animation: "slide-from-left 0.3s ease-out forwards",
          animationDelay: "1s",
          opacity: 0,
          ...leftAccentStyle,
        }}
        className="absolute flex flex-row top-0 h-dvh left-7 gap-4 text-xs font-mono text-foreground/40 items-center justify-center z-0"
      >
        <LeftSubAccents />
      </div>

      {/* Left side marquee */}
      <div
        style={{
          animation: "wipe-from-center 0.3s linear forwards",
          animationDelay: "0.3s",
          opacity: 0,
        }}
        className="absolute left-1 top-0 bottom-0 border-r-[0.1px] bg-background border-foreground/40 flex h-dvh overflow-hidden z-10"
      >
        <div
          className="animate-marquee-up flex flex-col gap-8 py-4"
          ref={leftMarqueeRef}
        >
          {[...Array(4)].map((_, i) => (
            <LeftAccents key={`${i}-right-accents`} />
          ))}
        </div>
      </div>

      {/* Right side marquee */}
      <div
        style={{
          animation: "wipe-from-center 0.3s linear forwards",
          animationDelay: "0.3s",
          opacity: 0,
        }}
        className="absolute right-1 border-l-[0.1px] bg-background border-foreground/40 top-0 bottom-0 flex h-dvh overflow-hidden z-10"
      >
        <div
          className="animate-marquee-down flex flex-col gap-8 py-4"
          ref={rightMarqueeRef}
        >
          {[...Array(4)].map((_, i) => (
            <RightAccents key={`${i}-right-accents`} />
          ))}
        </div>
      </div>

      {/* Scroll/swipe indicator */}
      <ScrollIndicator />
    </>
  );
}
