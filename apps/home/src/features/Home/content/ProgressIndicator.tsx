"use client";
import { useBreakpoints } from "@/hooks/use-media-query";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";

export function ProgressIndicator({
  currentSection,
  totalSections,
}: {
  currentSection: number;
  totalSections: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { mobile } = useBreakpoints();
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render mobile-specific content until after hydration
  if (!isMounted) {
    return null; // or a loading state
  }
  return (
    <div
      onClick={() => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
          // Only set timeout when expanding
          setTimeout(() => setIsExpanded(false), 1500);
        }
      }}
      className={cn(
        mobile ? "top-[25vh] right-6" : "bottom-4 right-4",
        "cursor-pointer fixed  z-30 flex items-center space-x-4 bg-background/60 backdrop-blur-md rounded-full px-2 py-1"
      )}
    >
      <div className="text-md font-mono">
        <span className="text-foreground">
          {(currentSection + 1).toString().padStart(2, "0")}
        </span>
        <span className="text-foreground/40">
          {" "}
          / {totalSections.toString().padStart(2, "0")}
        </span>
      </div>
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
