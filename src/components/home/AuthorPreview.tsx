import { Link } from "react-router-dom";
import { ArrowRight, PenTool, Heart, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ZoomReveal } from "@/components/ui/ZoomReveal";
import { BlurReveal } from "@/components/ui/BlurReveal";

const highlights = [
  {
    icon: PenTool,
    title: "Passionate Writer",
    description: "Decades of writing experience across multiple genres",
  },
  {
    icon: Heart,
    title: "Written with Love",
    description: "Every book is a labor of love, meant to inspire",
  },
  {
    icon: BookOpen,
    title: "Free to Read",
    description: "All books available for free download and sharing",
  },
];

export function AuthorPreview() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <ZoomReveal duration={0.8}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary shadow-2xl">
                <img
                  src="/rameshnaidu.png"
                  alt="The Author"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-3xl -z-10"
              />
              <motion.div
                animate={{ rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-3xl -z-10"
              />
            </div>
          </ZoomReveal>

          {/* Content Side */}
          <div>
            <ScrollReveal direction="right">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                About the Author
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mt-3 mb-6">
                A Lifetime of Stories & Wisdom
              </h2>
            </ScrollReveal>

            <BlurReveal delay={0.2} blur="15px">
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                With a deep passion for writing and sharing knowledge, these books
                represent years of reflection, experience, and the desire to leave
                something meaningful for future generations. Each page is infused
                with insights gathered over a lifetime.
              </p>
            </BlurReveal>

            {/* Highlights */}
            <div className="space-y-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-default"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <ScrollReveal delay={0.6} direction="up">
              <Button asChild size="lg" variant="outline" className="group rounded-full px-8">
                <Link to="/about">
                  Read Full Story
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
