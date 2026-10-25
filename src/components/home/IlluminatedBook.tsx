import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Spark {
  id: number;
  x: number; // percentage width
  size: number;
  duration: number;
  delay: number;
  distance: number;
}

export function IlluminatedBook() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  // Periodically generate rising sparkles from the book spine
  useEffect(() => {
    const generateSparks = () => {
      const newSparks: Spark[] = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: Math.random() * 80 + 10, // distribute across book center
        size: Math.random() * 4 + 2, // 2px to 6px
        duration: Math.random() * 3 + 2, // 2s to 5s
        delay: Math.random() * 2,
        distance: Math.random() * 150 + 200, // rise up 200px to 350px
      }));
      setSparks((prev) => [...prev.slice(-30), ...newSparks]);
    };

    generateSparks();
    const interval = setInterval(generateSparks, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[500px] mx-auto py-12">
      
      {/* 1. Cinematic Light Beams & Glow emitting from the book */}
      <div className="absolute bottom-[40px] w-[200px] h-[350px] pointer-events-none z-10">
        {/* Central Core Ray */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[250px] bg-gradient-to-t from-yellow-300 via-amber-400/40 to-transparent blur-md opacity-80 animate-pulse" />
        
        {/* Wide Soft Glow Cone */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[300px] bg-gradient-to-t from-amber-500/20 via-yellow-400/5 to-transparent blur-2xl origin-bottom" 
          style={{ transform: "rotate(0deg) scaleX(1.8)" }}
        />
        
        {/* Secondary flared light beams */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-[220px] bg-gradient-to-t from-white/30 to-transparent blur-[1px] rotate-[15deg] origin-bottom opacity-60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-[220px] bg-gradient-to-t from-white/30 to-transparent blur-[1px] -rotate-[15deg] origin-bottom opacity-60" />
      </div>

      {/* 2. Floating Sparks / Particles rising from the book gutter */}
      <div className="absolute bottom-[40px] w-[260px] h-[350px] overflow-hidden pointer-events-none z-20">
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{ x: `${spark.x}%`, y: 350, opacity: 0, scale: 0.5 }}
              animate={{
                y: 350 - spark.distance,
                opacity: [0, 0.8, 0.8, 0],
                scale: [0.5, 1.2, 0.8, 0.2],
                x: `calc(${spark.x}% + ${Math.sin(spark.id) * 30}px)`
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: spark.duration,
                delay: spark.delay,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                width: spark.size,
                height: spark.size,
                borderRadius: "50%",
                background: "radial-gradient(circle, #fff 0%, #d4af37 60%, rgba(212,175,55,0) 100%)",
                boxShadow: "0 0 8px #d4af37, 0 0 15px #ffdb70",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 3. 3D Open Book Canvas Container */}
      <div 
        className="relative w-full h-[140px] pointer-events-auto cursor-pointer"
        style={{ perspective: "1200px" }}
      >
        {/* Inner book assembly with 3D slant */}
        <motion.div 
          initial={{ rotateX: 20 }}
          whileHover={{ rotateX: 26, y: -4 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-full h-full flex justify-center items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Shadow below the book */}
          <div className="absolute -bottom-4 w-[92%] h-12 bg-black/60 blur-xl rounded-full transform -rotateX-90 -translate-z-20 pointer-events-none" />

          {/* Book Cover / Backing */}
          <div 
            className="absolute w-[94%] h-[90%] bg-gradient-to-r from-[#4a3511] via-[#855e1d] to-[#4a3511] rounded-[6px] border border-amber-900/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            style={{ 
              transform: "translateZ(-8px)",
            }}
          />

          {/* Spine center binding */}
          <div 
            className="absolute w-6 h-[88%] bg-gradient-to-r from-black/80 via-amber-950 to-black/80 z-20"
            style={{ transform: "translateZ(0px)" }}
          />

          {/* Left Page (slanted up towards reader) */}
          <div 
            className="absolute right-1/2 w-[45%] h-[85%] origin-right rounded-l-[4px] bg-gradient-to-l from-[#faf8f2] via-[#f0eae0] to-[#dfd7c5] px-4 py-3 flex flex-col justify-between overflow-hidden shadow-[-8px_4px_12px_rgba(0,0,0,0.4)] border-y border-l border-amber-900/10"
            style={{ 
              transform: "rotateY(16deg) translateZ(1px)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Elegant aging page border */}
            <div className="absolute inset-[3px] border border-amber-800/10 rounded-l-[2px] pointer-events-none" />
            
            {/* Page content */}
            <div className="flex flex-col gap-1 text-[7px] text-[#423116]/80 font-serif leading-relaxed select-none">
              <span className="text-[9px] font-bold text-[#b08b35] block mb-1">ఆటవెలది పద్యము</span>
              <p>ఉప్పుకప్పురంబు నొక్క పోలిక నుండు</p>
              <p>చూడ చూడ రుచులు జాడ వేరు</p>
              <p>పురుషులందు పుణ్యపురుషులు వేరయా</p>
              <p>విశ్వదాభిరామ వినుర వేమ!</p>
            </div>
            
            <div className="flex justify-between items-center text-[5px] text-[#423116]/40 uppercase tracking-widest mt-auto border-t border-amber-800/15 pt-1">
              <span>శతకము</span>
              <span>పుట ౧</span>
            </div>
          </div>

          {/* Right Page (slanted up towards reader) */}
          <div 
            className="absolute left-1/2 w-[45%] h-[85%] origin-left rounded-r-[4px] bg-gradient-to-r from-[#faf8f2] via-[#f0eae0] to-[#dfd7c5] px-4 py-3 flex flex-col justify-between overflow-hidden shadow-[8px_4px_12px_rgba(0,0,0,0.4)] border-y border-r border-amber-900/10"
            style={{ 
              transform: "rotateY(-16deg) translateZ(1px)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Elegant aging page border */}
            <div className="absolute inset-[3px] border border-amber-800/10 rounded-r-[2px] pointer-events-none" />

            {/* Page content */}
            <div className="flex flex-col gap-1 text-[7px] text-[#423116]/80 font-serif leading-relaxed select-none">
              <span className="text-[9px] font-bold text-[#b08b35] block mb-1">తెలుగు వెలుగు</span>
              <p>తేట తేట తెలుగు లలిత పదములు</p>
              <p>భావములను మీటు మధుర సుధలు</p>
              <p>అమ్మ నేర్పినట్టి అమృత భాషరా</p>
              <p>తెలుగు భాష నెరిగి వెలుగు మీరరా!</p>
            </div>

            <div className="flex justify-between items-center text-[5px] text-[#423116]/40 uppercase tracking-widest mt-auto border-t border-amber-800/15 pt-1">
              <span>రచనలు</span>
              <span>పుట ౨</span>
            </div>
          </div>

          {/* Ribbon Bookmark draped from spine */}
          <div 
            className="absolute left-1/2 w-2.5 h-[110%] bg-gradient-to-b from-[#8f1d1d] via-[#b82525] to-[#591010] z-30 origin-top shadow-md rounded-b-[2px]"
            style={{ 
              top: "8%",
              transform: "translateX(-50%) rotateX(-10deg) translateZ(4px)" 
            }}
          />

        </motion.div>
      </div>

      {/* Book base reflections / light spread indicator */}
      <span className="text-[10px] text-amber-500/50 uppercase tracking-[0.25em] font-medium font-sans mt-4 animate-pulse pointer-events-none">
        జ్ఞాన దీపము
      </span>
    </div>
  );
}
