import { GuitarState } from "@/store/guitar";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

/**
 * ColorPicker component allows users to select colors for the guitar.
 * 
 * @param colors - Array of color options to display
 * @param label - Label for the color picker (P for Primary, S for Secondary)
 * @param stateKey - Which color property to update in the GuitarState ("primary" or "secondary")
 */
export function ColorPicker({
  colors,
  label,
  stateKey,
}: {
  colors: readonly string[];
  label: string;
  stateKey: "primary" | "secondary";
}) {
  const gsnap = useSnapshot(GuitarState);

  // Animate color transitions when primary or secondary colors change
  useEffect(() => {
    gsap.to(GuitarState, {
      animatePrimary: gsnap.primary,
      animateSecondary: gsnap.secondary,
      duration: 0.5,
    });
  }, [gsnap.primary, gsnap.secondary]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <span className="text-foreground/80">{label}</span>
      {/* Render color swatches for each available color */}
      {colors.map((color) => (
        <div
          key={color}
          className="cursor-pointer size-10 rounded-full border border-neutral-100"
          style={{ background: color }}
          onClick={() => (GuitarState[stateKey] = color)}
        />
      ))}
    </div>
  );
}
