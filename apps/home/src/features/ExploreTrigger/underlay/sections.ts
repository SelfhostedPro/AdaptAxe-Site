"use client";
import { OFFPAGE_DISTANCE, PartType } from "@/constants";
import { useBreakpoints } from "@/hooks/use-media-query";
import gsap from "gsap";
import { Instagram, LucideIcon, Mail, Phone } from "lucide-react";
import { useRef } from "react";

interface Feature {
  name: string;
  icon?: LucideIcon;
  description: string;
  href?: string;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: () => void;
}

interface Section {
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
  const { lg } = useBreakpoints();
  const timeline = () => {
    if (!tl.current) {
      tl.current = gsap.timeline();
    }
    return tl.current;
  };
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
          onClick() {
            refs.leftPlate.current &&
              timeline()
                .to(refs.leftPlate.current.position, { x: 0.5 })
                // Reset
                .to(refs.leftPlate.current.position, { x: 0, delay: 2 }, ">");
          },
        },
        {
          name: "Intuitive Stability",
          description:
            "Single place to easily lock to the center to prevent removal",
          onClick() {
            if (!refs.leftRef.current || !refs.highlightRef.current) return;

            timeline()
              .to(refs.leftRef.current.rotation, { z: -2.2 })
              .to(
                refs.leftRef.current.position,
                { y: 8, x: lg ? 0 : -1.5 },
                "<"
              )
              .to(
                refs.highlightRef.current.position,
                {
                  x: lg ? -1.29 : -2.8,
                  y: lg ? -0.18 : -0.1,
                  z: lg ? 10.3 : 9.4,
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
                { y: 0, x: lg ? 1.5 : 0 },
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
          onClick() {
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
                },
                ">"
              );
          },
        },
        {
          name: "Intuitive Stability",
          description:
            "Single place to easily lock to the center to prevent removal",
          onClick() {
            if (!refs.rightRef.current || !refs.highlightRef.current) return;

            timeline()
              .to(refs.rightRef.current.rotation, { z: 2.2 })
              .to(refs.rightRef.current.position, { y: 6, x: 0 }, "<")
              .to(
                refs.highlightRef.current.position,
                { x: lg ? -1.89 : -1.6, y: 0.14, z: lg ? 8.2 : 7.4 },
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
                { y: 0, x: lg ? -4 : -3 },
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
          onClick() {
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
                y: lg ? 2 : 1.5,
                z: -OFFPAGE_DISTANCE + 0.2,
              })
              .to(refs.coreRef.current.position, { z: -OFFPAGE_DISTANCE }, "<")
              .to([refs.neckRef.current?.rotation], { x: -0.8 }, ">")
              .to(
                [refs.neckRef.current?.position],
                {
                  y: lg ? 4.7 : 3.65,
                  z: lg ? -OFFPAGE_DISTANCE - 1.1 : -OFFPAGE_DISTANCE - 0.25,
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
                  y: lg ? 4.2 : 2.8,
                  z: lg ? -OFFPAGE_DISTANCE - 1.1 : -OFFPAGE_DISTANCE - 0.25,
                },
                "<"
              )
              .to([refs.neckRef.current?.rotation], { x: 0 }, ">")
              .to(
                [refs.neckRef.current?.position],
                { y: lg ? 3.7 : 3.2, z: -OFFPAGE_DISTANCE },
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
                { y: -OFFPAGE_DISTANCE },
                "<"
              );
          },
        },
        {
          name: "Alignment Tab",
          description: "Tab ensures neck is level once it rotates into place",
          onClick() {
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
                { x: lg ? -0.5 : -1.7, z: -OFFPAGE_DISTANCE - 1.4 },
                "<"
              )
              .to(
                refs.neckRef.current.scale,
                { x: 0.05, y: 0.05, z: 0.05 },
                "<"
              )
              .to(
                refs.highlightRef.current.position,
                { x: lg ? -0.68 : -1.81, y: -0.4, z: 8 },
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
                  x: lg ? 0.04 : 0.025,
                  y: lg ? 0.04 : 0.025,
                  z: lg ? 0.04 : 0.025,
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
          onClick() {
            if (
              !refs.pickup1.current ||
              !refs.pickup2.current ||
              !refs.pickup3.current
            )
              return;
            timeline()
              .to(refs.pickup1.current.position, { x: lg ? -4 : -2.5 }, ">")
              .to(refs.pickup3.current.position, { x: lg ? -4 : -2.5 }, "<33%")
              .to(refs.pickup1.current.position, { x: 0, delay: 2 }, ">")
              .to(refs.pickup3.current.position, { x: 0 }, "<33%");
          },
        },
        {
          name: "Get Creative",
          description:
            "Don't limit yourself to just pickups, put in on-board effects, batteries, anything you want connected to your wiring",
          onClick() {
            if (
              !refs.pickup1.current ||
              !refs.pickup2.current ||
              !refs.pickup3.current
            )
              return;
            timeline().to(refs.pickup2.current.position, { x: lg ? -4 : -2.5 });
            timeline().to(
              refs.pickup2.current.position,
              { x: 0, delay: 2 },
              ">"
            );
          },
        },
        {
          name: "You've Got Options",
          description:
            "For a more stable platform with less points of failure, you can hardwire your electronics instead of using the hotswap system.",
          onClick() {
            if (
              !refs.pickupRef.current ||
              !refs.pickup1.current ||
              !refs.pickup2.current ||
              !refs.pickup3.current
            )
              return;

            timeline()
              .to(refs.pickup1.current.position, { x: lg ? -4 : -2.5 }, ">")
              .to(refs.pickup2.current.position, { x: lg ? -4 : -2.5 }, "<33%")
              .to(refs.pickup3.current.position, { x: lg ? -4 : -2.5 }, "<33%")
              .to(refs.pickupRef.current.rotation, { x: -Math.PI }, ">")

              .to(refs.pickupRef.current.rotation, { x: 0, delay: 2 }, ">")
              .to(refs.pickup1.current.position, { x: 0 }, ">")
              .to(refs.pickup2.current.position, { x: 0 }, "<33%")
              .to(refs.pickup3.current.position, { x: 0 }, "<33%");
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
          onClick() {
            if (
              !refs.carbonRods.current ||
              !refs.coreRef.current ||
              !refs.groupRef.current
            )
              return;
            timeline()
              .to(refs.coreRef.current.rotation, {
                x: -Math.PI / 2,
                y: lg ? Math.PI / 8 : -Math.PI / 8,
              })
              .to(refs.carbonRods.current.position, { z: 3 }, ">")

              .to(refs.carbonRods.current.position, { z: 0, delay: 2 }, ">")
              .to(refs.coreRef.current.rotation, { x: 0, y: 0 }, ">");
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
          name: "Contact",
          description: "Be sure to reach out with any feedback or questions",
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
