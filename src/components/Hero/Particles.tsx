import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MousePosition } from "@/hooks/useMouseParallax";

interface ParticlesProps {
  mouseRef: React.MutableRefObject<MousePosition>;
  isMobile?: boolean;
}

export const Particles: React.FC<ParticlesProps> = ({ mouseRef, isMobile = false }) => {
  const count = isMobile ? 50 : 130;
  const meshRef = useRef<THREE.Points>(null!);

  // Generate particle positions, speeds, and sizes
  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const palette = [
      new THREE.Color("#d4af37"),
      new THREE.Color("#f3d078"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#e2e8f0"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sca[i] = Math.random() * 0.06 + 0.02;
    }

    return [pos, col, sca];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Gentle upward & rotational drift
    meshRef.current.rotation.y += delta * 0.03;
    meshRef.current.rotation.x += delta * 0.015;

    // Mouse parallax reaction
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX * 0.4, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY * 0.4, 0.05);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};
