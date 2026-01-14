import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfCard } from "@/components/library/PdfCard";
import { pdfDocuments } from "@/data/pdfs";

export function FeaturedDocuments() {
  const featuredDocs = pdfDocuments.slice(0, 3);

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                My Writings
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Explore our collection of writings, each one crafted with care
                and filled with profound insights.
              </p>
            </div>
            <Button asChild variant="outline" className="group w-fit">
              <Link to="/library">
                View All Documents
                <motion.span className="inline-block ml-2" whileHover={{ x: 4 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredDocs.map((doc, index) => (
            <ScrollReveal key={doc.id} delay={index * 0.1}>
              <PdfCard pdf={doc} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
