import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (targetIdx: number) => {
    setDirection(targetIdx > index ? 1 : -1);
    setIndex(targetIdx);
  };

  const activeTestimonial = TESTIMONIALS_DATA[index];

  // Motion variants for sliding reviews
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative"
    >
      {/* Background radial soft light gradient */}
      <div className="absolute inset-0 bg-radial-to-b from-transparent via-neutral-100/50 dark:via-neutral-950/20 to-transparent pointer-events-none" />

      {/* Floating minimal quote glyph */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-gold-300/[0.12] dark:text-gold-400/[0.04] select-none pointer-events-none">
        <Quote className="w-64 h-64 rotate-180 stroke-[0.25]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Module Title */}
        <span className="text-xs tracking-[0.3em] font-mono uppercase text-gold-500 font-light mb-8 block text-center">
          05 / Collector Testimony
        </span>

        {/* Carousel Window */}
        <div className="relative w-full min-h-[300px] flex items-center justify-center text-center px-4 md:px-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Star Indicators */}
              <div className="flex gap-1.5 mb-6 text-gold-450">
                {Array.from({ length: activeTestimonial.rating }).map((_, sIdx) => (
                  <span key={sIdx} className="text-xs">★</span>
                ))}
              </div>

              {/* Majestic Quote Text in Cormorant Garamond */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-neutral-900 dark:text-neutral-100 italic leading-relaxed tracking-wide mb-8">
                “{activeTestimonial.quote}”
              </blockquote>

              {/* Client Detail Block */}
              <div className="flex flex-col gap-1 items-center">
                <span className="text-sm font-light tracking-[0.15em] uppercase text-neutral-950 dark:text-neutral-200">
                  {activeTestimonial.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-450 uppercase uppercase-sans">
                  {activeTestimonial.role} — {activeTestimonial.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tactile navigation arrows & Pagination dots */}
        <div className="flex flex-col items-center gap-6 mt-12 w-full max-w-xs justify-center">
          
          <div className="flex items-center justify-between w-full">
            {/* Prev arrow Button */}
            <button
              onClick={handlePrev}
              className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-none bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 hover:border-gold-400 hover:text-gold-450 transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Bullet Indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((_, dIdx) => (
                <button
                  key={dIdx}
                  onClick={() => handleDotClick(dIdx)}
                  className={`h-[4px] transition-all duration-500 ${
                    index === dIdx ? "w-8 bg-gold-400" : "w-2 bg-neutral-300 dark:bg-neutral-800"
                  }`}
                  aria-label={`Go to slide ${dIdx + 1}`}
                />
              ))}
            </div>

            {/* Next arrow Button */}
            <button
              onClick={handleNext}
              className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-none bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 hover:border-gold-400 hover:text-gold-450 transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
