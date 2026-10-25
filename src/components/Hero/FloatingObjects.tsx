import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MousePosition } from "@/hooks/useMouseParallax";

interface FloatingObjectsProps {
  mouseRef: React.MutableRefObject<MousePosition>;
}

export const FloatingObjects: React.FC<FloatingObjectsProps> = ({ mouseRef }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const octaRef1 = useRef<THREE.Mesh>(null!);
  const octaRef2 = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouseX * 0.6, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouseY * 0.6, 0.04);
    }

    // Smooth individual rotations & floating sine bobbing
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.2;
      ringRef1.current.rotation.y = time * 0.3;
      ringRef1.current.position.y = Math.sin(time * 0.8) * 0.15;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.x = -time * 0.25;
      ringRef2.current.rotation.z = time * 0.15;
      ringRef2.current.position.y = Math.cos(time * 0.9) * 0.12;
    }

    if (octaRef1.current) {
      octaRef1.current.rotation.x = time * 0.4;
      octaRef1.current.rotation.y = time * 0.5;
      octaRef1.current.position.y = 1.6 + Math.sin(time * 1.1) * 0.15;
    }

    if (octaRef2.current) {
      octaRef2.current.rotation.x = -time * 0.3;
      octaRef2.current.rotation.z = time * 0.4;
      octaRef2.current.position.y = -1.5 + Math.cos(time * 1.2) * 0.18;
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = 1.1 + Math.sin(time * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Metallic Accent Ring 1 */}
      <mesh ref={ringRef1} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 16, 100]} />
        <meshPhysicalMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#5e450a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Outer Cyan Accent Ring 2 */}
      <mesh ref={ringRef2} position={[0, 0, 0]} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
          emissive="#0284c7"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Floating Bevelled Gold Octahedron Top Left */}
      <mesh ref={octaRef1} position={[-2.2, 1.6, -0.5]} scale={0.28}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#f3d078"
          metalness={0.85}
          roughness={0.2}
          clearcoat={0.9}
          reflectivity={0.9}
        />
      </mesh>

      {/* Floating Translucent Sapphire Prism Bottom Right */}
      <mesh ref={octaRef2} position={[2.1, -1.5, 0.4]} scale={0.32}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.8}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.5}
          thickness={0.8}
          clearcoat={1.0}
        />
      </mesh>

      {/* Small Glowing Energy Orb */}
      <mesh ref={sphereRef} position={[-1.8, 1.1, 0.8]} scale={0.12}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
