import { useSnapshot } from "valtio/react";
import { GuitarState } from "@/store/guitar";
import { UIState } from "@/store/ui";
import { useSections } from "./sections";
import { LucideIcon, CircleDot } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { ExploreAnimations } from "../animations/timeline";
import { useGuitar } from "@/components/providers/GuitarProvider";
import { Socials } from "@/components/Links";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

interface FeatureType {
  name: string;
  description: string;
  icon?: LucideIcon;
  onClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  href?: string;
}

const FeatureItem = ({ feature }: { feature: FeatureType }) => {
  const gsnap = useSnapshot(GuitarState);

  return (
    <div
      className={cn(
        "group relative flex rounded-none pointer-events-auto w-full pr-2",
        (feature.onClick || feature.onPointerEnter || feature.onPointerLeave) &&
          "cursor-pointer hover:bg-foreground/5 transition-all duration-200 ease-out hover:scale-[1.02] origin-left"
      )}
      onClick={() => feature.onClick?.()}
      onPointerEnter={() => feature.onPointerEnter?.()}
      onPointerLeave={() => feature.onPointerLeave?.()}
    >
      <div
        className="w-[2px] mr-2 self-stretch shrink-0"
        style={{ background: gsnap.primary }}
      />

      <div className="space-y-1 w-full">
        <h4
          className="text-lg font-bold uppercase tracking-wider"
          style={{ color: gsnap.primary }}
        >
          <span className="flex flex-row font-mono items-center gap-1 justify-baseline">
            {feature.name}
            {feature.onClick && <CircleDot className="size-4 antialiased" />}
          </span>
        </h4>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const SectionContainer = ({
  section,
  index,
}: {
  section: ReturnType<typeof useSections>[number];
  index: number;
}) => {
  const gsnap = useSnapshot(GuitarState);

  return (
    <div
      className={`w-screen h-screen relative isolate section ${section.class}-section shrink-0 overflow-hidden max-w-screen`}
    >
      {/* Content layer */}
      <div
        className={`${section.class}-card content relative z-10 h-screen flex flex-col pt-10 pb-16 ml-16`}
      >
        {/* Content container */}
        <div className="w-[45%] h-full justify-between flex flex-col">
          {/* Header area */}
          <div className="max-w-[90%] mb-8">
            {/* Title with accent */}
            <div className="relative flex pb-2">
              <span
                className={`
                  ${section.class}-title 
                  block text-[4.5rem] md:text-[6rem] text-nowrap
                  font-black tracking-tight leading-[0.9] antialiased
                  uppercase
                `}
                style={{ color: gsnap.primary }}
              >
                <div
                  className="absolute left-0 bottom-0 w-[90%] h-[4px]"
                  style={{ background: gsnap.primary }}
                />
                {section.title}
              </span>
            </div>

            {/* Description */}
            <p className="max-w-[90%] text-base pl-1 md:text-lg font-medium text-foreground/70 leading-relaxed font-mono mt-5">
              {section.content}
            </p>
          </div>

          {/* Features container */}
          <div className="max-w-[80%] flex flex-col justify-center">
            <div className="space-y-8">
              {section.features?.map((feature) => (
                <FeatureItem key={feature.name} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export function Underlay() {
  const { refs } = useGuitar();
  const gsnap = useSnapshot(GuitarState);
  const usnap = useSnapshot(UIState);
  const sections = useSections({ refs });

  // const handleScroll = useCallback(() => {

  // },[]);

  // useEffect(() => {
  //   if (!refs.containerRef.current) return
  //   const el = refs.containerRef.current;
  //   if (el) el.addEventListener("scroll", handleScroll);
  //   return () => {
  //     el?.removeEventListener("scroll", handleScroll);
  //   };
  // }, [refs.containerRef.current, ]);

  return (
    <>
      <div
        style={{
          color: gsnap.primary,
          display: usnap.display ? "none" : "unset",
        }}
        className="absolute h-full pointer-events-none z-0 transition-colors duration-200"
      >
        <div
          className={cn(
            "scontainer",
            // `h-[${sections.length * 100}]`,
            "flex flex-nowrap overflow-x-hidden max-w-screen"
          )}
        >
          {sections.map((section, index) => (
              <SectionContainer
                key={section.class}
                section={section}
                index={index}
              />
          ))}
        </div>
        <ExploreAnimations refs={refs} />
      </div>
      <div className="flex fixed gap-2 left-15 top-2 rounded-none items-center z-10">
        <Socials
          home
          text
          className={cn(
            "text-xs text-foreground/70 uppercase p-1.5 font-mono pointer-events-auto hover:backdrop-blur-xs hover:bg-primary/20 transition-colors duration-200"
          )}
        />
      </div>
    </>
  );
}
