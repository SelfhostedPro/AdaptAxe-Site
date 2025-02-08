import {
  Bounds,
  Center,
  Environment,
  Html,
  Hud,
  Lightformer,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  MeshWobbleMaterial,
  PerspectiveCamera,
  ScreenSizer,
  ScreenSpace,
  Text3D,
  useEnvironment,
} from "@react-three/drei";
import BlackOps from "@/data/BlackOps.json";
import info from "@/data/info.json";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { Links, Socials } from "./Links";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import useMediaQuery, { useBreakpoints } from "@/hooks/use-media-query";
interface TextTitleInterface {
  perfSucks?: boolean;
}
export function TitleText({ perfSucks }: TextTitleInterface) {
  const { mobile, sm, md, lg } = useBreakpoints();
  const lightRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!lightRef.current) return;
    const t = state.clock.getElapsedTime();
    lightRef.current.rotation.set(
      0,
      0,
      Math.cos(t / 3) * 0.5
      // Math.cos(t * 0.15)
    );
  });
  const envIntensity = 1;

  return (
    <Hud>
      <ScreenSpace depth={5}>
        <Center>
          <Text3D
            position={[lg ? -0.37 : md ? 0.46 : 0.9, 0, 0]}
            lineHeight={0.5}
            size={0.3}
            scale={lg ? 2 : md ? 1.2 : 0.8}
            curveSegments={32}
            //@ts-expect-error Font type incorrect
            font={BlackOps}
          >
            {info.title}
            <meshPhysicalMaterial
              toneMapped={false}
              color="#FFF"
              roughness={0}
              metalness={1}
              envMapIntensity={0}
            />
            {/* <meshStandardMaterial color="darkgrey" roughness={0.5} metalness={0.5} /> */}
          </Text3D>
          <Text3D
            position={[lg ? -0.8 : md ? 0.21 : 0.46, lg ? -0.5 : -0.3, 0]}
            lineHeight={0.5}
            size={0.3}
            scale={lg ? 1 : md ? 0.6 : 0.5}
            //@ts-expect-error Font type incorrect
            font={BlackOps}
          >
            {info.headline.toUpperCase()}
            <meshPhysicalMaterial
              color="#f0f0f0"
              roughness={0.1}
              metalness={0.9}
              clearcoat={1}
              clearcoatRoughness={0}
              envMapIntensity={0.5}
            />
          </Text3D>
        </Center>
        {/* <pointLight intensity={1} decay={0.1} distance={1} position={[-1, 0, 3]} /> */}
        <Html fullscreen>
          <div className="w-[100vw] h-[100vh]">
            <div
              className={cn(
                "absolute bottom-5 p-8 mt-4 max-w-lg w-full",
                mobile || sm ? "mx-auto left-0 right-0" : "right-5"
              )}
            >
              <Links />
            </div>
            <div
              className={cn(
                "absolute top-5 right-5 text-white flex flex-row items-center gap-6"
              )}
            >
              <Socials className="size-6" />
            </div>
          </div>
        </Html>
      </ScreenSpace>
      <Environment
        frames={perfSucks ? 1 : Infinity}
        resolution={512}
        blur={1.5}
      >
        <Lightformer
          intensity={1}
          form="rect"
          position={[0, 0.45, 2]}
          rotation={[0, 0, 0]}
          color="white"
          scale={[2.2, 1.04, 2]}
        />
        <Lightformer
          intensity={1 / 1.3}
          form="rect"
          position={[0, -0.2, 2]}
          rotation={[0, 0, 0]}
          color="dimgray"
          scale={[2.2, 0.1, 2]}
        />
        <group position={[0, -2, -2.5]} rotation={[0, 0, 0]} ref={lightRef}>
          <Lightformer
            intensity={envIntensity / 5}
            form="rect"
            position={[0, 2.2, 0]}
            rotation={[0, 0, 0]}
            color="#c2c2c2"
            scale={[1, 2, 1]}
          />
        </group>
      </Environment>
      <PerspectiveCamera makeDefault position={[0, 3, 0]} />
    </Hud>
  );
}
