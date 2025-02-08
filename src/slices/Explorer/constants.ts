export const OFFPAGE_DISTANCE = 20;

export type PartType =
  | "none"
  | "right"
  | "left"
  | "neck"
  | "pickup"
  | "core"
  | "bridge"
  | "thanks";

export const LIGHT_SETUP = {
  front: { intensity: 0.6, position: [0, 0, 10] as const },
  right: { intensity: 0.4, position: [10, 0, 0] as const },
  left: { intensity: 0.4, position: [-10, 0, 0] as const },
  back: { intensity: 0.6, position: [0, 0, -10] as const },
};
