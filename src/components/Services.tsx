import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Briefcase, ChefHat, Bed, Compass, Layers, Check, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "../data";
import { Service } from "../types";

// Dynamic Icon Lookup helper to bypass string imports
function ServiceIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case "Home":
      return <Home className={className} />;
    case "Briefcase":
      return <Briefcase className={className} />;
    case "ChefHat":
      return <ChefHat className={className} />;
    case "Bed":
      return <Bed className={className} />;
    case "Compass":
      return <Compass className={className} />;
    case "Layers":
      return <Layers className={className} />;
    default:
      return <Compass className={className} />;
  }
}

export default function Services() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="py-24 md:py-36 bg-neutral-100 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Structural Accent Lines */}
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-neutral-200/50 dark:bg-neutral-900/30 z-0 pointer-events-none" />
      <div className="absolute top-0 left-3/4 h-full w-[1px] bg-neutral-200/50 dark:bg-neutral-900/30 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block with Whitespace */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] font-mono uppercase text-gold-500 font-light block mb-4">
              02 / Services Suite
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-900 dark:text-white tracking-wide leading-tight">
              A Complete Architectural <span className="italic">Spatial Masterclass</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light max-w-sm tracking-wide leading-relaxed">
            From the initial sensory brief to placing the final sculpture, we curate high-end coordinates with obsessive refinement.
          </p>
        </div>

        {/* Services Bento Grid */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((service, index) => {
            const isHovered = hoveredCardId === service.id;
            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.0,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="relative bg-white/50 backdrop-blur-md dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-white/[0.04] p-8 md:p-10 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group overflow-hidden shadow-sm"
                style={{ minHeight: "380px" }}
              >
                {/* Gold Top line effect */}
                <motion.div
                  className="absolute top-0 left-0 h-[3px] bg-gold-400"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />

                {/* Ambient Card Background Glow on Hover */}
                <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-gold-450/5 dark:bg-gold-400/[0.01] blur-[60px] group-hover:bg-gold-450/10 group-hover:blur-[80px] transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Icon Box with elegant spacing */}
                  <div className="mb-8 flex justify-between items-center">
                    <div className="p-3 bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/30 dark:border-neutral-700/30 text-gold-500 transition-colors duration-500">
                      <ServiceIcon name={service.iconName} className="w-6 h-6 stroke-[1.25]" />
                    </div>
                    {/* Index Sequence Number in JetBrains Mono */}
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
                      Atelier / {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-light tracking-wide text-neutral-900 dark:text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed tracking-wide mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Elegant expansion with subservice checklists */}
                <div className="mt-auto pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 block mb-1">
                    Atelier Scope
                  </span>
                  <ul className="space-y-2">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2.5 text-xs text-neutral-500 dark:text-neutral-450 font-light tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60 shrink-0" />
                        <span className="truncate">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
