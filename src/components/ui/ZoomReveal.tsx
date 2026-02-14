import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ZoomRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  initialScale?: number;
}

export function ZoomReveal({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  initialScale = 0.9
}: ZoomRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: initialScale
      }}
      animate={isInView ? {
        opacity: 1,
        scale: 1
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
