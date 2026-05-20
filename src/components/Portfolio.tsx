import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoveLeft, MoveRight, Layers, Eye, RefreshCw } from "lucide-react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";

// Interactive Drag-to-Compare Before/After component
function BeforeAfterContainer({
  before,
  after,
  title,
  location,
}: {
  before: string;
  after: string;
  title: string;
  location: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  const handleTouchStart = () => {
    isDragging.current = true;
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="relative w-full aspect-16/10 cursor-ew-resize overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* After Image (Full width background) */}
        <img
          src={after}
          alt="After Transformation"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1 text-[9px] uppercase font-mono bg-neutral-900/80 text-white tracking-widest backdrop-blur-sm pointer-events-none border border-white/15">
          FINISHED SPATIALLY
        </div>

        {/* Before Image (Clipping width defined by sliderPosition) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={before}
            alt="Before Construction"
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 text-[9px] uppercase font-mono bg-amber-900/85 text-amber-200 tracking-widest backdrop-blur-sm pointer-events-none border border-amber-400/20">
            RAW PRE-CONSTRUCTION
          </div>
        </div>

        {/* Vertical Brass Slider Bar */}
        <div
          className="absolute inset-y-0 w-[2px] bg-gold-450 z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Central Handle Roller */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-neutral-900 border-2 border-gold-400 flex items-center justify-center shadow-2xl transition hover:scale-105 active:scale-95 text-gold-300 pointer-events-none">
            <Layers className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
      
      {/* Informative Subtitle */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h4 className="text-sm font-serif text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">{title}</h4>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{location}</span>
        </div>
        <span className="text-[10px] font-mono text-gold-500 tracking-wider flex items-center gap-1.5 uppercase">
          <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "12s" }} /> Drag central handle to compare
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [cardStates, setCardStates] = useState<Record<string, "before" | "after">>({});

  const filters = ["All", "Living Room", "Bedroom", "Office", "Kitchen", "Luxury Villa"];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  const toggleCardBeforeAfter = (id: string) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: prev[id] === "before" ? "after" : "before",
    }));
  };

  return (
    <section
      id="portfolio"
      className="py-24 md:py-36 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs tracking-[0.3em] font-mono uppercase text-gold-500 font-light mb-4 block">
              03 / Signature Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-900 dark:text-white tracking-wide">
              Selected Atelier <span className="italic">Transformations</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-450 font-light max-w-sm leading-relaxed tracking-wide">
            Explore our curated gallery, featuring real before-and-after spatial dynamics and clean modern layouts.
          </p>
        </div>

        {/* Master Showcase: Split Section featuring Travertine Lounge Drag-to-Compare Slider */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div className="lg:col-span-7">
            <BeforeAfterContainer
              before="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
              after="/src/assets/images/hero_interior_1779263324243.png"
              title="The Travertine Lounge — Master Renovation"
              location="Beverly Hills, CA"
            />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-medium bg-gold-400/10 px-3 py-1">
              Case Study / Spatially Defined
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-light text-neutral-900 dark:text-white">
              Sensing the Void: Custom Plaster Living Areas
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed font-light tracking-wide">
              Originally an obsolete, drywall-confined box constructed in the mid-1970s, our goal was to excavate structural pathways, remove internal barriers, and connect the room directly with nature.
            </p>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed font-light tracking-wide">
              By introducing micro-cement structural columns, monolithic travertine blocks, and double-height sliding windows, Aura Interiors crafted an eye-safe environment designed for calm and restorative quiet luxury.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-6 text-xs uppercase font-mono border-t border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-neutral-400 block mb-1">Cubic Volume</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium">18,500 Cubic Ft.</span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-1">Architectural Style</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium">Warm Minimalist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Menu */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-neutral-200 dark:border-neutral-800/40 pb-6 overflow-x-auto scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white bg-transparent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Dynamic Project Mosaic Grid */}
        <motion.div
          layout
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.06,
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const currentCardState = cardStates[project.id] || "after";
              const showBefore = currentCardState === "before";
              const hasBeforeAfter = !!project.beforeImage;

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, scale: 0.96, y: 30 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col group border border-neutral-200/50 dark:border-neutral-800 bg-white/20 dark:bg-neutral-950/20 p-4 shadow-sm"
                >
                  {/* Image Container with Hover zoom and before/after transition */}
                  <div className="relative aspect-4/3 overflow-hidden bg-neutral-900 mb-6">
                    <img
                      src={showBefore && project.beforeImage ? project.beforeImage : project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-neutral-950/25 opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
                    
                    {/* Before/After quick switch badge overlay */}
                    {hasBeforeAfter && (
                      <button
                        onClick={() => toggleCardBeforeAfter(project.id)}
                        className="absolute top-4 right-4 z-20 px-3 py-1.5 text-[8px] font-mono font-semibold tracking-widest bg-neutral-950/90 text-white border border-white/10 hover:border-gold-300 transition-colors flex items-center gap-1.5 cursor-pointer uppercase shadow"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        {showBefore ? "SHOW FINISHED" : "SHOW BEFORE"}
                      </button>
                    )}

                    {/* Standard Category Tag */}
                    <div className="absolute bottom-4 left-4 z-20 px-3 py-1 text-[8px] font-mono tracking-widest uppercase bg-gold-450 text-neutral-950 font-bold">
                      {project.category}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 tracking-wider">
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-serif text-neutral-900 dark:text-neutral-150 tracking-wide font-light">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light line-clamp-2 leading-relaxed tracking-wide">
                      {project.description}
                    </p>
                    <div className="pt-4 mt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                      <span>PROJECT SCALE</span>
                      <span className="text-neutral-900 dark:text-neutral-200">{project.size}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
