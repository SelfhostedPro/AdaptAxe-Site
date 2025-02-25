import { proxy } from "valtio";

const state = proxy({
  styles: ["filled", "squared"],
  secondarys: [
    "#121212",
    "#FFF",
    "#228B22", //forestgreen
    "#708090", //slategray
    "#b22222", //Firebrick
    "#353934",
  ],
  primarys: [
    "#FFF",
    "#b22222", //firebrick
    "#EFBF04", //gold
    "#008B8B", //darkcyan
    "#228B22", //forestgreen
    "#483d8b", //darkslateblue
    "#708090", //slategray
  ],
  animatePrimary: "#b22222",
  animateSecondary: "#121212",
  primary: "#b22222",
  secondary: "#121212",
  style: "squared",
  ready: false,
});

export { state as GuitarState };
