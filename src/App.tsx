import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Import custom sections
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import BookingForm from "./components/BookingForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState("hero");

  // Track cursor position for custom glow effect (only on non-touch devices)
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    const checkMouse = (e: MouseEvent) => {
      setHasMouse(true);
      window.removeEventListener("mousemove", checkMouse);
    };
    window.addEventListener("mousemove", checkMouse);
    return () => window.removeEventListener("mousemove", checkMouse);
  }, []);

  useEffect(() => {
    if (!hasMouse) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMouse]);

  // Handle dark/light mode changes on root document element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Modern intersection observer to highlight navbar links on physical scroll coordinates
  useEffect(() => {
    if (loading) return;
    const sections = ["hero", "about", "services", "portfolio", "process", "why-us", "consultation", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-80px 0px -40% 0px" } // Adjust triggers relative to header offset
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      {/* Absolute Loading Sequence Overlay */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div id="app-root-container" className="bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 min-h-screen font-sans selection:bg-gold-300 selection:text-neutral-900 overflow-x-hidden antialiased">
          
          {/* Custom Cursor Glow Trail (Desktop only) */}
          {hasMouse && (
            <motion.div
              id="custom-cursor-glow"
              className="fixed w-10 h-10 rounded-full bg-gold-400/20 blur-[12px] pointer-events-none z-[999] hidden lg:block"
              animate={{
                x: mousePos.x - 20,
                y: mousePos.y - 20,
              }}
              transition={{
                type: "spring",
                damping: 38,
                stiffness: 300,
                mass: 0.1,
              }}
            />
          )}

          {/* Core Navigation Layer */}
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            activeSection={activeSection}
          />

          {/* Main Visual Sections */}
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Process />
            <Testimonials />
            <WhyChooseUs />
            <BookingForm />
            <Contact />
          </main>

          {/* Premium Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
