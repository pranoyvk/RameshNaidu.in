import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Play, ShieldCheck, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HeroErrorBoundary } from "./HeroErrorBoundary";
import { HeroLoader } from "./HeroLoader";

const HeroScene = lazy(() =>
  import("./HeroScene").then((module) => ({ default: module.HeroScene }))
);

export const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const mouseRef = useMouseParallax(0.05);
  const { scrollProgress } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#040408] text-[#faf8f2] pt-24 pb-16 lg:py-0 select-none"
      aria-label="Hero Showcase"
    >
      {/* Loading Overlay */}
      <HeroLoader isLoading={isLoading} />

      {/* Futuristic Ambient Radial Glow Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[750px] md:h-[750px] bg-gradient-to-tr from-amber-500/15 via-sky-500/10 to-transparent rounded-full blur-[120px] opacity-70" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040408] via-transparent to-[#040408] opacity-80" />
      </div>

      {/* Hero Layout Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[85vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* LEFT COLUMN: Marketing Content */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center text-left pointer-events-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                <span className="text-xs font-mono font-medium tracking-[0.18em] text-[#f3d078] uppercase">
                  THE FUTURE IS 3D
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-white"
            >
              Build Experiences{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] via-[#f3d078] to-[#b08b35]">
                That Feel Alive.
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#dfd7c5]/80 max-w-xl mb-8 leading-relaxed font-light"
            >
              Create immersive digital experiences with beautiful interactive 3D technology.
              Powered by real-time WebGL, physically based shaders, and cinematic responsiveness.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <Button
                asChild
                size="lg"
                className="group relative inline-flex items-center justify-center px-8 py-6 text-sm font-semibold text-black bg-gradient-to-r from-[#d4af37] via-[#f3d078] to-[#b08b35] hover:opacity-95 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Link to="/library">
                  <Sparkles className="w-4 h-4 mr-2 text-black" />
                  Explore Experience
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="inline-flex items-center justify-center px-8 py-6 text-sm font-medium border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.1] hover:border-amber-500/40 rounded-full backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Link to="/about">
                  <Play className="w-4 h-4 mr-2 fill-current text-[#f3d078]" />
                  View Demo
                </Link>
              </Button>
            </motion.div>

            {/* Feature Micro-Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#f3d078]" />
                <span className="text-xs text-[#dfd7c5]/70 font-mono">60 FPS WebGL</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-xs text-[#dfd7c5]/70 font-mono">PBR Shaders</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-[#dfd7c5]/70 font-mono">Interactive Depth</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive 3D Showcase */}
          <div className="lg:col-span-6 h-[480px] sm:h-[550px] lg:h-[650px] w-full flex items-center justify-center relative">
            <HeroErrorBoundary>
              <Suspense fallback={null}>
                <HeroScene
                  mouseRef={mouseRef}
                  scrollProgress={scrollProgress}
                  isMobile={isMobile}
                  onLoaded={() => setIsLoading(false)}
                />
              </Suspense>
            </HeroErrorBoundary>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#dfd7c5]/60">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-9 border border-white/20 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-[#f3d078] rounded-full shadow-[0_0_8px_#f3d078]"
          />
        </div>
      </motion.div>
    </section>
  );
};
