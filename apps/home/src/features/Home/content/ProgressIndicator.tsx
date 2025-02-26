"use client";
import { useBreakpoints } from "@/hooks/use-media-query";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

/**
 * ProgressIndicator component displays the current section number and a progress bar
 * showing how far the user has navigated through the content.
 * 
 * @param currentSection - Zero-based index of the current section
 * @param totalSections - Total number of sections available
 */
export function ProgressIndicator({
  currentSection,
  totalSections,
}: {
  currentSection: number;
  totalSections: number;
}) {
  // State to track whether the progress bar is expanded (mobile only)
  const [isExpanded, setIsExpanded] = useState(false);
  const { mobile } = useBreakpoints();

  return (
    <div
      onClick={() => {
        // Toggle expanded state and auto-collapse after delay on mobile
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
          // Only set timeout when expanding
          setTimeout(() => setIsExpanded(false), 1500);
        }
      }}
      className={cn(
        mobile ? "top-[20vh] right-6" : "bottom-4 right-4",
        "cursor-pointer fixed  z-30 flex items-center space-x-4 bg-background/60 backdrop-blur-md rounded-full px-2 py-1"
      )}
    >
      {/* Section counter display (e.g., "01 / 08") */}
      <div className="text-md font-mono">
        <span className="text-foreground">
          {(currentSection + 1).toString().padStart(2, "0")}
        </span>
        <span className="text-foreground/40">
          {" "}
          / {totalSections.toString().padStart(2, "0")}
        </span>
      </div>
      
      {/* Progress bar - conditionally shown on mobile, always visible on desktop */}
      {mobile ? (
        <div
          className={cn(
            isExpanded ? "w-32" : "w-0",
            "h-[2px] rounded-full bg-foreground/20  transition-all duration-200"
          )}
        >
          <div
            className="h-full bg-foreground rounded-full transition-all duration-300"
            style={{
              width: `${((currentSection + 1) / totalSections) * 100}%`,
            }}
          />
        </div>
      ) : (
        <div className="w-32 h-[2px] rounded-full bg-foreground/20">
          <div
            className="h-full bg-foreground rounded-full transition-all duration-300"
            style={{
              width: `${((currentSection + 1) / totalSections) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
