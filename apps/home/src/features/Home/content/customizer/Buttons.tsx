import { UIState } from "@/store/ui";
import {
  disableControllers,
  enableControllers,
} from "../../animations/scrollers";
import { Button } from "@workspace/ui/components/button";
import { Eye, MoveHorizontal, Settings } from "lucide-react";

/**
 * ControlButtons component renders a set of control buttons for the guitar customizer.
 * These buttons allow users to toggle different UI states and control panels.
 */
export function ControlButtons() {
  return (
    <div className="fixed top-0 right-4 z-50 flex flex-row items-center gap-2 p-2 text-foreground">
      {/* Toggle movement controls button */}
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
      
      {/* Toggle visibility panel button */}
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
      
      {/* Toggle settings/controls panel button */}
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
