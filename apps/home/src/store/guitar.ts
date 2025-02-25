import { proxy } from "valtio";

const state = proxy({
  styles: ["filled", "squared"],
  secondarys: [
    "#121212",
    "#FFF",
    "ForestGreen",
    "SlateGray",
    "FireBrick",
    "#353934",
  ],
  primarys: [
    "#FFF",
    "Firebrick",
    "Gold",
    "DarkCyan",
    "ForestGreen",
    "DarkSlateBlue",
    "SlateGray",
  ],
  animatePrimary: "Firebrick",
  animateSecondary: "#121212",
  primary: "Firebrick",
  secondary: "#121212",
  style: "squared",
  ready: false
});

export { state as GuitarState };
