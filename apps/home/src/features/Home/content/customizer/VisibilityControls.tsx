import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGuitar } from "@/components/providers/GuitarProvider";
import { Eye, EyeClosed } from "lucide-react";
type BodyRefs = Record<string, RefObject<THREE.Group | THREE.Mesh | null>>;

/**
 * VisibilityControls component provides buttons to toggle the visibility
 * of different parts of the 3D guitar model.
 */
export function VisibilityControls() {
  const { refs } = useGuitar();
  // Store references to all guitar parts
  const bodyRefs = useRef<BodyRefs>({});
  // Track visibility state of each part
  const [visibilityState, setVisibilityState] = useState<
    Record<string, boolean>
  >({});

  // Initialize references and visibility state when component mounts
  useEffect(() => {
    // Map part names to their corresponding refs
    bodyRefs.current = {
      Core: refs.coreRef,
      "Right Body": refs.rightBody,
      "Right Plate": refs.rightPlate,
      "Left Body": refs.leftBody,
      "Left Plate": refs.leftPlate,
      Pickups: refs.pickupRef,
      Bridge: refs.bridgeRef,
    };
    
    // Initialize visibility state based on current visibility of parts
    const initialVisibility = Object.fromEntries(
      Object.entries(bodyRefs.current).map(([name, ref]) => [
        name,
        ref.current?.visible ?? true,
      ])
    );
    setVisibilityState(initialVisibility);
  }, [refs]);

  return (
    <Card className="bg-background/40 border-foreground/10 backdrop-blur-3xl rounded-2xl p-4 ">
      <CardContent className="p-2 flex flex-col gap-2">
        <span>Visibility</span>
        {/* Render toggle buttons for each guitar part */}
        {bodyRefs.current &&
          Object.entries(bodyRefs.current).map(([name, ref]) => (
            <Button
              key={name}
              variant={visibilityState[name] ? "default" : "ghost"}
              onClick={() => {
                // Toggle visibility of the part
                const newVisibility = !visibilityState[name];
                ref.current!.visible = newVisibility;
                setVisibilityState((prev) => ({
                  ...prev,
                  [name]: newVisibility,
                }));
              }}
            >
              {name} {visibilityState[name] ? <Eye /> : <EyeClosed />}
            </Button>
          ))}
      </CardContent>
    </Card>
  );
}
