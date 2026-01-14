import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfCard } from "@/components/library/PdfCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pdfDocuments, pdfCategories } from "@/data/pdfs";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDocs = useMemo(() => {
    return pdfDocuments.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <PageTransition>
        {/* Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-secondary/50 to-transparent">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                  <FileText className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  Document Library
                </h1>
                <p className="text-lg text-muted-foreground">
                  Browse and download our collection of philosophical writings and reflections.
                  All documents are free to download and share.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b sticky top-16 md:top-20 bg-background/95 backdrop-blur-lg z-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {pdfCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Document Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {filteredDocs.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-8">
                  Showing {filteredDocs.length} document{filteredDocs.length !== 1 ? "s" : ""}
                </p>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredDocs.map((doc, index) => (
                      <PdfCard key={doc.id} pdf={doc} index={index} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-semibold mb-2">No documents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default Library;
