"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--charcoal)" }}
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 20% 50%, rgba(139,26,26,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(139,26,26,0.2) 0%, transparent 60%)"
      }} />

      {/* Decorative gold lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px opacity-10" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
        <div className="absolute bottom-1/4 left-0 right-0 h-px opacity-10" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--gold)" }}
        >
          Jacksonville, Florida · Global Desserts
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          style={{ color: "var(--cream)" }}
        >
          Cleopatra
          <span className="block italic" style={{ color: "var(--gold)" }}>
            Delights
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="gold-divider mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "rgba(250,240,230,0.75)" }}
        >
          A world of extraordinary desserts — handcrafted with flavors from
          Africa, the Middle East, Asia, Europe & the Americas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#menu"
            className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              background: "var(--gold)",
              color: "var(--charcoal)",
              boxShadow: "0 0 30px rgba(212,175,55,0.3)",
            }}
          >
            Explore Our Menu
          </a>
          <a
            href="#find-us"
            className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: "rgba(212,175,55,0.4)",
              color: "var(--cream)",
            }}
          >
            Find Our Trailer
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.5)" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
