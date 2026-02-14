import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const gridSize = 40;
  const columns = Math.ceil(dimensions.width / gridSize);
  const rows = Math.ceil(dimensions.height / gridSize);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden pointer-events-auto bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10" />

      <div
        className="relative w-full h-full opacity-60"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, i) => {
          const x = (i % columns) * gridSize + gridSize / 2;
          const y = Math.floor(i / columns) * gridSize + gridSize / 2;

          return (
            <Dot
              key={i}
              x={x}
              y={y}
              smoothX={smoothX}
              smoothY={smoothY}
            />
          );
        })}
      </div>

      {/* Decorative Blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[150px]"
        />
      </div>
    </div>
  );
}

function Dot({ x, y, smoothX, smoothY }: { x: number; y: number; smoothX: any; smoothY: any }) {
  const distanceX = useMotionValue(0);
  const distanceY = useMotionValue(0);
  const distance = useMotionValue(1000); // Start far away
  const scale = useMotionValue(1);

  // Map distance [0, 250] to hue [0, 360]
  const hue = useTransform(distance, [0, 250], [0, 360]);
  const backgroundColor = useTransform(hue, (h) => `hsl(${h}, 80%, 65%)`);
  const dotOpacity = useTransform(distance, [0, 250], [1, 0.4]);

  useEffect(() => {
    const unsubscribeX = smoothX.on("change", (latestX: number) => {
      const dx = latestX - x;
      distanceX.set(dx);
      updateDistance();
    });
    const unsubscribeY = smoothY.on("change", (latestY: number) => {
      const dy = latestY - y;
      distanceY.set(dy);
      updateDistance();
    });

    const updateDistance = () => {
      const dx = distanceX.get();
      const dy = distanceY.get();
      const d = Math.sqrt(dx * dx + dy * dy);
      distance.set(d);

      // Scale based on distance (max scale 3.5 when mouse is over, tapering off to 1 at 120px)
      const newScale = Math.max(1, 4.0 - d / 60);
      scale.set(newScale);
    };

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y, smoothX, smoothY, distanceX, distanceY, distance, scale]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        style={{
          scale,
          backgroundColor,
          opacity: dotOpacity
        }}
        className="w-1.5 h-1.5 rounded-full"
      />
    </div>
  );
}
