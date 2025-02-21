"use client";
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useEffect, type JSX } from "react";
import { useGLTF, useProgress } from "@react-three/drei";
import type { PartType } from "@/constants";
import { useSnapshot } from "valtio/react";
import { GuitarState } from "@/store/guitar";
import {
  ThreeElement,
  ThreeElements,
  useThree,
  Vector3,
} from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";
import type { GLTF } from "three-stdlib";
import { GuitarRefs } from "@/hooks/useGuitarRefs";
import { useGuitar } from "../providers/GuitarProvider";

type StyleType = "squared" | "filled";

type GuitarPartsProps = {
  active: PartType;
  home?: boolean;
  primaryMaterial: JSX.Element;
  secondaryMaterial: JSX.Element;
  scale?: Vector3;
};

type GLTFResult = GLTF & {
  nodes: {
    Core: THREE.Mesh;
    FloydRose: THREE.Mesh;
    Humbucker: THREE.Mesh;
    LeftBody: THREE.Mesh;
    LeftPlateFilled: THREE.Mesh;
    LeftPlateSquared: THREE.Mesh;
    NeckBlock: THREE.Mesh;
    RightBodyFilled: THREE.Mesh;
    RightBodySquared: THREE.Mesh;
    RightPlateFilled: THREE.Mesh;
    RightPlateSquared: THREE.Mesh;
    PickupBattery: THREE.Mesh;
    Pickup3Humbucker: THREE.Mesh;
  };
  materials: {};
};

export function Model({
  active,
  primaryMaterial,
  secondaryMaterial,
  scale,
}: GuitarPartsProps) {
  const { refs } = useGuitar();
  const snap = useSnapshot(GuitarState);
  const { progress } = useProgress();
  const { nodes, materials } = useGLTF(
    "https://assets.adaptaxe.com/guitar-transformed.glb"
  ) as GLTFResult;
  const three = useThree();
  const mobile = useIsMobile();

  const baseProps = {
    scale: scale ? scale : mobile ? 0.025 : 0.04,
    castShadow: true,
    recieveShadow: true,
  } as const;

  const geometryMap: Record<
    StyleType,
    {
      leftPlate: THREE.BufferGeometry;
      rightPlate: THREE.BufferGeometry;
      rightBody: THREE.BufferGeometry;
    }
  > = {
    squared: {
      leftPlate: nodes.LeftPlateSquared.geometry,
      rightPlate: nodes.RightPlateSquared.geometry,
      rightBody: nodes.RightBodySquared.geometry,
    },
    filled: {
      leftPlate: nodes.LeftPlateFilled.geometry,
      rightPlate: nodes.RightPlateFilled.geometry,
      rightBody: nodes.RightBodyFilled.geometry,
    },
  };

  useEffect(() => {
    // Only set ready when both the model is loaded AND refs are set
    if (progress === 100 && refs.groupRef.current) {
      GuitarState.ready = true;
    }
  }, [progress, refs.groupRef.current]);

  useEffect(() => {
    refs.groupRef.current!.lookAt(three.camera.position);
    refs.groupRef.current!.rotateX(Math.PI / 2);
  }, [three.camera.position]);

  return (
    <group rotation={[Math.PI / 2, 0, 0]} ref={refs.groupRef} dispose={null}>
      <group ref={refs.coreRef}>
        <mesh ref={refs.coreRef} geometry={nodes.Core.geometry} {...baseProps}>
          {secondaryMaterial}
        </mesh>
        <group ref={refs.carbonRods} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh position={[mobile ? 0.42 : 0.65, 0, mobile ? -0.45 : -0.7]}>
            <cylinderGeometry
              args={[
                mobile ? 0.11 : 0.18,
                mobile ? 0.11 : 0.18,
                mobile ? 4 : 6.3,
                32,
                1,
              ]}
            />
            <meshStandardMaterial color="Silver" />
          </mesh>
          <mesh position={[mobile ? -0.42 : -0.65, 0, mobile ? -0.45 : -0.7]}>
            <cylinderGeometry
              args={[
                mobile ? 0.11 : 0.18,
                mobile ? 0.11 : 0.18,
                mobile ? 4 : 6.3,
                32,
                1,
              ]}
            />
            <meshStandardMaterial color="Silver" />
          </mesh>
        </group>
      </group>
      <mesh
        ref={refs.bridgeRef}
        // userData={{ active: active === "bridge" }}
        geometry={nodes.FloydRose.geometry}
        {...baseProps}
      >
        {primaryMaterial}
      </mesh>
      <group ref={refs.pickupRef}>
        <mesh
          //   userData={{ active: active === "pickup" }}
          ref={refs.pickup1}
          geometry={nodes.Humbucker.geometry}
          {...baseProps}
        >
          {" "}
          {primaryMaterial}
        </mesh>
        <mesh
          //   userData={{ active: active === "pickup" }}

          ref={refs.pickup2}
          geometry={nodes.PickupBattery.geometry}
          position={[0, 0, -0.006]}
          {...baseProps}
        >
          {primaryMaterial}
        </mesh>
        <mesh
          //   userData={{ active: active === "core" }}

          ref={refs.pickup3}
          geometry={nodes.Pickup3Humbucker.geometry}
          {...baseProps}
        >
          {primaryMaterial}
        </mesh>
      </group>
      <group ref={refs.leftRef}>
        <mesh
          //   userData={{ active: active === "left" }}
          ref={refs.leftBody}
          geometry={nodes.LeftBody.geometry}
          {...baseProps}
        >
          {secondaryMaterial}
        </mesh>
        <mesh
          ref={refs.leftPlate}
          //   userData={{ active: active === "left" }}
          geometry={geometryMap[snap.style as StyleType].leftPlate}
          {...baseProps}
        >
          {primaryMaterial}
        </mesh>
      </group>
      <group ref={refs.rightRef}>
        <mesh
          //   userData={{ active: active === "right" }}
          ref={refs.rightPlate}
          geometry={geometryMap[snap.style as StyleType].rightPlate}
          {...baseProps}
        >
          {primaryMaterial}
        </mesh>
        <mesh
          //   userData={{ active: active === "right" }}

          ref={refs.rightBody}
          geometry={geometryMap[snap.style as StyleType].rightBody}
          {...baseProps}
        >
          {primaryMaterial}
        </mesh>
      </group>
      <mesh
        ref={refs.neckRef}
        // userData={{ active: active === "neck" }}
        geometry={nodes.NeckBlock.geometry}
        {...baseProps}
      >
        {primaryMaterial}
      </mesh>
    </group>
  );
}

useGLTF.preload("https://assets.adaptaxe.com/guitar-transformed.glb");
