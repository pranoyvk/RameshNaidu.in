import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { MousePosition } from "@/hooks/useMouseParallax";
import { HeroLights } from "./HeroLights";
import { MainObject } from "./MainObject";
import { FloatingObjects } from "./FloatingObjects";
import { Particles } from "./Particles";

interface HeroSceneProps {
  mouseRef: React.MutableRefObject<MousePosition>;
  scrollProgress: number;
  isMobile: boolean;
  onLoaded?: () => void;
}

function SceneContent({ mouseRef, scrollProgress, isMobile, onLoaded }: HeroSceneProps) {
  useEffect(() => {
    if (onLoaded) {
      onLoaded();
    }
  }, [onLoaded]);

  return (
    <>
      <HeroLights />
      <MainObject mouseRef={mouseRef} scrollProgress={scrollProgress} isMobile={isMobile} />
      <FloatingObjects mouseRef={mouseRef} />
      <Particles mouseRef={mouseRef} isMobile={isMobile} />
    </>
  );
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  mouseRef,
  scrollProgress,
  isMobile,
  onLoaded,
}) => {
  return (
    <div className="w-full h-full min-h-[420px] md:min-h-[580px] relative pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 7.5 : 6.0],
          fov: isMobile ? 48 : 40,
          near: 0.1,
          far: 100,
        }}
        dpr={isMobile ? [1, 1.25] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            mouseRef={mouseRef}
            scrollProgress={scrollProgress}
            isMobile={isMobile}
            onLoaded={onLoaded}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
