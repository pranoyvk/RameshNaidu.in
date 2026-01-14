import { Link } from "react-router-dom";
import { ArrowRight, PenTool, Heart, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                <img
                  src="/rameshnaidu.png"
                  alt="The Author"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-2xl -z-10" />
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="right">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                About the Author
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-6">
                A Lifetime of Stories & Wisdom
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                With a deep passion for writing and sharing knowledge, these books
                represent years of reflection, experience, and the desire to leave
                something meaningful for future generations. Each page is infused
                with insights gathered over a lifetime.
              </p>

              {/* Highlights */}
              <div className="space-y-4 mb-8">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" variant="outline" className="group">
                <Link to="/about">
                  Read Full Story
                  <motion.span className="inline-block ml-2" whileHover={{ x: 4 }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
