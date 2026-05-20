import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Fine-tuned scroll transformations for an elegant 3D layered parallax depth feel
  const yBg = useTransform(scrollY, [0, 1000], [0, 280]);
  const yText = useTransform(scrollY, [0, 1000], [0, -180]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1.05, 1.25]);
  const rotateBg = useTransform(scrollY, [0, 1000], [0, 3]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background Image with Cinematic Pan, Zoom, and Live Scroll Parallax */}
      <motion.div
        style={{
          backgroundImage: `url('/src/assets/images/hero_interior_1779263324243.png')`,
          y: yBg,
          scale: scaleBg,
          rotate: rotateBg,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center origin-center"
      />

      {/* Luxury overlay gradient to ensure text readability (WCAG AA/AAA compliance) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 via-neutral-950/75 to-neutral-950/90 backdrop-blur-[3px]" />

      {/* Floating Ambient Lighting Accent */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gold-400/10 blur-[150px] z-10 pointer-events-none" />

      {/* Main Copy Area with smooth scroll parallax fade */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center"
      >
        {/* Over-title Sub-identifier */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-8 bg-gold-400" />
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-mono text-gold-300 font-light">
            Aura Architecture Atelier
          </span>
          <span className="h-[1px] w-8 bg-gold-400" />
        </motion.div>

        {/* Elegant Headline in Cormorant Garamond */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light text-white leading-tight tracking-[0.02em] max-w-5xl mb-8">
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Designing Spaces
          </motion.span>
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block italic font-light text-neutral-200"
          >
            That Inspire
          </motion.span>
        </h1>

        {/* premium subtitles */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-sm sm:text-base md:text-lg text-neutral-300 font-light tracking-[0.05em] max-w-2xl mb-12 leading-relaxed"
        >
          We choreograph spatial volume, raw travertine blocks, and whispering daylight to shape absolute architectural stillness. Discover quiet luxury in quiet detail.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
        >
          {/* Main Call to Action: View Projects */}
          <a
            href="#portfolio"
            onClick={(e) => handleSmoothScroll(e, "#portfolio")}
            className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] bg-white text-neutral-950 border border-white hover:bg-transparent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </a>

          {/* Secondary Call to Action: Book Consultation */}
          <a
            href="#consultation"
            onClick={(e) => handleSmoothScroll(e, "#consultation")}
            className="w-full sm:w-auto px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-200 border border-white/20 hover:border-gold-300 hover:text-white rounded-none bg-neutral-950/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Book Consultation
          </a>
        </motion.div>
      </motion.div>

      {/* Scrolling Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-neutral-400">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gold-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
