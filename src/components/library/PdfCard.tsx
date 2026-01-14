import { useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, Calendar, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import type { PdfDocument } from "@/data/pdfs";

interface PdfCardProps {
  pdf: PdfDocument;
  index?: number;
}

export function PdfCard({ pdf, index = 0 }: PdfCardProps) {
  const [isViewing, setIsViewing] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Document Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        <img
          src={pdf.coverImage}
          alt={`Cover of ${pdf.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />

        {/* Quick Actions Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Dialog open={isViewing} onOpenChange={setIsViewing}>
            <DialogTrigger asChild>
              <Button className="w-full max-w-[160px] gap-2 shadow-lg" size="sm">
                <Eye className="w-4 h-4" />
                Read Online
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden">
              <DialogHeader className="px-6 py-4 border-b">
                <DialogTitle className="font-serif text-xl">{pdf.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  Online viewer for {pdf.title}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 w-full h-full overflow-hidden bg-muted relative">
                <object
                  data={`${pdf.pdfUrl}#view=FitH`}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-lg mb-4">Your browser doesn't support PDF embedding.</p>
                    <Button asChild>
                      <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer">
                        Open PDF in New Tab
                      </a>
                    </Button>
                  </div>
                </object>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            asChild
            variant="secondary"
            className="w-full max-w-[160px] gap-2 shadow-sm"
            size="sm"
          >
            <a href={pdf.pdfUrl} download={`${pdf.title}.pdf`}>
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </Button>
        </motion.div>

        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary shadow-sm">
          {pdf.category}
        </Badge>
      </div>

      {/* Document Info */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {pdf.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {pdf.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {pdf.publishedYear}
          </span>
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            {pdf.pages} pages
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {pdf.language}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
