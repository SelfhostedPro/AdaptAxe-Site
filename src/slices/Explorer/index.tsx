import ViewCanvas from "@/slices/Explorer/components/ViewCanvas";
import { View } from "@react-three/drei";
import { ExploreScene } from "./Scene";
import { Overlay } from "./Overlay";
import { useRef } from "react";
import { GuitarProvider } from "./context/GuitarContext";
import { Customizer } from "./Overlay";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ExplorePage() {
  const container = useRef<HTMLDivElement>(null!);
  return (
    <main ref={container}>
      <GuitarProvider>
        <div className="w-full flex flex-row z-0">
          <Overlay />
          <View
            style={{
              position: "fixed",
              right: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 10,
            }}
          >
            <ExploreScene />
            {/* <Perf /> */}
          </View>
          <Customizer />
        </div>
        <ViewCanvas eventSource={container} />
      </GuitarProvider>
    </main>
  );
}
