"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

export default function Hero3D() {
  return (
    <Canvas style={{ height: 400 }}>
      <ambientLight />
      <Float speed={3}>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
