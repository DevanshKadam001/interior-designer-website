import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation, Mail, Phone, Clock, Instagram, Linkedin, Facebook } from "lucide-react";

interface LocationSpec {
  city: string;
  lat: string;
  lng: string;
  address: string;
  tele: string;
  hours: string;
  coordX: number; // For abstract vector map centering
  coordY: number;
}

const BRAND_LOCATIONS: LocationSpec[] = [
  {
    city: "Beverly Hills",
    lat: "34.0736° N",
    lng: "118.4004° W",
    address: "9440 Benedict Canyon Drive, Beverly Hills, CA 90210",
    tele: "+1 (310) 902 4450",
    hours: "Mon - Fri: 09:00 AM - 06:00 PM (PT)",
    coordX: 35,
    coordY: 65,
  },
  {
    city: "Tribeca Atelier",
    lat: "40.7182° N",
    lng: "74.0078° W",
    address: "24 Beach Street, Penthouse B, New York, NY 10013",
    tele: "+1 (212) 545 1090",
    hours: "Mon - Fri: 09:30 AM - 06:30 PM (ET)",
    coordX: 68,
    coordY: 30,
  }
];

export default function Contact() {
  const [activeLocIdx, setActiveLocIdx] = useState(0);
  const activeLoc = BRAND_LOCATIONS[activeLocIdx];

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div className="max-w-xl">
            <span className="text-xs tracking-[0.3em] font-mono uppercase text-gold-500 font-light mb-4 block">
              08 / Studio Coordinates
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-900 dark:text-white tracking-wide leading-tight">
              Let’s Map Your <span className="italic">Atmosphere</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-450 font-light max-w-sm leading-relaxed tracking-wide">
            Our physical design offices operate on both coasts of the United States. Drop by our chambers or secure direct call schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Aligned Address coordinates, operating schedules, social icons */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Quick Location Toggles */}
            <div className="flex gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              {BRAND_LOCATIONS.map((loc, index) => (
                <button
                  key={loc.city}
                  onClick={() => setActiveLocIdx(index)}
                  className={`text-xs uppercase tracking-[0.2em] font-mono pb-2 relative transition-colors cursor-pointer ${
                    activeLocIdx === index
                      ? "text-neutral-950 dark:text-white font-bold"
                      : "text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                  }`}
                >
                  {loc.city}
                  {activeLocIdx === index && (
                    <motion.span
                      layoutId="activeLocationUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-400"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Address with text transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex gap-1.5 items-center font-mono text-[10px] text-neutral-400">
                    <Navigation className="w-3 h-3 text-gold-500" />
                    <span>COORDINATES // {activeLoc.lat} x {activeLoc.lng}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-neutral-950 dark:text-white font-light tracking-wide">
                    {activeLoc.address}
                  </h3>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800/60">
                  {/* Telephone */}
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 text-gold-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-neutral-400 block tracking-widest">Secure Wireline</span>
                      <a href={`tel:${activeLoc.tele}`} className="text-xs md:text-sm text-neutral-800 dark:text-neutral-200 font-light hover:text-gold-500 transition-colors">
                        {activeLoc.tele}
                      </a>
                    </div>
                  </div>

                  {/* Mail */}
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 text-gold-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-neutral-400 block tracking-widest">Office Mailbox</span>
                      <a href="mailto:atelier@aurainteriors.com" className="text-xs md:text-sm text-neutral-800 dark:text-neutral-200 font-light hover:text-gold-500 transition-colors">
                        atelier@aurainteriors.com
                      </a>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 text-gold-500">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-neutral-400 block tracking-widest">Visiting Schedule</span>
                      <span className="text-xs md:text-sm text-neutral-800 dark:text-neutral-200 font-light block">
                        {activeLoc.hours}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Social handles */}
            <div className="flex flex-col gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800/60">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">Atelier Archives</span>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram className="w-4 h-4" />, href: "#instagram", name: "Instagram" },
                  { icon: <Linkedin className="w-4 h-4" />, href: "#linkedin", name: "Linkedin" },
                  { icon: <Facebook className="w-4 h-4" />, href: "#facebook", name: "Facebook" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="p-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 hover:border-gold-400 hover:text-gold-500 transition-all rounded-none"
                    aria-label={`Visit our ${s.name}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Simulated Blueprint Vector Architectural Map */}
          <div className="lg:col-span-7 aspect-16/10 cursor-pointer overflow-hidden border border-neutral-200 dark:border-neutral-800/80 bg-neutral-950 text-neutral-500 shadow-2xl relative p-6">
            {/* Top diagnostic line info */}
            <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-3 mb-6">
              <span>RADAR NAVIGATION PLOT</span>
              <span>ZOOM SENSITIVE // CALIBRATED</span>
            </div>

            {/* Simulated graph lines mimicking a blueprint map layout */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10 pointer-events-none">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="border border-neutral-600" />
              ))}
            </div>

            {/* Active coordinates glowing dot in space */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeLocIdx}
                  className="absolute"
                  style={{
                    left: `${activeLoc.coordX}%`,
                    top: `${activeLoc.coordY}%`,
                  }}
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.1, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Glowing Concentric rings */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-24 h-24 rounded-full border border-gold-400/10 animate-ping" />
                    <div className="absolute w-12 h-12 rounded-full border border-gold-300/30 animate-pulse" />
                    <div className="absolute w-4 h-4 rounded-full bg-gold-400 border border-white flex items-center justify-center shadow-lg shadow-gold-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Extra static fake site outlines to simulate spatial architecture maps */}
              <div className="absolute top-1/4 left-1/3 w-20 h-10 border border-neutral-800/80" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-16 border border-neutral-850/85" />
              <div className="absolute top-1/2 left-2/3 w-12 h-12 rounded-full border border-neutral-800/60 border-dashed" />
            </div>

            {/* Compass calibration rose layout block (aesthetic blueprint design) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-neutral-900/60 backdrop-blur border border-neutral-800 p-3 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
              <div className="w-5 h-5 rounded-full border border-neutral-600 flex items-center justify-center font-bold">N</div>
              <div className="flex flex-col">
                <span>BEARING RADIAL</span>
                <span className="text-gold-400">STATUS LIVE</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 font-mono text-[9px] text-neutral-500">
              AZIMUTH: {activeLoc.lat}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
