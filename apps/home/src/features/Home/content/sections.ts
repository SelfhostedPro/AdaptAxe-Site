"use client";
import { OFFPAGE_DISTANCE, PartType } from "@/constants";
import { useBreakpoints } from "@/hooks/use-media-query";
import gsap from "gsap";
import { Instagram, LucideIcon, Mail, NotebookPen, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export interface Feature {
  name: string;
  icon?: LucideIcon;
  description: string;
  href?: string;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: (callback?: () => void) => void;
}

export interface Section {
  title: string;
  class: PartType;
  content: string;
  features: Feature[];
}

interface SectionsProps {
  refs: ReturnType<typeof import("@/hooks/useGuitarRefs").useGuitarRefs>;
}

export function useSections({ refs }: SectionsProps) {
  const tl = useRef<GSAPTimeline>(null);
  const { mobile } = useBreakpoints();
  const timeline = () => {
    if (!tl.current) {
      tl.current = gsap.timeline();
    }
    return tl.current;
  };
  // Scale Factor for responsive animations
  const [sf, setSf] = useState(1); // Default scale factor

  useEffect(() => {
    // Calculate scale factor on client side
    setSf(Math.min(Math.max(window.innerWidth / 1260, 0.6), 1));
  }, []);
  const sections: Section[] = [
    {
      title: "AdaptAxe",
      class: "explore",
      content:
        "See how the AdaptAxe system works to provide a flexible platform while providing an incredibly solid and reliable experience.",
      features: [
        {
          name: "Limitless Customization",
          description:
            "Transform your sound and style in seconds without any tools. Swap out modules to craft your ideal instrument for any genre or performance",
        },
        {
          name: "Effortless Playability",
          description:
            "Customize the shape to your exact preferences for optimal comfort with a design that perfectly balances form and function for your unique playing style",
        },
        {
          name: "Unmatched Versatility",
          description:
            "Save money and space by buying one guitar and a collection of swappable modules instead of needing multiple instruments",
        },
        {
          name: "Constant Evolution",
          description:
            "Unleash your creativity with a guitar that evolves alongside your musical journey",
        },
      ],
    },
    {
      title: "Left Body",
      class: "left",
      content:
        "Customize your look and unlock innovative features with easily interchangeable components",
      features: [
        {
          name: "Seamless Interchangeability",
          description:
            "Experiment with different body shapes and sizes to find your perfect fit and style",
          onClick(callback) {
            refs.leftPlate.current &&
              timeline()
                .to(refs.leftPlate.current.position, { x: 0.5 })
                // Reset
                .to(
                  refs.leftPlate.current.position,
                  { x: 0, delay: 2, onComplete: () => callback?.() },
                  ">"
                );
          },
        },
        {
          name: "Intuitive Stability",
          description:
            "Single place to easily secure to the center frame for worry-free performance",
          onClick(callback) {
            if (!refs.leftRef.current || !refs.highlightRef.current) return;

            timeline()
              .to(refs.leftRef.current.rotation, { z: -2.2 })
              .to(refs.leftRef.current.position, { y: 8, x: 0 }, "<")
              .to(
                refs.highlightRef.current.position,
                {
                  x: mobile ? 0.5 : -1.29,
                  y: -0.18,
                  z: 10.3,
                },
                "<"
              )
              .to(
                refs.highlightRef.current.scale,
                { x: 0.15, z: 0.15, y: 0.15 },
                ">"
              )
              .to(refs.highlightMatRef.current, { opacity: 0.4 }, ">")

              //Reset
              .to(refs.highlightMatRef.current, { opacity: 0, delay: 2 }, ">")
              .to(refs.leftRef.current.rotation, { z: 0 })
              .to(
                refs.leftRef.current.position,
                { y: 0, x: mobile ? 0 : 1.5, onComplete: () => callback?.() },
                "<"
              );
          },
        },
        {
          name: "Intelligent Connectivity",
          description:
            "Cable channels in the center allow electronics to easily be embedded and connected throughout the instrument",
        },
      ],
    },
    {
      title: "Right Body",
      class: "right",
      content:
        "Experience familiar functionality with innovative modularity in a package that feels instantly comfortable",
      features: [
        {
          name: "Electronics Plate",
          description:
            "Change your electronics configuration with a swappable control plate that provides clean wiring and easy access",
          onClick(callback) {
            if (!refs.rightPlate.current) return;
            timeline()
              .to(refs.rightPlate.current.position, { y: 0.4 })
              .to(refs.rightPlate.current.position, { x: 0.5 }, ">")

              // Reset
              .to(
                refs.rightPlate.current.position,
                {
                  y: 0,
                  x: 0,
                  delay: 2,
                  onComplete: () => callback?.(),
                },
                ">"
              );
          },
        },
        {
          name: "Intuitive Stability",
          description:
            "Single place to easily secure to the center frame for worry-free performance",
          onClick(callback) {
            if (!refs.rightRef.current || !refs.highlightRef.current) return;

            timeline()
              .to(refs.rightRef.current.rotation, { z: 2.2 })
              .to(refs.rightRef.current.position, { y: 6, x: 0 }, "<")
              .to(
                refs.highlightRef.current.position,
                { x: mobile ? -0.4 : -1.89, y: mobile ? 0.25 : 0.14, z: 8.2 },
                ">"
              )
              .to(
                refs.highlightRef.current.scale,
                { x: 0.2, z: 0.2, y: 0.2 },
                "<"
              )
              .to(refs.highlightMatRef.current, { opacity: 0.4 }, "<")

              // Reset
              .to(refs.highlightMatRef.current, { opacity: 0, delay: 2 }, ">")
              .to(refs.rightRef.current.rotation, { z: 0 })
              .to(
                refs.rightRef.current.position,
                { y: 0, x: mobile ? -3 : -4, onComplete: () => callback?.() },
                "<"
              );
          },
        },
        {
          name: "Protection",
          description:
            "Optional sealed design prevents disassembly for demonstration or rental models while maintaining full functionality",
        },
      ],
    },
    {
      title: "Neck Block",
      class: "neck",
      content:
        "Revolutionary design enables tool-free neck changes while maintaining rock-solid stability and perfect alignment",
      features: [
        {
          name: "Seamless Interchangeability",
          description:
            "Innovative design uses string tension to lock the neck securely in place while allowing tool-free removal when needed",
          onClick(callback) {
            if (
              !refs.groupRef.current ||
              !refs.neckRef.current ||
              !refs.coreRef.current
            )
              return;
            timeline()
              .to(refs.groupRef.current.rotation, { z: Math.PI / 4 })
              .to(
                refs.groupRef.current.position,
                { y: -OFFPAGE_DISTANCE - 1 },
                "<"
              )
              .to(refs.neckRef.current.position, {
                x: 0,
                y: mobile ? 3 : 2,
                z: -OFFPAGE_DISTANCE + 0.2,
              })
              .to(refs.coreRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
              .to([refs.neckRef.current?.rotation], { x: -0.8 }, ">")
              .to(
                [refs.neckRef.current?.position],
                {
                  y: 4.7,
                  z: -OFFPAGE_DISTANCE - 1.1,
                },
                "<"
              )
              .to([refs.neckRef.current?.position], { y: 3 }, ">")
              .to([refs.neckRef.current?.rotation], { x: 0 }, "<")
              .to(
                [refs.neckRef.current.position],
                { z: -OFFPAGE_DISTANCE, y: 0 },
                "<"
              )

              // Reset
              .to([refs.neckRef.current?.rotation], { x: -0.7, delay: 2 }, ">")
              .to(
                [refs.neckRef.current?.position],
                {
                  y: 4.2,
                  z: -OFFPAGE_DISTANCE - 1.1,
                },
                "<"
              )
              .to([refs.neckRef.current?.rotation], { x: 0 }, ">")
              .to(
                [refs.neckRef.current?.position],
                { y: mobile ? 3.2 : 3.7, z: -OFFPAGE_DISTANCE },
                "<"
              )
              .to(refs.groupRef.current.rotation, { z: 0 }, ">")
              .to(refs.neckRef.current.rotation, { x: 0 }, "<")
              .to(refs.coreRef.current.position, { z: 0 }, "<")
              .to(
                refs.neckRef.current.position,
                { z: -OFFPAGE_DISTANCE / 1.2, y: 0 },
                ">"
              )
              .to(
                refs.groupRef.current.position,
                { y: -OFFPAGE_DISTANCE, onComplete: () => callback?.() },
                "<"
              );
          },
        },
        {
          name: "Alignment Tab",
          description: "Precision alignment ensures the neck sits perfectly level once rotated into position",
          onClick(callback) {
            if (
              !refs.highlightMatRef.current ||
              !refs.neckRef.current ||
              !refs.highlightRef.current
            )
              return;
            timeline()
              .to(refs.neckRef.current.rotation, {
                z: Math.PI,
                x: Math.PI / 1.8,
              })
              .to(
                refs.neckRef.current.position,
                { x: mobile ? 0 : -0.5, z: -OFFPAGE_DISTANCE - 1.4 },
                "<"
              )
              .to(
                refs.neckRef.current.scale,
                { x: 0.05, y: 0.05, z: 0.05 },
                "<"
              )
              .to(
                refs.highlightRef.current.position,
                { x: mobile ? 0 : -0.7 * sf, y: -0.4, z: 8 },
                "<"
              )
              .to(
                refs.highlightRef.current.scale,
                { x: 0.7, z: 0.2, y: 0.2 },
                "<"
              )
              .to(refs.highlightMatRef.current, { opacity: 0.3 }, ">")

              // Reset
              .to(refs.highlightMatRef.current, { opacity: 0, delay: 2 }, ">")
              .to(refs.neckRef.current.rotation, { z: 0, x: 0 }, ">")
              .to(
                refs.neckRef.current.position,
                { x: 0, z: -OFFPAGE_DISTANCE / 1.2 },
                "<"
              )
              .to(
                refs.neckRef.current.scale,
                {
                  x: 0.04,
                  y: 0.04,
                  z: 0.04,
                  onComplete: () => callback?.(),
                },
                "<"
              );
          },
        },
        {
          name: "Compatibility",
          description:
            "Universal mounting pattern accommodates a wide variety of back plates for maximum flexibility",
        },
      ],
    },
    {
      title: "Tone Modules",
      class: "pickup",
      content:
        "Achieve your ideal tone with endless options for pickups and accessories that can be swapped in moments",
      features: [
        {
          name: "Instant Tone Shaping",
          description:
            "Hotswap connectors let you swap pickups and electronics in second",
          onClick(callback) {
            if (
              !refs.pickup1.current ||
              !refs.pickup2.current ||
              !refs.pickup3.current
            )
              return;
            timeline()
              .to(refs.groupRef.current.position, { x: 2 })
              .to(refs.pickup1.current.position, { x: -4 }, "<")
              .to(refs.pickup3.current.position, { x: -4 }, "<33%")
              .to(refs.pickup1.current.position, { x: 0, delay: 2 }, ">")
              .to(refs.groupRef.current.position, { x: 0 }, "<")
              .to(
                refs.pickup3.current.position,
                { x: 0, onComplete: () => callback?.() },
                "<33%"
              );
          },
        },
        {
          name: "Get Creative",
          description:
            "Go beyond traditional pickups with slots for onboard effects, batteries, or any electronics you want integrated into your instrument",
          onClick(callback) {
            if (
              !refs.pickup1.current ||
              !refs.pickup2.current ||
              !refs.pickup3.current ||
              !refs.groupRef.current
            )
              return;
            timeline().to(refs.groupRef.current.position, { x: 2 }).to(
              refs.pickup2.current.position,
              {
                x: -4,
              },
              "<"
            );
            // Reset
            timeline()
              .to(
                refs.pickup2.current.position,
                { x: 0, delay: 2, onComplete: () => callback?.() },
                ">"
              )
              .to(refs.groupRef.current.position, { x: 0 }, "<");
          },
        },
        {
          name: "You've Got Options",
          description:
            "For maximum reliability, choose between hot-swappable connections or traditional hardwired electronics—the choice is yours",
          onClick(callback) {
            if (
              !refs.pickupRef.current ||
              !refs.pickup1.current ||
              !refs.pickup2.current ||
              !refs.pickup3.current
            )
              return;

            timeline()
              .to(refs.pickup1.current.position, { x: -4 }, ">")
              .to(refs.groupRef.current.position, { x: 2 }, "<")
              .to(refs.pickup2.current.position, { x: -4 }, "<33%")
              .to(refs.pickup3.current.position, { x: -4 }, "<33%")
              .to(refs.pickupRef.current.rotation, { x: -Math.PI }, ">")

              // Reset
              .to(refs.pickupRef.current.rotation, { x: 0, delay: 2 }, ">")
              .to(refs.pickup1.current.position, { x: 0 }, ">")
              .to(refs.groupRef.current.position, { x: 0 }, "<")
              .to(refs.pickup2.current.position, { x: 0 }, "<33%")
              .to(
                refs.pickup3.current.position,
                { x: 0, onComplete: () => callback?.() },
                "<33%"
              );
          },
        },
      ],
    },
    {
      title: "Core",
      class: "core",
      content:
        "The heart of the AdaptAxe system provides a rock-solid foundation while enabling unlimited customization possibilities",
      features: [
        {
          name: "Stable Foundation",
          description:
            "Channels accommodate carbon fiber reinforcement rods for exceptional stability regardless of your chosen materials",
          onClick(callback) {
            if (
              !refs.carbonRods.current ||
              !refs.coreRef.current ||
              !refs.groupRef.current
            )
              return;
            timeline()
              .to(refs.coreRef.current.rotation, {
                x: -Math.PI / 2,
                y: mobile ? -Math.PI / 8 : Math.PI / 8,
              })
              .to(refs.carbonRods.current.position, { z: 3 }, ">")

              .to(refs.carbonRods.current.position, { z: 0, delay: 2 }, ">")
              .to(
                refs.coreRef.current.rotation,
                { x: 0, y: 0, onComplete: () => callback?.() },
                ">"
              );
          },
        },
        {
          name: "Flexible Wiring",
          description:
            "Integrated wiring channels throughout the body make cable routing clean and simple for any configuration you can imagine",
        },
      ],
    },
    {
      title: "Bridge System",
      class: "bridge",
      content:
        "Swappable bridge mounts let players customize their playing experience from tremolo to fixed bridge with minimal effort",
      features: [
        {
          name: "Experiment Faster",
          description:
            "Quick-release pin system keeps components secure while you're exploring different setups and configurations",
        },
        {
          name: "Sturdy",
          description:
            "Optional screw mounting provides additional stability for performance and recording scenarios",
        },
        {
          name: "Compatibility",
          description:
            "Universal design accommodates virtually any guitar bridge style, from Floyd Rose to Hard Tail and everything in between",
        },
      ],
    },
    {
      title: "Thanks",
      class: "thanks",
      content:
        "Thank you so much. I know your time is valuable and appreciate you taking the time to explore the AdaptAxe system",
      features: [
        {
          name: "Feedback",
          icon: NotebookPen,
          description: "Share your thoughts, questions, or suggestions",
          href: "https://forms.gle/FksvpzrdzSmAu7Ek7",
        },
        {
          name: "Instagram",
          icon: Instagram,
          description:
            "Stay up to date with new developments and quickly chat with me",
          href: "https://www.instagram.com/adaptaxe/",
        },
        {
          name: "Email",
          icon: Mail,
          description: "stephen@adaptaxe.com",
          href: "mailto:stephen@adaptaxe.com",
        },
        {
          name: "Phone",
          icon: Phone,
          description: "+1 (442) 899-7309",
          href: "tel:+14428997309",
        },
      ],
    },
  ];
  return sections;
}
