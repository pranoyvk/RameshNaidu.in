import { useEffect, useRef } from "react";

const TELUGU_GLYPHS = [
  "అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ",
  "క", "ఖ", "గ", "ఘ", "చ", "ఛ", "జ", "ఝ", "ట", "ఠ", "డ", "ఢ",
  "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర",
  "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "ఱ",
  "కవిత", "సాహిత్యం", "జ్ఞానం", "పుస్తకం", "శతకం", "పద్యం"
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  text: string;
  type: "glyph" | "dust";
  alpha: number;
  decay: number;
  angle: number;
  spin: number;
  hue: number;
}

export function TeluguParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 120;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Helper to generate a particle
    const createParticle = (initAtBottom = false): Particle => {
      const type = Math.random() > 0.4 ? "dust" : "glyph";
      const size = type === "glyph" 
        ? Math.floor(Math.random() * 14) + 12 // Glyphs: 12px to 26px
        : Math.random() * 3 + 1;             // Dust: 1px to 4px

      // Spawn from the bottom center (where the book is) or randomly if initializing
      const x = initAtBottom
        ? canvas.width / 2 + (Math.random() - 0.5) * 150
        : Math.random() * canvas.width;
      
      const y = initAtBottom
        ? canvas.height - 20 - Math.random() * 40
        : Math.random() * canvas.height;

      // Base velocities (floating upward)
      const vx = (Math.random() - 0.5) * 0.8;
      const vy = -(Math.random() * 1.2 + 0.5); // float up

      return {
        x,
        y,
        vx,
        vy,
        size,
        text: TELUGU_GLYPHS[Math.floor(Math.random() * TELUGU_GLYPHS.length)],
        type,
        alpha: Math.random() * 0.5 + 0.3,
        decay: Math.random() * 0.002 + 0.001,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        hue: Math.random() > 0.8 ? 45 : 38 // Goldish hues (38-45)
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(false));
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse tracking
      const mouse = mouseRef.current;
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Draw light source glow at bottom center
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height - 40, 10,
        canvas.width / 2, canvas.height - 40, 200
      );
      gradient.addColorStop(0, "rgba(212, 175, 55, 0.15)");
      gradient.addColorStop(0.5, "rgba(212, 175, 55, 0.05)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height - 40, 200, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particles.forEach((p, idx) => {
        // Move particle
        p.y += p.vy;
        p.x += p.vx;
        p.angle += p.spin;
        p.alpha -= p.decay;

        // Mouse interaction: push away or stir
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 150;

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            const angle = Math.atan2(dy, dx);
            // Push away
            p.x += Math.cos(angle) * force * 2;
            p.y += Math.sin(angle) * force * 2;
            // Add a bit of lift
            p.y -= force * 0.5;
          }
        }

        // Add subtle horizontal wave motion
        p.x += Math.sin(p.y * 0.01 + p.angle) * 0.2;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === "glyph") {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle * 0.2); // subtle rotation
          
          // Glow effect for letters
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsla(${p.hue}, 80%, 60%, ${p.alpha})`;
          ctx.fillStyle = `hsla(${p.hue}, 70%, 75%, ${p.alpha})`;
          ctx.font = `${p.size}px 'Playfair Display', 'Noto Sans Telugu', serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.text, 0, 0);
        } else {
          // Dust particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(212, 175, 55, ${p.alpha})`;
          ctx.fillStyle = `rgba(255, 235, 180, ${p.alpha})`;
          ctx.fill();
        }

        ctx.restore();

        // Recycle particle if out of bounds or faded out
        if (p.y < -50 || p.x < -50 || p.x > canvas.width + 50 || p.alpha <= 0) {
          particles[idx] = createParticle(true);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
