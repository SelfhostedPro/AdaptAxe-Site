"use client";
import { GuitarState } from "@/store/guitar";
import { cn } from "@workspace/ui/lib/utils";
import { useSnapshot } from "valtio";

export function TitleAccent({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const gsnap = useSnapshot(GuitarState);

  return (
    <div className="relative pb-2 w-fit">
      <div className={cn("px-4 md:px-8", "relative overflow-visible")}>
        <span
          className={cn(
            `ml-2 block text-[4.5rem] sm:text-[5.7rem] md:text-[7rem] md:text-nowrap font-black tracking-[0.02em] leading-[0.85] relative uppercase antialiased`,
            className
          )}
          style={{
            color: gsnap.primary,
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
