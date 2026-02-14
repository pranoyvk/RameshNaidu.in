import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  blur?: string;
}

export function BlurReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  blur = "10px"
}: BlurRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        filter: `blur(${blur})`,
        y: 20
      }}
      animate={isInView ? {
        opacity: 1,
        filter: "blur(0px)",
        y: 0
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
