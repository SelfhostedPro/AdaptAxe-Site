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
  primary: "Firebrick",
  secondary: "#121212",
  style: "squared",
  controlsOpen: false,
  visibilityOpen: false,
  display: false,
});

export { state };
