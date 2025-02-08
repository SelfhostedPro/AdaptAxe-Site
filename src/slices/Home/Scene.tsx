import { OrbitControls, PerspectiveCamera, Bounds } from "@react-three/drei";
import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useIsMobile } from "@/hooks/use-mobile";

export interface HeroSceneProps {
  perfSucks?: boolean;
  children?: ReactNode;
}
export function HeroScene({ children }: HeroSceneProps) {
  const childRef = useRef<Group>(null);
  const mobile = useIsMobile();

  useFrame((state, delta) => {
    if (!childRef.current) return;
    // childRef.current.rotation.y = clock.getElapsedTime() / 3
    const t = state.clock.getElapsedTime();
    childRef.current.rotation.set(
      0.1 + Math.cos(t / 4.5) / 10,
      t * 0.1,
      0.3 - (1 + Math.sin(t / 4)) / 8
    );
    // childRef.current.position.y = (1 + Math.sin(t / 2)) / 10
  });

  return (
    <>
      <color attach="background" args={["black"]} />
      {/* <fogExp2 attach='fog' args={['#000', 0.06]} /> */}
      <group>
        <spotLight
          castShadow
          color={"white"}
          intensity={5}
          distance={0}
          angle={1}
          penumbra={1}
          decay={0.1}
          position={[-5, -10, 5]}
        />
        <spotLight
          castShadow
          color={"white"}
          intensity={5}
          distance={0}
          angle={1}
          penumbra={1}
          decay={0.1}
          position={[-5, -10, -5]}
        />
        <spotLight
          castShadow
          color={"white"}
          intensity={5}
          distance={0}
          angle={1}
          penumbra={1}
          decay={0.1}
          position={[5, -10, 5]}
        />
        <spotLight
          castShadow
          color={"white"}
          intensity={5}
          distance={0}
          angle={1}
          penumbra={1}
          decay={0.1}
          position={[5, -10, -5]}
        />
        <Bounds fit clip observe margin={mobile ? 0.7 : 0.6}>
          <group ref={childRef}>{children}</group>
        </Bounds>
      </group>
      {/* <HeroEffects /> */}
      <PerspectiveCamera fov={35} makeDefault position={[0, 13, 3]} />
      <OrbitControls
        enabled={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        makeDefault
      />
    </>
  );
}
