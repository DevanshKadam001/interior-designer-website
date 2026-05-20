import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  activeSection: string;
}

export default function Navbar({ theme, toggleTheme, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-us" },
    { name: "Consultation", href: "#consultation" },
    { name: "Contact", href: "#contact" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-neutral-900/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.05] shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
            className="flex flex-col group"
          >
            <span className="text-xl md:text-2xl font-serif font-light tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-gold-300">
              AURA
            </span>
            <span className="text-[7px] uppercase font-mono tracking-[0.45em] text-neutral-400 group-hover:text-gold-200 transition-colors">
              Interiors
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className={`relative text-xs uppercase tracking-[0.2em] font-light transition-all duration-300 pb-1 ${
                        isActive
                          ? "text-gold-400 font-medium"
                          : "text-neutral-300 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavBarIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-400"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="h-4 w-[1px] bg-white/[0.15]" />

            {/* Dark Mode Icon Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.03] text-neutral-300 hover:text-white transition-all duration-300"
              aria-label="Toggle theme mode"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Quick Consultation CTA */}
            <a
              href="#consultation"
              onClick={(e) => handleSmoothScroll(e, "#consultation")}
              className="px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium text-black bg-gold-300 hover:bg-gold-200 rounded-none transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-gold-500/10"
            >
              Book Consultation
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Actions Panel */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/[0.08] text-neutral-300"
              aria-label="Toggle darkness mode"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border border-white/[0.08] hover:border-white/[0.15] text-white rounded-none bg-white/[0.02]"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col justify-between p-8 pt-32 lg:hidden"
          >
            <div className="flex flex-col gap-8 md:px-8">
              <span className="text-xs tracking-[0.3em] font-mono text-neutral-500 uppercase">
                Browse Atelier Sections
              </span>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-3xl font-serif tracking-widest text-neutral-200 hover:text-gold-300 transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 md:px-8 border-t border-neutral-900 pt-8">
              <a
                href="#consultation"
                onClick={(e) => handleSmoothScroll(e, "#consultation")}
                className="w-full py-4 text-center text-xs uppercase tracking-[0.2em] bg-gold-300 text-black font-semibold transition-colors"
              >
                Inquire Consultation
              </a>
              <div className="flex justify-between text-[10px] tracking-wider font-mono text-neutral-500 uppercase">
                <span>© 2026 Aura Interiors</span>
                <span>Los Angeles — New York</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
