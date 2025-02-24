import { UIState } from "@/store/ui";
import { Button } from "@workspace/ui/components/button";
import { Eye, MoveHorizontal, Settings } from "lucide-react";

export function ControlButtons() {
  return (
    <div className="fixed top-0 right-7 z-50 flex flex-row items-center gap-2 p-2 text-foreground">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="cursor-pointer"
        onClick={() => (UIState.display = !UIState.display)}
      >
        <MoveHorizontal strokeWidth={1} />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => (UIState.visibilityOpen = !UIState.visibilityOpen)}
        className="cursor-pointer"
      >
        <Eye strokeWidth={1} />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="cursor-pointer"
        onClick={() => (UIState.controlsOpen = !UIState.controlsOpen)}
      >
        <Settings strokeWidth={1} />
      </Button>
    </div>
  );
}
