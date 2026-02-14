import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { pdfDocuments } from "@/data/pdfs";

export function LibraryHero() {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[93vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Interactive Background - Desktop Only */}
      {!isMobile && <InteractiveBackground />}

      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center pointer-events-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 text-white">
              <LibraryBig className="w-10 h-10" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-white"
          >
            పత్తిపాటి రమేష్ నాయుడు{" "}
            <span className="text-white/80">రచనలు</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Explore a curated collection of PDF documents written with love and wisdom.
            Each document is a journey through thoughts, stories, and life lessons
            meant to inspire and enlighten.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-10"
          >
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-white">{pdfDocuments?.length}</div>
              <div className="text-sm text-white/60">Documents</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-white">1000+</div>
              <div className="text-sm text-white/60">Pages</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-white">Free</div>
              <div className="text-sm text-white/60">Downloads</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group text-base px-8 bg-white text-black hover:bg-white/90">
              <Link to="/library">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Library
                <motion.span
                  className="inline-block ml-2"
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 border-white/20 bg-white/90 text-black">
              <Link to="/about">Learn About the Author</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
