import { UIState } from "@/store/ui";
import {
  disableControllers,
  enableControllers,
} from "../../animations/scrollers";
import { Button } from "@workspace/ui/components/button";
import { Eye, MoveHorizontal, Settings } from "lucide-react";

export function ControlButtons() {
  return (
    <div className="fixed top-0 right-4 z-50 flex flex-row items-center gap-2 p-2 text-foreground">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="cursor-pointer"
        onClick={() =>
          UIState.display
            ? (enableControllers(), (UIState.display = false))
            : ((UIState.display = true), disableControllers())
        }
      >
        <MoveHorizontal strokeWidth={1} />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          if (UIState.controlsOpen) UIState.controlsOpen = false;
          UIState.visibilityOpen = !UIState.visibilityOpen;
        }}
        className="cursor-pointer"
      >
        <Eye strokeWidth={1} />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="cursor-pointer"
        onClick={() => {
          if (UIState.visibilityOpen) UIState.visibilityOpen = false;
          UIState.controlsOpen = !UIState.controlsOpen;
        }}
      >
        <Settings strokeWidth={1} />
      </Button>
    </div>
  );
}
