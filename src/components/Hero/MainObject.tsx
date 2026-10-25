import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MousePosition } from "@/hooks/useMouseParallax";

interface MainObjectProps {
  mouseRef: React.MutableRefObject<MousePosition>;
  scrollProgress: number;
  isMobile?: boolean;
}

export const MainObject: React.FC<MainObjectProps> = ({
  mouseRef,
  scrollProgress,
  isMobile = false,
}) => {
  const outerGroupRef = useRef<THREE.Group>(null!);
  const glassFrameRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Group>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const energyOrbRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    if (!outerGroupRef.current) return;

    // 1. Hover/Floating sine-wave motion
    const floatOffset = Math.sin(time * 1.2) * 0.12;
    const scrollYOffset = scrollProgress * -1.5;

    outerGroupRef.current.position.y = floatOffset + scrollYOffset;

    // 2. Mouse Parallax Rotation with smooth lerp damping
    const targetRotX = mouseY * 0.35 + scrollProgress * 0.5;
    const targetRotY = mouseX * 0.45 + time * 0.15;

    outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      outerGroupRef.current.rotation.x,
      targetRotX,
      0.06
    );
    outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      outerGroupRef.current.rotation.y,
      targetRotY,
      0.06
    );

    // 3. Counter-rotating inner components for visual depth
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -time * 0.35;
      innerCoreRef.current.rotation.z = Math.sin(time * 0.8) * 0.15;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = time * 0.5;
      innerRingRef.current.rotation.y = time * 0.25;
    }

    // 4. Energy orb pulsing light
    if (energyOrbRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.08;
      energyOrbRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const baseScale = isMobile ? 0.75 : 1.0;

  return (
    <group ref={outerGroupRef} scale={baseScale}>
      {/* 1. OUTER GLASS SHIELD / CHAMFERED PRISM */}
      <mesh ref={glassFrameRef}>
        {/* Chamfered Box Prism */}
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transmission={0.88}
          transparent={true}
          opacity={1}
          roughness={0.06}
          metalness={0.1}
          ior={1.52}
          thickness={1.4}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
        />
      </mesh>

      {/* Outer Metallic Bevel Edge Accents */}
      <mesh scale={[1.002, 1.002, 1.002]}>
        <boxGeometry args={[2.22, 2.22, 2.22]} />
        <meshPhysicalMaterial
          color="#d4af37"
          wireframe
          transparent
          opacity={0.35}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 2. INNER TITANIUM & GOLD METALLIC CORE */}
      <group ref={innerCoreRef}>
        {/* Central Bevelled Octahedron / Core Structure */}
        <mesh scale={0.95}>
          <octahedronGeometry args={[1.0, 2]} />
          <meshPhysicalMaterial
            color="#1e293b"
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            reflectivity={0.95}
          />
        </mesh>

        {/* Diagonal Gold Accent Bands */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.05, 0.04, 16, 64]} />
          <meshPhysicalMaterial
            color="#d4af37"
            metalness={0.95}
            roughness={0.12}
            clearcoat={1.0}
            emissive="#785c0c"
            emissiveIntensity={0.25}
          />
        </mesh>

        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.05, 0.04, 16, 64]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
            emissive="#0284c7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* 3. INNERMOST GLOWING ENERGY ORB */}
        <mesh ref={energyOrbRef} scale={0.42}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={3.5}
            roughness={0.1}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* 4. FAST ORBITING INNER ENERGY RING */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.45, 0.015, 16, 100]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={1.8}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* 5. SOFT AMBIENT GLOW LIGHT AT CORE */}
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#fbbf24" distance={5} />
    </group>
  );
};
