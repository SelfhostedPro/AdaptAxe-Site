import { proxy } from "valtio";

const state = proxy({
  controlsOpen: false,
  visibilityOpen: false,
  display: false,
});

export { state as UIState };
