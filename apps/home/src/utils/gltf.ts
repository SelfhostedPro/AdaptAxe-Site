import { useGLTF as useGLTFDrei } from "@react-three/drei";
import { Mesh, Group, Scene } from "three";
export type GltfT = {
  nodes: {
    [key: string]: Mesh | Group | Scene;
  };
};

export const useGLTF = <T extends string | string[]>(path: T) =>
  useGLTFDrei(path, true, true) as unknown as T extends any[] ? GltfT[] : GltfT;
