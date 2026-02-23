import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { prizes } from "../../data/pdfs";

export function PrizesSlider() {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-black mb-6">
            Honors & <span className="text-black/60">Recognition</span>
          </h2>
          <div className="w-96 h-1.5 bg-gradient-to-r from-transparent via-black/40 to-transparent mx-auto rounded-full" />
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {prizes.map((prize, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-8 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  className="relative group cursor-pointer overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 aspect-[4/5]"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Image */}
                  <img
                    src={prize.image}
                    alt={prize.organization}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />

                  {/* Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${prize.color} opacity-30`} />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white/80 mb-4 tracking-wider uppercase">
                        {prize.year}
                      </div>
                      <p className="text-white/70 text-base font-light italic">
                        {prize.organization}
                      </p>
                    </div>

                    <div className="h-0.5 w-0 group-hover:w-full bg-white/40 transition-all duration-500 rounded-full" />
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
