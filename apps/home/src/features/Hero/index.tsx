'use client'
import { HeroScene } from "./Scene";
import { Suspense, useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { TitleText } from "./Title";
import { Loading } from "@/components/utils/Loading";
import { Model } from "@/components/models/Guitar";
import {
  GuitarProvider,
  useGuitar,
} from "@/components/providers/GuitarProvider";

export function Hero() {
  return (
    <GuitarProvider>
      <WrappedHero />
    </GuitarProvider>
  );
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
  };
  return (
    <>
      <TitleText perfSucks={perfSucks} />
      <HeroScene perfSucks={perfSucks}>
        <Suspense fallback={<Loading />}>
          <group>
            {/* <LoadedModel path="/models/hidden.obj" /> */}
            <Model
              home
              active="none"
              refs={refs}
              primaryMaterial={<meshPhysicalMaterial {...materialProps} />}
              secondaryMaterial={<meshPhysicalMaterial {...materialProps} />}
            />
          </group>
        </Suspense>
      </HeroScene>
      {/* <Environment preset="warehouse" frames={perfSucks ? 1 : Infinity} /> */}
      <PerformanceMonitor
        onIncline={() => degrade(false)}
        onDecline={() => degrade(true)}
      />
    </>
  );
}
