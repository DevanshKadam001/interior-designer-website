import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Award, Compass, Feather } from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ target, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Dynamic parallax transforms for overlapping magazine blocks
  const yImage1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-36 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-500 overflow-hidden"
    >
      {/* background noise accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Overlapping Magazine-Style Gallery */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={{ y: yImage1 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-4/5 w-full max-w-md mx-auto z-10 border border-neutral-200/50 dark:border-neutral-800 shadow-xl overflow-hidden group"
            >
              {/* Main Image: Architectural Detail */}
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
                alt="Minimal travertine corridor"
                className="w-full h-full object-cover grayscale-25 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-900/10 mix-blend-multiply" />
            </motion.div>

            {/* Overlapping Secondary Image: Detail Shot */}
            <motion.div
              style={{ y: yImage2 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-4 md:-right-8 w-1/2 aspect-3/4 z-20 border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden block bg-neutral-900"
            >
              <img
                src="https://images.unsplash.com/photo-1621293954908-907141467fc7?auto=format&fit=crop&q=80&w=600"
                alt="Plaster wall and raw clay vase"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Accent Gold Geometric Ring */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-gold-400/20 z-0 pointer-events-none hidden md:block" />
          </div>

          {/* Right Column: Studio Heritage Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Section Tag */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs tracking-[0.3em] font-mono uppercase text-gold-500 font-light mb-4 block"
            >
              01 / Studio Manifesto
            </motion.span>

            {/* Founder/Aesthetic Title */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-light text-neutral-900 dark:text-neutral-100 tracking-wide mb-8 leading-tight"
            >
              We believe a room is not merely a coordinate—it is an <span className="italic font-light">emotional envelope</span>.
            </motion.h2>

            {/* Story Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-light tracking-[0.03em] leading-relaxed mb-12"
            >
              <p>
                Founded in 2014 by architectural designer Elena Rostova, Aura Interiors operates at the boundary of structural minimalism and sensory warmth. We craft residential estates and high-end boutique properties that prioritize breathing room, spatial silence, and organic textures over excess ornamentation.
              </p>
              <p>
                Each project begins as an audit of daylight. We observe how the coordinates shape light throughout the seasons, then layout travertine volumes, hand-applied lime plaster, and custom timber joinery to choreograph a seamless interior flow.
              </p>
            </motion.div>

            {/* Deluxe Animated Counters Section */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              {/* Statistic 01 */}
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-serif font-light text-gold-500 mb-2">
                  <AnimatedCounter target={200} suffix="+" />
                </span>
                <span className="text-[10px] md:text-xs uppercase font-mono tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Global Projects
                </span>
              </div>

              {/* Statistic 02 */}
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-serif font-light text-gold-500 mb-2">
                  <AnimatedCounter target={12} suffix="+" />
                </span>
                <span className="text-[10px] md:text-xs uppercase font-mono tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Years of Studio
                </span>
              </div>

              {/* Statistic 03 */}
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-serif font-light text-gold-500 mb-2">
                  <AnimatedCounter target={98} suffix="%" />
                </span>
                <span className="text-[10px] md:text-xs uppercase font-mono tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Satisfied Clients
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
