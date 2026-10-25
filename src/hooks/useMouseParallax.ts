import { useEffect, useRef } from "react";

export interface MousePosition {
  x: number; // Normalized -1 to 1
  y: number; // Normalized -1 to 1
  targetX: number;
  targetY: number;
}

export function useMouseParallax(lerpFactor = 0.05) {
  const mouseRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert to normalized device coordinates (-1 to 1)
      const targetX = (event.clientX / window.innerWidth) * 2 - 1;
      const targetY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.targetX = targetX;
      mouseRef.current.targetY = targetY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        const targetY = -(touch.clientY / window.innerHeight) * 2 + 1;

        mouseRef.current.targetX = targetX;
        mouseRef.current.targetY = targetY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animationFrameId: number;

    const updatePosition = () => {
      // Smooth linear interpolation (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * lerpFactor;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * lerpFactor;

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lerpFactor]);

  return mouseRef;
}
