"use client";
import { SpinningText } from "@/components/ui/SpinningText";
import { GuitarState } from "@/store/guitar";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

export function TextAccents() {
  const snap = useSnapshot(GuitarState);
  const leftMarqueeRef = useRef<HTMLDivElement>(null);
  const rightMarqueeRef = useRef<HTMLDivElement>(null);
  const currentSpeedRef = useRef(40); // Track current speed

  // Set up scroll velocity effect
  useEffect(() => {
    const updateSpeed = (velocity: number) => {
      const baseSpeed = 50; // Base animation duration in seconds
      const minDuration = 2; // Minimum animation duration
      const targetSpeed = Math.max(
        minDuration,
        baseSpeed - Math.abs(velocity) * 20
      );

      // Smooth interpolation
      currentSpeedRef.current = gsap.utils.interpolate(
        currentSpeedRef.current,
        targetSpeed,
        0.1 // Adjust this value to control deceleration speed (0-1)
      );

      if (leftMarqueeRef.current) {
        leftMarqueeRef.current.style.animationDuration = `${currentSpeedRef.current}s`;
      }
      if (rightMarqueeRef.current) {
        rightMarqueeRef.current.style.animationDuration = `${currentSpeedRef.current}s`;
      }
    };

    // Subscribe to scroll velocity
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
      {/* Grid overlay */}
      {/* Vertical lines */}
      <div className="absolute inset-0 flex justify-between">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`v-${i}`} className="h-full w-[1px] bg-foreground/5" />
        ))}
      </div>

      {/* Horizontal lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`h-${i}`} className="w-full h-[1px] bg-foreground/5" />
        ))}
      </div>

      {/* Dynamic color strip accents */}
      <div
        className="absolute top-0 left-0 w-1 h-32 transition-colors duration-200 z-10"
        style={{ background: snap.primary }}
      />
      <div
        className="absolute top-0 right-0 w-32 h-1 transition-colors duration-200 z-10"
        style={{ background: snap.primary }}
      />
      <div
        className="absolute bottom-0 left-0 w-1 h-32 transition-colors duration-200 z-10"
        style={{ background: snap.primary }}
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-1 transition-colors duration-200 z-10"
        style={{ background: snap.primary }}
      />

      {/* Colored Text Accents */}

      {/* White Text Accents */}
      {/* TOP */}
      <div className="absolute flex flex-row top-0 h-screen left-8 gap-8 text-xs font-mono text-foreground/40 items-center justify-center [writing-mode:sideways-lr]">
        <div className="flex-1 w-[1px] bg-foreground/40" />
        <span>PATENT:PENDING</span>
        <div className="h-[30%] w-[1px] bg-foreground/40" />
        <span>
          STATUS:
          <span
            className="transition-colors duration-200"
            style={{ color: snap.primary }}
          >
            CLASSIFIED
          </span>
        </span>
        <div className="flex-1 w-[1px] bg-foreground/40" />
      </div>

      {/* Left Marquee */}
      <div className="absolute left-1 top-0 bottom-0 border-r-[0.1px] border-foreground/40 flex h-screen overflow-hidden pointer-events-none">
        <div
          className="animate-marquee-up flex flex-col gap-8 py-4"
          ref={leftMarqueeRef}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-8">
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr]">
                2K25///RNG
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr]">
                SIGNAL:CLEAR
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr]">
                PATENT:PENDING
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr]">
                LONG:74.0060°W
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr]">
                TEMP:22.5°C
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-lr]">
                MODE:
                <span
                  className="transition-colors duration-200"
                  style={{ color: snap.primary, opacity: 40 }}
                >
                  ACTIVE
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      {/* Right Marquee */}
      <div className="absolute right-1 border-l-[0.1px] border-foreground/40 top-0 bottom-0 flex h-screen overflow-hidden pointer-events-none">
        <div
          className="animate-marquee-down flex flex-col gap-8 py-4"
          ref={rightMarqueeRef}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-8">
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl]">
                C-E8_DIST///INCT
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl]">
                LAT:40.7128°N
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl]">
                PATENT:PENDING
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl]">
                ALT:128M
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl]">
                HUM:65%
              </span>
              <span className="text-xs font-mono text-foreground/40 [writing-mode:sideways-rl]">
                SYS:
                <span style={{ color: snap.primary, opacity: 0.4 }}>
                  NOMINAL
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
