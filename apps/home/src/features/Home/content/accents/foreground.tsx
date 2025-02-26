"use client";
import { GuitarState } from "@/store/guitar";
import { cn } from "@workspace/ui/lib/utils";
import { useSnapshot } from "valtio";

// Component for rendering stylized title text with accent styling
export function TitleAccent({
  text, // The text content to display
  className, // Additional CSS classes to apply
}: {
  text: string;
  className: string;
}) {
  // Get current state from guitar store
  const gsnap = useSnapshot(GuitarState);

  return (
    // Container with relative positioning and bottom padding
    <div className="relative pb-2 w-fit">
      {/* Inner container with horizontal padding that scales with viewport */}
      <div className={cn("px-4 md:px-8", "relative overflow-visible")}>
        {/* Title text span with responsive sizing and styling */}
        <span
          className={cn(
            // Base styles for large, bold, uppercase text that scales with viewport
            `ml-2 block text-[4.5rem] sm:text-[5.7rem] md:text-[7rem] md:text-nowrap font-black tracking-[0.02em] leading-[0.85] relative uppercase antialiased`,
            className
          )}
          style={{
            // Apply dynamic primary color from guitar state
            color: gsnap.primary,
            // Add subtle layered shadow effect
            textShadow: `
            0 2px 6px rgba(0,0,0,0.15),
            0 4px 12px rgba(0,0,0,0.1)
          `,
          }}
          data-text={text}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
