import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Compass, Layers, CheckSquare, Sparkles } from "lucide-react";
import { PROCESS_DATA } from "../data";

// Select icons dynamically
function ProcessIcon({ idx, className = "w-5 h-5" }: { idx: number; className?: string }) {
  switch (idx) {
    case 0:
      return <Compass className={className} />;
    case 1:
      return <Layers className={className} />;
    case 2:
      return <Calendar className={className} />;
    case 3:
      return <CheckSquare className={className} />;
    case 4:
      return <Sparkles className={className} />;
    default:
      return <Compass className={className} />;
  }
}

export default function Process() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activeStep = PROCESS_DATA[activeStepIdx];

  return (
    <section
      id="process"
      className="py-24 md:py-36 bg-neutral-100 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background Grid Lines to evoke blueprint/ruler aesthetics */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-200 dark:bg-neutral-800/60" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-neutral-200 dark:bg-neutral-800/60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Intro */}
        <div className="max-w-xl mb-20 text-left">
          <span className="text-xs tracking-[0.3em] font-mono uppercase text-gold-500 font-light mb-4 block">
            04 / Operation Workflow
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-900 dark:text-white tracking-wide leading-tight">
            Our Methodological <span className="italic">Chronology</span>
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-450 mt-4 font-light leading-relaxed tracking-wide">
            How we translate your sensory references into immaculate plaster, oak, and travertine geometries. Every stage is highly documented and masterfully executed.
          </p>
        </div>

        {/* Coordinated Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Sticky Blueprint Card explaining active step details (Large Screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 md:p-10 shadow-2xl relative"
          >
            {/* Top architectural stamp */}
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase border-b border-neutral-100 dark:border-neutral-800 pb-5 mb-6">
              <span>AURA SYSTEM SPEC</span>
              <span>PHASE {activeStep.step} / 05</span>
            </div>

            {/* Content Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIdx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Active index & Title */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold-400 text-neutral-950 font-serif font-light text-lg flex items-center justify-center">
                    {activeStep.step}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-neutral-900 dark:text-white font-light uppercase tracking-wider">
                      {activeStep.title}
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-500 font-semibold block mt-1">
                      ESTIMATED SPAN: {activeStep.duration}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed tracking-wide">
                  {activeStep.description}
                </p>

                <div className="p-5 bg-neutral-50 dark:bg-neutral-800/50 border-l-[3px] border-gold-400">
                  <span className="text-[9px] uppercase font-mono text-neutral-400 block mb-2 tracking-widest">Atelier Directive</span>
                  <p className="text-neutral-500 dark:text-neutral-350 text-xs font-light leading-relaxed tracking-wide">
                    {activeStep.detailText}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Graphic Stamps */}
            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-[8px] font-mono text-neutral-400 tracking-wider">
              <span>AURA INTERIORS ATELIER REGISTRY</span>
              <span>CERTIFIED ARCH</span>
            </div>
          </motion.div>

          {/* RIGHT: Aligned Chronological List */}
          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-6 relative"
          >
            {/* Visual background timeline coordinate line spanning all children cards */}
            <div className="absolute top-8 bottom-8 left-8 md:left-12 w-[1px] bg-neutral-200 dark:bg-neutral-800 pointer-events-none" />

            {PROCESS_DATA.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <motion.button
                  key={step.step}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    }
                  }}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`relative flex items-start gap-6 md:gap-10 p-6 md:p-8 text-left border cursor-pointer w-full transition-all duration-300 ${
                    isActive
                      ? "bg-white dark:bg-neutral-900 border-gold-400 shadow-xl"
                      : "bg-transparent border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 hover:bg-neutral-250 dark:hover:bg-neutral-900/30"
                  }`}
                >
                  {/* Circle Step Number & Indicator Pin */}
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-mono text-sm md:text-base border transition-all duration-500 ${
                        isActive
                          ? "bg-gold-400 text-neutral-950 border-gold-400 font-semibold"
                          : "bg-neutral-200 dark:bg-neutral-900 text-neutral-500 border-neutral-300 dark:border-neutral-800"
                      }`}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Main descriptive block summary */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4
                        className={`font-serif text-base md:text-xl font-light tracking-wide transition-colors duration-300 ${
                          isActive ? "text-gold-500" : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed line-clamp-2 gap-4">
                      {step.description}
                    </p>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[11px] font-mono tracking-wider text-gold-500 pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-2 block lg:hidden uppercase h-4"
                      >
                        Active spec details fully listed in panel
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
