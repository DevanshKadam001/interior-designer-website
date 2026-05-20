import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: Enter, 1: Spacing Out, 2: Fade Out

  useEffect(() => {
    // Progress counter simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const nextTimer = setTimeout(() => {
        setPhase(1);
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 1200);
        return () => clearTimeout(completeTimer);
      }, 500);
      return () => clearTimeout(nextTimer);
    }
  }, [progress, onComplete]);

  return (
    <div id="preloader-overlay" className="fixed inset-0 bg-neutral-950 text-neutral-100 flex flex-col justify-between p-8 md:p-16 z-[9999]">
      {/* Top Brand Tag */}
      <div className="flex justify-between items-center text-xs tracking-[0.25em] text-neutral-500 font-mono">
        <span>AURA — DESIGN REGISTRY</span>
        <span>EST. 2014</span>
      </div>

      {/* Middle Animated Title */}
      <div className="text-center overflow-hidden">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <motion.h1
            className="text-6xl md:text-9xl font-serif tracking-[0.3em] font-light text-neutral-200"
            animate={{
              letterSpacing: phase >= 1 ? "0.45em" : "0.25em",
              opacity: phase >= 1 ? 0 : 1,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            AURA
          </motion.h1>
        </motion.div>
        
        <p className="text-sm font-light uppercase tracking-[0.4em] text-neutral-400 mt-6 h-4 overflow-hidden">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="block"
          >
            Atmospheric Architecture
          </motion.span>
        </p>
      </div>

      {/* Bottom Counter and Progress bar */}
      <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-end font-mono text-xs text-neutral-500">
          <span>ATMOSPHERE INIT...</span>
          <span className="text-neutral-300 tabular-nums">{progress}%</span>
        </div>
        <div className="h-[1px] w-full bg-neutral-800 relative overflow-hidden">
          <motion.div
            className="h-full bg-gold-400"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
