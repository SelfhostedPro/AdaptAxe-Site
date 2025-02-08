import { MainCanvas } from "@/slices/Home/Canvas";
import { HeroScene } from "@/slices/Home/Scene";
import { Suspense, useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { TitleText } from "./Title";
import { Loading } from "@/components/Utils/Loading";
import { Model } from "@/components/Guitar";
import { GuitarProvider, useGuitar } from "@/slices/Explorer/context/GuitarContext";


export function Hero() {
  return (
    <GuitarProvider>
      <WrappedHero />
    </GuitarProvider>
  )
}

export function WrappedHero() {
  const [perfSucks, degrade] = useState(false);
  const { refs } = useGuitar();
  const materialProps = {
    toneMapped: false,
    color: "#000",
    roughness: 0.05,
    metalness: 0.5,
    envMapIntensity: 1,
  }
  return (
    <div className="w-full h-full flex">
      <MainCanvas className="dark">
        <TitleText perfSucks={perfSucks} />
        <HeroScene perfSucks={perfSucks}>
          <Suspense fallback={<Loading />}>
            <group>
              {/* <LoadedModel path="/models/hidden.obj" /> */}
              <Model home active="none" refs={refs}
                primaryMaterial={(<meshPhysicalMaterial {...materialProps} />)}
                secondaryMaterial={(<meshPhysicalMaterial {...materialProps} />)}
              />
            </group>
          </Suspense>
        </HeroScene>
        {/* <Environment preset="warehouse" frames={perfSucks ? 1 : Infinity} /> */}
        <PerformanceMonitor
          onIncline={() => degrade(false)}
          onDecline={() => degrade(true)}
        />
      </MainCanvas>
    </div>
  );
}
