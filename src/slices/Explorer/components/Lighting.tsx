import { ReactThreeFiber, useFrame } from "@react-three/fiber";
import { LIGHT_SETUP } from "../constants";
import { easing } from "maath";
import { state } from "@/store/snapshot";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";

type SoftShadowMaterialProps = {
  map: THREE.Texture;
  color?: ReactThreeFiber.Color;
  alphaTest?: number;
  blend?: number;
};

interface AccumulativeContext {
  lights: Map<any, any>;
  temporal: boolean;
  frames: number;
  blend: number;
  count: number;
  getMesh: () => THREE.Mesh<
    THREE.PlaneGeometry,
    SoftShadowMaterialProps & THREE.ShaderMaterial
  >;
  reset: () => void;
  update: (frames?: number) => void;
}

export function Lighting() {
  return (
    <group>
      <directionalLight
        castShadow
        shadow-mapSize={[1024, 1024]}
        intensity={LIGHT_SETUP.front.intensity}
        position={LIGHT_SETUP.front.position}
      />
      <directionalLight
        intensity={LIGHT_SETUP.right.intensity}
        position={LIGHT_SETUP.right.position}
      />
      <directionalLight
        intensity={LIGHT_SETUP.left.intensity}
        position={LIGHT_SETUP.left.position}
      />
      <directionalLight
        intensity={LIGHT_SETUP.back.intensity}
        position={LIGHT_SETUP.back.position}
      />
    </group>
  );
}
