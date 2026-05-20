import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer id="footer-section" className="bg-neutral-950 text-neutral-400 py-16 md:py-24 border-t border-neutral-900 overflow-hidden relative">
      
      {/* Structural visual grid lines */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-neutral-900/40 pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-neutral-900/40 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        
        {/* Col 01: Brand Statement */}
        <div className="md:col-span-4 space-y-6">
          <a href="#hero" onClick={(e) => handleSmoothScroll(e, "#hero")} className="flex flex-col select-none inline-block">
            <span className="text-xl md:text-2xl font-serif tracking-[0.3em] text-white">AURA</span>
            <span className="text-[7px] uppercase font-mono tracking-[0.45em] text-neutral-500">Interiors</span>
          </a>
          <p className="text-xs font-light leading-relaxed tracking-wide max-w-sm text-neutral-500">
            Aura Interiors design studio crafts spatial poetry, fusing modern geometry with raw materials to support restorative residential and commercial lifestyles.
          </p>
        </div>

        {/* Col 02: Navigation */}
        <div className="md:col-span-2 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Studio Index</span>
          <ul className="space-y-2.5 text-xs font-light">
            <li>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")} className="hover:text-white transition-colors"> Manifesto </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")} className="hover:text-white transition-colors"> Services Suite </a>
            </li>
            <li>
              <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, "#portfolio")} className="hover:text-white transition-colors"> Curated Works </a>
            </li>
            <li>
              <a href="#process" onClick={(e) => handleSmoothScroll(e, "#process")} className="hover:text-white transition-colors"> Chronology </a>
            </li>
          </ul>
        </div>

        {/* Col 03: Services */}
        <div className="md:col-span-3 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Atelier Scope</span>
          <ul className="space-y-2.5 text-xs font-light">
            <li><span className="hover:text-white cursor-default transition-colors">Residential Portfolios</span></li>
            <li><span className="hover:text-white cursor-default transition-colors">Commercial Space Planning</span></li>
            <li><span className="hover:text-white cursor-default transition-colors">Custom Modular Architecture</span></li>
            <li><span className="hover:text-white cursor-default transition-colors">Acoustic Fabric Engineering</span></li>
          </ul>
        </div>

        {/* Col 04: Newsletter Journal */}
        <div className="md:col-span-3 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">The Aura Journal</span>
          <p className="text-xs font-light text-neutral-500 leading-relaxed max-w-xs">
            Subscribe for seasonal essays detailing architectural light, travertine selections, and sensory blueprints.
          </p>
          
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form
                key="footer-sub-form"
                onSubmit={handleSubscribe}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center border-b border-neutral-800 focus-within:border-gold-400 py-1 transition-all"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email coordinate"
                  className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-neutral-700 py-1 font-sans font-light rounded-none"
                  aria-label="Email coordinate input"
                />
                <button type="submit" className="text-neutral-500 hover:text-white p-1 transition cursor-pointer" aria-label="Subscribe submit">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="footer-sub-success"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 text-xs text-gold-400 bg-gold-400/5 border border-gold-400/10 p-2 font-mono uppercase text-[10px] tracking-wide"
              >
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Coordinate Subscribed</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Underwear License Details */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-600 tracking-wider">
        <span>© 2026 AURA ATELIER. ALL DIRECTIVES REGISTERED.</span>
        <div className="flex gap-6">
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")} className="hover:text-neutral-400"> PRIVACY CHARTER </a>
          <span>/</span>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")} className="hover:text-neutral-400"> ATELIER CODES </a>
        </div>
      </div>

    </footer>
  );
}
