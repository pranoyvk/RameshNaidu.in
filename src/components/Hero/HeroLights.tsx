import React from "react";

export const HeroLights: React.FC = () => {
  return (
    <>
      {/* Soft Ambient Light */}
      <ambientLight intensity={0.9} color="#101525" />

      {/* Main Warm Key Light */}
      <directionalLight
        position={[8, 10, 6]}
        intensity={2.8}
        color="#fff5e6"
        castShadow
      />

      {/* Cool Fill Light from Opposite Side */}
      <directionalLight
        position={[-8, -6, -4]}
        intensity={1.2}
        color="#38bdf8"
      />

      {/* Sharp Metallic Rim Light from Behind */}
      <spotLight
        position={[0, 6, -10]}
        intensity={6.0}
        color="#ffd700"
        angle={0.8}
        penumbra={0.9}
      />

      {/* Accent Point Lights for Gem-like Luminescence */}
      <pointLight position={[3, 3, 4]} intensity={2.5} color="#d4af37" distance={12} />
      <pointLight position={[-4, -2, 3]} intensity={2.0} color="#0284c7" distance={12} />
      <pointLight position={[0, -4, -3]} intensity={1.8} color="#a855f7" distance={10} />
      <pointLight position={[0, 4, 3]} intensity={1.5} color="#ffffff" distance={8} />
    </>
  );
};
