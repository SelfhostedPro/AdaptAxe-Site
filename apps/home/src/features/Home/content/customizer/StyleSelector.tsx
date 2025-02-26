import { useGuitar } from "@/components/providers/GuitarProvider";
import { OFFPAGE_DISTANCE } from "@/constants";
import { GuitarState } from "@/store/guitar";
import { useSnapshot } from "valtio";
import gsap from "gsap";

/**
 * StyleSelector component allows users to select different guitar styles.
 * When a new style is selected, it animates the guitar parts off-screen,
 * changes the style, and then animates them back in.
 */
export function StyleSelector() {
  const { refs } = useGuitar();
  const gsnap = useSnapshot(GuitarState);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-center text-foreground/80">Style</span>
      {/* Render buttons for each available style */}
      {gsnap.styles.map((style) => (
        <div
          key={style}
          style={{
            // Highlight the currently selected style
            color: gsnap.style === style ? gsnap.primary : "#000",
            backgroundColor: gsnap.style === style ? gsnap.secondary : "#FFF",
          }}
          className="cursor-pointer px-2 text-center rounded-full border border-neutral-100 transition-colors duration-200"
          onClick={() => {
            if (gsnap.style !== style)
              // Animate the guitar parts off-screen, change the style, then animate back
              gsap
                .timeline()
                .to(
                  [
                    refs.leftRef.current.position,
                    refs.rightRef.current.position,
                  ],
                  {
                    z: -OFFPAGE_DISTANCE,
                    onComplete: () => {
                      GuitarState.style = style;
                    },
                  }
                )
                .to(
                  [
                    refs.leftRef.current.position,
                    refs.rightRef.current.position,
                  ],
                  { z: 0, delay: 0.2 },
                  ">"
                );
          }}
        >
          {style}
        </div>
      ))}
    </div>
  );
}
