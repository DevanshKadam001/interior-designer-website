import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, FileCheck, CheckCircle2, ListFilter, Trash2 } from "lucide-react";
import { BookingSubmission } from "../types";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const [submissions, setSubmissions] = useState<BookingSubmission[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTicket, setActiveTicket] = useState<BookingSubmission | null>(null);

  // Load submissions from localStorage to demonstrate real client data persistence
  useEffect(() => {
    const historical = localStorage.getItem("aura_bookings");
    if (historical) {
      try {
        setSubmissions(JSON.parse(historical));
      } catch (err) {
        console.error("Error loading historical bookings", err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !projectType || !budget) return;

    const newTicket: BookingSubmission = {
      id: "AURA-" + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newTicket, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("aura_bookings", JSON.stringify(updated));

    setActiveTicket(newTicket);
    setIsSubmitted(true);

    // Reset fields
    setName("");
    setEmail("");
    setPhone("");
    setProjectType("");
    setBudget("");
    setMessage("");
  };

  const clearHistoricalItem = (id: string) => {
    const updated = submissions.filter((s) => s.id !== id);
    setSubmissions(updated);
    localStorage.setItem("aura_bookings", JSON.stringify(updated));
  };

  return (
    <section
      id="consultation"
      className="py-24 md:py-36 bg-neutral-900 dark:bg-neutral-950 text-neutral-100 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Decorative Golden Light Halo */}
      <div className="absolute -right-48 -top-48 w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute -left-48 -bottom-48 w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LFC: Architectural Invitation Text and Submission Tracker */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs tracking-[0.3em] font-mono uppercase text-gold-400 font-light block">
                07 / Executive Curation
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide font-light leading-tight">
                Secure Your <span className="italic">Spatial Audit</span>
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed tracking-wide">
                Aura Architects accept limited estate consultations per calendar month. Secure your private diagnostic mapping session to review architectural tolerances, sunlight factors, and organic material blueprints.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs text-neutral-400 border-l-[2px] border-gold-400/50 pl-6">
              <p className="font-semibold text-neutral-200">TERMS OF ENGAGEMENT</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-gold-400">▪</span> <span>Initial Spatial diagnostics require roughly 90 minutes on site.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-400">▪</span> <span>We coordinate direct structural engineering tolerances internally.</span>
                </li>
              </ul>
            </div>

            {/* Display submission tracker list (localStorage) to verify persistent behaviors */}
            {submissions.length > 0 && (
              <div className="pt-8 border-t border-neutral-800">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-4">
                  Historical Submissions ({submissions.length})
                </span>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-none">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex justify-between items-center bg-neutral-800/40 p-3.5 border border-neutral-800 text-[11px] font-mono hover:border-neutral-700 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gold-300 font-bold">{sub.id}</span>
                          <span className="text-neutral-500">|</span>
                          <span className="text-neutral-300 truncate max-w-[120px]">{sub.name}</span>
                        </div>
                        <div className="text-neutral-500 text-[9px] uppercase">
                          {sub.projectType} • {sub.budget}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-400 text-[9px]">{sub.timestamp}</span>
                        <button
                          onClick={() => clearHistoricalItem(sub.id)}
                          className="text-neutral-500 hover:text-red-400 transition"
                          title="Purge Ticket"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* RFC: Animated Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-neutral-950 border border-neutral-800 p-8 md:p-12 relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="consultation-fields"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name-input" className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Your Full Name</label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Rostova"
                        className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3.5 text-sm text-white focus:border-gold-300 focus:outline-none transition font-sans placeholder-neutral-600 rounded-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email-input" className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Email Coordinate</label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@example.com"
                        className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3.5 text-sm text-white focus:border-gold-300 focus:outline-none transition font-sans placeholder-neutral-600 rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone-input" className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Cellular Contact</label>
                      <input
                        id="phone-input"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 0192"
                        className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3.5 text-sm text-white focus:border-gold-300 focus:outline-none transition font-sans placeholder-neutral-600 rounded-none"
                      />
                    </div>

                    {/* Project Type Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="project-type-select" className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Spatial Core Layout</label>
                      <select
                        id="project-type-select"
                        required
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3.5 text-sm text-white focus:border-gold-300 focus:outline-none transition font-sans rounded-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-neutral-900 text-neutral-500">Pick Category</option>
                        <option value="Residential Estate" className="bg-neutral-900 text-white">Residential Estate</option>
                        <option value="Boutique Penthouse" className="bg-neutral-900 text-white">Boutique Penthouse</option>
                        <option value="Modular Travertine Kitchen" className="bg-neutral-900 text-white">Modular Travertine Kitchen</option>
                        <option value="Luxury Commercial Lounge" className="bg-neutral-900 text-white">Luxury Commercial Lounge</option>
                        <option value="Master Bedroom Suite" className="bg-neutral-900 text-white">Master Bedroom Suite</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Allocation Select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase block">Budget Allocation Scale</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["$25k - $50k", "$50k - $100k", "$100k - $250k", "$250k+"].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setBudget(tier)}
                          className={`py-3 text-[10px] font-mono tracking-wider transition-all duration-300 border ${
                            budget === tier
                              ? "bg-gold-500 text-neutral-950 border-gold-500 font-semibold"
                              : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message-input" className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Atmospheric Objectives / Message</label>
                    <textarea
                      id="message-input"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g., We want to reconstruct our private master corridor to maximize mountain lines..."
                      className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3.5 text-sm text-white focus:border-gold-300 focus:outline-none transition font-sans placeholder-neutral-600 rounded-none resize-none"
                    />
                  </div>

                  {/* Glowing Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold-400 hover:bg-gold-300 text-neutral-950 font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-gold-400/10 hover:shadow-[0_0_25px_rgba(201,161,95,0.4)]"
                  >
                    Transmit Diagnostics Request
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="consultation-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center gap-6"
                >
                  <CheckCircle2 className="w-16 h-16 text-gold-400 animate-pulse" />
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-serif text-white uppercase tracking-wider font-light">Transmission Complete</h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed font-light">
                      Your spatial registry file has been securely transmitted. A Senior Design Principal will contact you directly within 24 hours to coordinate our diagnostic site visit.
                    </p>
                  </div>

                  {activeTicket && (
                    <div className="bg-neutral-900 p-6 border border-neutral-800 font-mono text-[11px] text-left w-full max-w-sm flex flex-col gap-2.5">
                      <div className="flex justify-between font-bold border-b border-neutral-800 pb-2 mb-1">
                        <span className="text-gold-300">TICKET REF</span>
                        <span className="text-white">{activeTicket.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">CLIENT</span>
                        <span className="text-neutral-300">{activeTicket.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">COORDINATE</span>
                        <span className="text-neutral-300">{activeTicket.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">SECTOR</span>
                        <span className="text-neutral-300">{activeTicket.projectType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">BUDGET ALLOC</span>
                        <span className="text-neutral-300">{activeTicket.budget}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-transparent border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 text-[10px] font-mono uppercase tracking-widest transition"
                  >
                    Draft Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
