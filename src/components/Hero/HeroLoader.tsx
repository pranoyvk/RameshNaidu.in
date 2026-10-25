import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroLoaderProps {
  isLoading: boolean;
  progress?: number;
}

export const HeroLoader: React.FC<HeroLoaderProps> = ({ isLoading, progress = 100 }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#040408] backdrop-blur-xl pointer-events-none"
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Ambient background glow */}
            <div className="absolute -inset-10 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

            {/* Glowing loader ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-amber-500/20" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4af37] border-r-[#f3d078]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
              <Sparkles className="w-6 h-6 text-[#d4af37] animate-pulse" />
            </div>

            {/* Text label */}
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#dfd7c5]/80 font-medium">
                Initializing 3D Experience
              </span>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#d4af37] via-[#f3d078] to-[#b08b35]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
