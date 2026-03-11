"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 180);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Photo layer ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="/images/brownies-pb.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
          }}
        />
        {/* Left-dominant dark gradient — photo shows through on right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, #050202 0%, rgba(8,3,3,0.97) 20%, rgba(12,4,4,0.93) 38%, rgba(18,6,6,0.78) 55%, rgba(22,8,8,0.5) 72%, rgba(28,10,10,0.22) 100%)",
          }}
        />
        {/* Bottom vignette for scroll indicator legibility */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to top, rgba(5,2,2,0.7), transparent)",
          }}
        />
      </div>

      {/* ── Animated glow orbs (above photo, below content) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 1 }}>
        <div
          className="absolute orb-a"
          style={{
            top: "10%",
            left: "-8%",
            width: "45vw",
            height: "45vw",
            maxWidth: 560,
            maxHeight: 560,
            background: "radial-gradient(circle, rgba(139,26,26,0.45) 0%, rgba(100,15,15,0.2) 45%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute orb-b"
          style={{
            top: "-15%",
            right: "25%",
            width: "35vw",
            height: "35vw",
            maxWidth: 420,
            maxHeight: 420,
            background: "radial-gradient(circle, rgba(27,120,120,0.18) 0%, rgba(20,94,94,0.07) 55%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Corner bracket decorations ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 2 }}>
        {/* Top-left */}
        <div style={{ position: "absolute", top: 28, left: 28 }}>
          <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }} />
          <div style={{ width: 1, height: 44, background: "linear-gradient(180deg, rgba(212,175,55,0.5), transparent)", marginTop: -1 }} />
        </div>
        {/* Top-right */}
        <div style={{ position: "absolute", top: 28, right: 28 }}>
          <div style={{ width: 44, height: 1, background: "linear-gradient(270deg, rgba(212,175,55,0.5), transparent)" }} />
          <div style={{ width: 1, height: 44, background: "linear-gradient(180deg, rgba(212,175,55,0.5), transparent)", marginLeft: "auto" }} />
        </div>
        {/* Bottom-left */}
        <div style={{ position: "absolute", bottom: 28, left: 28 }}>
          <div style={{ width: 1, height: 44, background: "linear-gradient(0deg, rgba(212,175,55,0.5), transparent)" }} />
          <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)", marginTop: -1 }} />
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "7rem",
          paddingBottom: "5rem",
        }}
      >
        {/* Max-width container for text — left-biased on desktop */}
        <div style={{ maxWidth: 640 }}>

          {/* Live status pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              marginBottom: "2rem",
              background: "rgba(27,120,120,0.06)",
              border: "1px solid rgba(27,120,120,0.28)",
              color: "rgba(250,240,230,0.65)",
              backdropFilter: "blur(10px)",
              fontSize: "0.72rem",
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
                flexShrink: 0,
              }}
            />
            <span>{"We're out this weekend"}</span>
            <span style={{ color: "rgba(212,175,55,0.45)" }}>·</span>
            <span style={{ color: "rgba(212,175,55,0.85)" }}>Riverside Arts Market, Sat 10am–4pm</span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="eyebrow"
            style={{ color: "#25A0A0", marginBottom: "1.25rem" }}
          >
            Jacksonville, Florida&nbsp;&nbsp;·&nbsp;&nbsp;Global Desserts
          </motion.p>

          {/* Headline */}
          <h1 style={{ marginBottom: "1.25rem", lineHeight: 0.95 }}>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "block",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                color: "var(--cream)",
                letterSpacing: "-0.02em",
              }}
            >
              Cleopatra
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "block",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                color: "var(--gold)",
                letterSpacing: "-0.02em",
              }}
            >
              Delights
            </motion.span>
          </h1>

          {/* Diamond ornament divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}
          >
            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55))" }} />
            <div style={{ width: 5, height: 5, background: "var(--gold)", transform: "rotate(45deg)", opacity: 0.75 }} />
            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, rgba(212,175,55,0.55), transparent)" }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.62 }}
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(250,240,230,0.55)",
              maxWidth: 440,
              marginBottom: "2.5rem",
            }}
          >
            A world of extraordinary desserts — handcrafted with flavors from Africa, the Middle East, Asia, Europe & the Americas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}
          >
            <a
              href="/menu"
              className="btn-shimmer"
              style={{
                padding: "13px 32px",
                borderRadius: 999,
                fontSize: "0.875rem",
                boxShadow: "0 0 40px rgba(212,175,55,0.18), 0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              Explore Our Menu
            </a>
            <a
              href="/location"
              style={{
                padding: "13px 28px",
                borderRadius: 999,
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "1px solid rgba(212,175,55,0.28)",
                color: "rgba(250,240,230,0.8)",
                background: "rgba(255,255,255,0.03)",
                letterSpacing: "0.03em",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(212,175,55,0.55)";
                el.style.background = "rgba(212,175,55,0.06)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(212,175,55,0.28)";
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.transform = "translateY(0)";
              }}
            >
              Find Our Trailer
            </a>
          </motion.div>

          {/* Region tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem 1.25rem",
              marginTop: "3rem",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.3)",
              fontWeight: 600,
            }}
          >
            {["Africa", "Middle East", "Asia", "Europe", "Americas"].map((r, i) => (
              <span key={r} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {i > 0 && (
                  <span style={{ color: "rgba(212,175,55,0.15)", fontSize: "0.5rem" }}>✦</span>
                )}
                {r}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ zIndex: 10 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.3)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={15} style={{ color: "rgba(212,175,55,0.3)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
