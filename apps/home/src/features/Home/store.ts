import { proxy } from "valtio";
import { PartType } from "@/constants";

interface SectionStateStore {
  section: PartType;
}

const state = proxy<SectionStateStore>({
  section: "explore",
});

export { state as SectionState };
