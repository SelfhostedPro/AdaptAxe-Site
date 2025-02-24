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
            "Transform your guitar's sound and style in seconds without any tools. Swap out modules to craft your ideal instrument for any genre or mood.",
        },
        {
          name: "Effortless Playability",
          description:
            "Customize the shape to offer optimal comfort with a design that prioritizes both form and function for your unique ergonomics",
        },
        {
          name: "Unmatched Versatility",
          description:
            "Save money and space by buying one guitar and a collection of swappable modules instead of needing multiple instruments",
        },
        {
          name: "Constant Evolution",
          description:
            "Unleash your creativity and discover a world of sonic possibilities with a guitar that evolves alongside your musical journey",
        },
      ],
    },
    {
      title: "Left Body",
      class: "left",
      content:
        "Allows users to change their style and offers a place for innovative new features",
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
            "Single place to easily lock to the center to prevent removal",
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
            "Cable channels in the center allow electronics to easily be embedded and connected to the rest of the guitar",
        },
      ],
    },
    {
      title: "Right Body",
      class: "right",
      content:
        "A core part of the experience for your users in a package you already know how to work with",
      features: [
        {
          name: "Electronics Plate",
          description:
            "Swappable electronics plate for streamlined wiring and easy access to controls",
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
            "Single place to easily lock to the center to prevent removal",
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
            "Can be designed as a sealed package to prevent users from disassembling promotional models",
        },
      ],
    },
    {
      title: "Neck Block",
      class: "neck",
      content:
        "An innovative shape that enables tool-less modularity while maintaining stability",
      features: [
        {
          name: "Seamless Interchangeability",
          description:
            "Shaped to enable string tension to lock in place while still allowing for toolless removal",
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
          description: "Tab ensures neck is level once it rotates into place",
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
            "Hole pattern designed to be compatible with a verity of back plates",
        },
      ],
    },
    {
      title: "Pickups",
      class: "pickup",
      content:
        "Enable users to achieve the tone they want with endless options for pickups, accessories, and anything else you want your players want to have easy access to.",
      features: [
        {
          name: "Instant Tone Shaping",
          description:
            "Hotswap connectors enable players to swap their pickups and other electronics in seconds",
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
            "Don't limit yourself to just pickups, put in on-board effects, batteries, anything you want connected to your wiring",
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
            "For a more stable platform with less points of failure, you can hardwire your electronics instead of using the hotswap system.",
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
        "The core houses essential components and provides a solid base for customization",
      features: [
        {
          name: "Stable Foundation",
          description:
            "Additional geometry allows for carbon fiber rods to be inserted for additional stability regardless of material",
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
          name: "Adaptable Wiring",
          description:
            "Wiring channels throughout the body enable you to easily route cables wherever they're needed",
        },
      ],
    },
    {
      title: "Bridge Mount",
      class: "bridge",
      content:
        "Swappable bridge mounts enable players to tailor their guitar to their preferences",
      features: [
        {
          name: "Experiment Faster",
          description:
            "Use a quick release pin to keep things together while you're experamenting",
        },
        {
          name: "Sturdy",
          description:
            "Switch over to screws for additional stability once you're ready for a show",
        },
        {
          name: "Compatibility",
          description:
            "The bridge mount accommodates a wide range of guitar bridges, including Floyd Rose and Hard Tail styles.",
        },
      ],
    },
    {
      title: "Thanks",
      class: "thanks",
      content:
        "Thank you so much. I know your time is valuable and appreciate you taking the time to look through this.",
      features: [
        {
          name: "Feedback",
          icon: NotebookPen,
          description: "Be sure to reach out with any feedback or questions",
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
