import React, { useEffect, useRef, useState } from "react";

// Telugu letters and meaningful words from the author's life/writings
const TELUGU_CHARS = [
  "అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ", "క", "ఖ", "గ", "ఘ", "చ", "ఛ", "జ", "ఝ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "ఱ",
  "పత్తిపాటి", "రమేష్ నాయుడు", "శతకరత్నావళి", "తెలుగు", "అభినవవేమన", "నీతి", "ధర్మం", "సత్యం", "సమాజము", "అమ్మ", "ఆటవెలది", "సీస పద్యము", "కవనతేజం", "సాహితీ ప్రవీణ", "కవిత"
];

// Elegant warm gold and ivory palette
const PARTICLE_COLORS = [
  "rgba(244, 235, 208, 0.85)",  // Ivory
  "rgba(212, 175, 55, 0.9)",    // Classic Gold
  "rgba(255, 215, 0, 0.95)",    // Bright Gold
  "rgba(197, 160, 89, 0.75)",   // Muted Gold/Bronze
  "rgba(184, 134, 11, 0.7)",    // Dark Goldenrod
];

interface Particle {
  x: number;
  y: number;
  originX: number; // The relative point in the silhouette (0 to 1)
  originY: number; // The relative point in the silhouette (0 to 1)
  targetX: number; // Computed canvas coordinate based on scale/offset
  targetY: number; // Computed canvas coordinate based on scale/offset
  vx: number;
  vy: number;
  char: string;
  size: number;
  color: string;
  speed: number;
  angle: number;
  spin: number;
  isWord: boolean;
  glow: boolean;
}

export function AuthorSilhouetteCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const silhouettePointsRef = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Store dimensions
  const dimsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    const img = new Image();
    img.src = "/rameshnaidu.png";
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // 1. Process image in a temporary off-screen canvas to extract silhouette points
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Scale down image for sampling to keep particle count reasonable (around 2500-3500)
      const sampleWidth = 160;
      const sampleHeight = Math.round((img.height / img.width) * sampleWidth);
      tempCanvas.width = sampleWidth;
      tempCanvas.height = sampleHeight;

      // Draw image
      tempCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);

      // Analyze pixels
      const imgData = tempCtx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imgData.data;

      // Self-calibrating background color detection
      // Sample corners to estimate background
      const corners = [
        { r: data[0], g: data[1], b: data[2], a: data[3] },
        { r: data[(sampleWidth - 1) * 4], g: data[(sampleWidth - 1) * 4 + 1], b: data[(sampleWidth - 1) * 4 + 2], a: data[(sampleWidth - 1) * 4 + 3] },
        { r: data[(sampleHeight - 1) * sampleWidth * 4], g: data[(sampleHeight - 1) * sampleWidth * 4 + 1], b: data[(sampleHeight - 1) * sampleWidth * 4 + 2], a: data[(sampleHeight - 1) * sampleWidth * 4 + 3] }
      ];

      const avgBg = corners.reduce((acc, curr) => {
        acc.r += curr.r; acc.g += curr.g; acc.b += curr.b; acc.a += curr.a;
        return acc;
      }, { r: 0, g: 0, b: 0, a: 0 });

      avgBg.r /= corners.length;
      avgBg.g /= corners.length;
      avgBg.b /= corners.length;
      avgBg.a /= corners.length;

      const points: { x: number; y: number }[] = [];
      const grid = 2.5; // step size for sampling points

      for (let y = 0; y < sampleHeight; y += grid) {
        for (let x = 0; x < sampleWidth; x += grid) {
          const idx = (Math.floor(y) * sampleWidth + Math.floor(x)) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Check opacity first
          let isPortrait = false;
          if (a < 50) {
            isPortrait = false;
          } else {
            // Distance from estimated background
            const dist = Math.sqrt(
              Math.pow(r - avgBg.r, 2) +
              Math.pow(g - avgBg.g, 2) +
              Math.pow(b - avgBg.b, 2)
            );
            
            // Check if it's different enough from the corner background, or if the pixel is dark/non-white
            const isDark = (r + g + b) / 3 < 200; // If background is white, dark pixels are portrait
            isPortrait = dist > 40 || (avgBg.r > 200 && isDark);
          }

          if (isPortrait) {
            points.push({
              x: x / sampleWidth, // normalize to 0..1
              y: y / sampleHeight // normalize to 0..1
            });
          }
        }
      }

      silhouettePointsRef.current = points;
      setImageLoaded(true);
      initParticles(points);
    };

    // Fallback if image fails to load or takes too long: Generate a majestic silhouette bust profile
    img.onerror = () => {
      console.warn("Could not load author image for silhouette. Using abstract silhouette generation.");
      const points: { x: number; y: number }[] = [];
      // Generate an elegant face silhouette outline + filled shape
      for (let y = 0.15; y < 0.85; y += 0.015) {
        // Simple shape modeling a head and shoulders
        const widthAtY = y < 0.4 
          ? Math.sin((y - 0.15) * Math.PI / 0.5) * 0.15 + 0.1 // Head
          : Math.sin((y - 0.4) * Math.PI / 0.9) * 0.35 + 0.15; // Shoulders
        
        const centerX = 0.5;
        const startX = centerX - widthAtY;
        const endX = centerX + widthAtY;
        for (let x = startX; x <= endX; x += 0.02) {
          points.push({ x, y });
        }
      }
      silhouettePointsRef.current = points;
      setImageLoaded(true);
      initParticles(points);
    };

    const initParticles = (points: { x: number; y: number }[]) => {
      const pCount = Math.max(points.length, 2500);
      const particles: Particle[] = [];

      for (let i = 0; i < pCount; i++) {
        // Map to a point in the silhouette, cycling if points < pCount
        const pt = points[i % points.length];
        
        const char = TELUGU_CHARS[Math.floor(Math.random() * TELUGU_CHARS.length)];
        const isWord = char.length > 2;
        const size = isWord 
          ? Math.random() * 4 + 10  // Words slightly smaller so they fit
          : Math.random() * 8 + 12; // Standard letters

        const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        const glow = Math.random() > 0.85; // 15% particles have extra outer glow

        // Spawn randomly from around the screen
        particles.push({
          x: Math.random() * dimsRef.current.width,
          y: Math.random() * dimsRef.current.height + dimsRef.current.height, // Spawn from bottom
          originX: pt.x,
          originY: pt.y,
          targetX: 0,
          targetY: 0,
          vx: 0,
          vy: 0,
          char,
          size,
          color,
          speed: Math.random() * 0.05 + 0.03,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.01,
          isWord,
          glow
        });
      }

      particlesRef.current = particles;
      updateParticleTargets();
    };

    // Calculate canvas size and update target coordinates
    const handleResize = () => {
      if (!canvas || !container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      dimsRef.current = { width, height };

      // Support high density displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      updateParticleTargets();
    };

    const updateParticleTargets = () => {
      const { width, height } = dimsRef.current;
      const isMobile = width < 768;

      // Position the silhouette:
      // Desktop: Shifted to the right side of the screen
      // Mobile: Centered in the background
      const portraitWidth = isMobile ? width * 0.85 : Math.min(width * 0.48, 550);
      const portraitHeight = portraitWidth * 1.25;

      const offsetX = isMobile 
        ? (width - portraitWidth) / 2 
        : width * 0.52 + (width * 0.45 - portraitWidth) / 2;
      
      const offsetY = isMobile
        ? (height - portraitHeight) / 2 + 30
        : (height - portraitHeight) / 2 + 10;

      particlesRef.current.forEach((p) => {
        p.targetX = p.originX * portraitWidth + offsetX;
        p.targetY = p.originY * portraitHeight + offsetY;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          active: true
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimsRef.current.width, dimsRef.current.height);

      const mouse = mouseRef.current;
      const { width, height } = dimsRef.current;
      const time = Date.now() * 0.001;

      // Mouse influence radius
      const forceRadius = 90;
      // Parallax shifts
      const parallaxX = mouse.active ? (mouse.x - width / 2) * 0.03 : 0;
      const parallaxY = mouse.active ? (mouse.y - height / 2) * 0.03 : 0;

      // Draw a subtle background vignette glow
      const grad = ctx.createRadialGradient(
        width * 0.7, height * 0.5, 50,
        width * 0.7, height * 0.5, width * 0.6
      );
      grad.addColorStop(0, "rgba(212, 175, 55, 0.07)");
      grad.addColorStop(0.5, "rgba(10, 10, 10, 0)");
      grad.addColorStop(1, "rgba(3, 3, 3, 0.4)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Incorporate 3D Parallax target offsets
        const targetXWithParallax = p.targetX + parallaxX;
        const targetYWithParallax = p.targetY + parallaxY;

        // Interaction physics: repulsion from cursor
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && dist < forceRadius) {
          const force = (forceRadius - dist) / forceRadius;
          // Normalize vector
          if (dist === 0) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
          }
          const angle = Math.atan2(dy, dx);
          // Exploding push force
          p.vx += Math.cos(angle) * force * 1.8;
          p.vy += Math.sin(angle) * force * 1.8;
        }

        // Spring force towards target
        const homeDx = targetXWithParallax - p.x;
        const homeDy = targetYWithParallax - p.y;
        
        // Soft hover organic movement (floating breathe effect)
        const breatheX = Math.sin(time + p.angle) * 0.18;
        const breatheY = Math.cos(time * 0.8 + p.angle) * 0.18;

        p.vx += (homeDx * 0.04) + breatheX;
        p.vy += (homeDy * 0.04) + breatheY;

        // Apply friction
        p.vx *= 0.86;
        p.vy *= 0.86;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.save();
        ctx.font = `${p.isWord ? "600" : "400"} ${p.size}px 'Playfair Display', 'Inter', serif`;
        ctx.fillStyle = p.color;

        // Apply slight glow to selected golden letters
        if (p.glow) {
          ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
          ctx.shadowBlur = 8;
        }

        // Translate and draw
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageLoaded]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto bg-[#050505]"
    >
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(197,160,89,0.1),transparent_70%)] pointer-events-none" />
      
      {/* Ambient noise & grid lines to make it feel premium */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}
