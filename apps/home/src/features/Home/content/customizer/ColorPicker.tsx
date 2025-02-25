import { GuitarState } from "@/store/guitar";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

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

  useEffect(() => {
    gsap.to(GuitarState, {
      animatePrimary: gsnap.primary,
      animateSecondary: gsnap.secondary,
      duration: 0.5,
    });
  }, [gsnap.primary, gsnap.secondary]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <span>{label}</span>
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
