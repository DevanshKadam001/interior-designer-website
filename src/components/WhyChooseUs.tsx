import { useState } from "react";
import { motion } from "motion/react";
import { PenTool, Gem, Maximize2, Compass, ShieldCheck } from "lucide-react";
import { CHOOSE_FACTORS } from "../data";

function FactorIcon({ name, className = "w-5 h-5 text-gold-450" }: { name: string; className?: string }) {
  switch (name) {
    case "PenTool":
      return <PenTool className={className} />;
    case "Gem":
      return <Gem className={className} />;
    case "Maximize2":
      return <Maximize2 className={className} />;
    case "Compass":
      return <Compass className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    default:
      return <Compass className={className} />;
  }
}

export default function WhyChooseUs() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Split factors to make a lovely grid spacing.
  // We can make them look outstanding by setting some bento-grid-like styling classes.
  return (
    <section
      id="why-us"
      className="py-24 md:py-36 bg-neutral-100 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative"
    >
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-200 dark:bg-neutral-800/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Intro Tag */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div className="max-w-xl">
            <span className="text-xs tracking-[0.3em] font-mono uppercase text-gold-500 font-light mb-4 block">
              06 / Excellence Standard
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-900 dark:text-white tracking-wide leading-tight">
              Why Collectors Commit to Our <span className="italic">Vision</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light max-w-sm leading-relaxed tracking-wide">
            We operate at the highest thresholds of physical calibration, material sustainability, and aesthetic clarity.
          </p>
        </div>

        {/* Bento Board Grid */}
        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-6 gap-8"
        >
          
          {CHOOSE_FACTORS.map((factor, index) => {
            // Let's make index 0 and 4 double-weight columns for visual rhythm
            const isWide = index === 0 || index === 4;
            const isHovered = hoveredIdx === index;

            return (
              <motion.div
                key={factor.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.0,
                      ease: [0.16, 1, 0.3, 1],
                    }
                  }
                }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 p-8 md:p-10 transition-all duration-500 h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold-400/50 ${
                  isWide ? "md:col-span-3 lg:col-span-3" : "md:col-span-3 lg:col-span-3"
                }`}
                style={{ minHeight: "260px" }}
              >
                {/* Lateral Brass Accents */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-400"
                  initial={{ height: 0 }}
                  animate={{ height: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />

                {/* Ambient Soft Halo Backdrop */}
                <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-gold-400/[0.005] group-hover:bg-gold-400/[0.02] blur-2xl pointer-events-none transition-all" />

                <div>
                  {/* Icon Panel with clean spacing */}
                  <div className="inline-flex p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 text-gold-500 mb-6">
                    <FactorIcon name={factor.iconName} className="w-5 h-5 stroke-[1.25]" />
                  </div>

                  {/* Factor Title */}
                  <h3 className="text-lg md:text-xl font-serif text-neutral-900 dark:text-white tracking-wide font-light mb-4 whitespace-pre-line">
                    {factor.title}
                  </h3>
                </div>

                {/* Factor Description */}
                <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed tracking-wide mt-auto">
                  {factor.description}
                </p>
              </motion.div>
            );
          })}

        </motion.div>
      </div>
    </section>
  );
}
