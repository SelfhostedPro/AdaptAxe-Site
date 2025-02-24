"use client";
import { useSnapshot } from "valtio/react";
import { GuitarState } from "@/store/guitar";
import { UIState } from "@/store/ui";
import { useSections } from "../sections";
import { CircleDot } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { ExploreAnimations } from "../../animations/timeline";
import { useGuitar } from "@/components/providers/GuitarProvider";
import { Socials } from "@/components/Links";
import { TitleAccent } from "../accents/foreground";
import { useState } from "react";
import { Feature } from "../sections";
import { useBreakpoints } from "@/hooks/use-media-query";
import { MobileDrawer } from "./MobileDrawer";

const FeatureItemContainer = ({
  children,
  feature,
}: {
  children: React.ReactNode;
  feature: Feature;
}) => {
  return feature.href ? (
    <a
      draggable={false}
      href={feature.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex rounded-none pointer-events-auto w-full pr-2 cursor-pointer hover:bg-foreground/5 transition-all duration-200 ease-out hover:scale-[1.02] origin-left"
    >
      {children}
    </a>
  ) : (
    <div
      className={cn(
        "group relative flex rounded-none pointer-events-auto w-full px-2 md:px-0 md:pr-2",
        (feature.onClick || feature.onPointerEnter || feature.onPointerLeave) &&
          "cursor-pointer hover:bg-foreground/5 transition-all duration-200 ease-out hover:scale-[1.02] origin-left"
      )}
      onClick={() => feature.onClick?.()}
      onPointerEnter={() => feature.onPointerEnter?.()}
      onPointerLeave={() => feature.onPointerLeave?.()}
    >
      {children}
    </div>
  );
};

const FeatureItem = ({ feature }: { feature: Feature }) => {
  const gsnap = useSnapshot(GuitarState);

  return (
    <FeatureItemContainer feature={feature}>
      <div
        className="w-[2px] mr-2 self-stretch shrink-0"
        style={{ background: gsnap.primary }}
      />

      <div className="lg:space-y-1 w-full">
        <h4
          className="text-lg font-bold uppercase tracking-wider"
          style={{ color: gsnap.primary }}
        >
          <span className="flex flex-row font-mono items-center gap-1 justify-baseline select-none">
            {feature.name}
            {(feature.onClick || feature.href) && (
              <CircleDot className="size-4 antialiased" />
            )}
          </span>
        </h4>
        <p
          className={cn(
            "md:max-w-[93%] text-sm font-mono leading-relaxed text-foreground/70",
            feature.href ? "select-text" : ""
          )}
        >
          {feature.description}
        </p>
      </div>
    </FeatureItemContainer>
  );
};

const SectionContainer = ({
  section,
  index,
}: {
  section: ReturnType<typeof useSections>[number];
  index: number;
}) => {
  const { mobile } = useBreakpoints();
  const gsnap = useSnapshot(GuitarState);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Wrap feature onClick just to handle the container state
  const wrapFeatureClick = (feature: Feature) => {
    return () => {
      if (!mobile || !feature.onClick || isAnimating) return;

      setIsAnimating(true);
      setIsExpanded(false);

      // Modified onClick that takes a callback
      feature.onClick(() => {
        setIsExpanded(true);
        setIsAnimating(false);
      });
    };
  };

  return (
    <div
      className={`h-dvh w-screen relative isolate section ${section.class}-section shrink-0 overflow-hidden max-w-screen absolute left-${index * 100}`}
    >
      {/* Content layer */}
      <div
        className={`${section.class}-card relative z-10 h-dvh min-w-[45vw] flex flex-col pt-10 md:pb-16`}
      >
        {/* Content container */}
        <div
          className={cn(
            "h-full flex flex-col px-0 md:px-4 justify-between md:justify-stretch w-full md:w-[45%]"
          )}
        >
          {/* Header area */}
          <div className="max-w-full md:max-w-[90%] mb-2">
            {/* Title with accent */}
            <TitleAccent
              text={section.title}
              className={`${section.class}-title `}
            />

            {/* Description */}
            {!mobile && (
              <div className="max-w-[80%] md:max-w-[90%] text-sm px-4 md:text-lg font-medium text-foreground/80 leading-relaxed font-mono mt-1 md:mt-2 ml-8 md:ml-16">
                {section.content}
              </div>
            )}
          </div>

          {/* Draggable Features Container */}
          {mobile ? (
            <MobileDrawer
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              minHeight="15dvh"
              maxHeight="70dvh"
            >
              <div className="space-y-4">
                <div className="px-2 text-foreground/70 text-center w-full py-4">
                  <div
                    className="w-[2px] mr-2 self-stretch shrink-0"
                    style={{ background: gsnap.primary }}
                  />
                  {section.content}
                </div>
                {section.features?.map((feature) => (
                  <FeatureItem
                    key={feature.name}
                    feature={{
                      ...feature,
                      onClick: feature.onClick
                        ? wrapFeatureClick(feature)
                        : undefined,
                    }}
                  />
                ))}
              </div>
            </MobileDrawer>
          ) : (
            // Desktop layout remains unchanged
            <div className="flex flex-col ml-8 justify-end h-full md:ml-16 space-y-2 md:space-y-4">
              {section.features?.map((feature) => (
                <FeatureItem key={feature.name} feature={feature} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export function Overlay() {
  const { refs } = useGuitar();
  const gsnap = useSnapshot(GuitarState);
  const usnap = useSnapshot(UIState);
  const sections = useSections({ refs });

  return (
    <>
      <div
        style={{
          color: gsnap.primary,
          display: usnap.display ? "none" : "unset",
        }}
        className="absolute h-dvh w-screen pointer-events-none z-0 transition-colors duration-200"
      >
        <div
          className={cn(
            "scroll-container",
            "flex flex-row relative h-full w-full"
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
