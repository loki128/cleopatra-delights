"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════
   era.shopping-inspired animation system
   ═══════════════════════════════════════════════════════
   Phase 1 (0–2.1s):  Headline rises 640px — heavy cinematic easing
   Phase 2 (2.0–2.1s): Sub-elements — spring physics, fade + rise
   Phase 3 (2.1–2.4s): Region tags — tight cascade (90ms stagger)
   Phase 4 (2.4s+):    Scroll indicator fades in
   ═══════════════════════════════════════════════════════ */

/* The signature era.shopping easing — slow heavy deceleration */
const CINEMATIC_EASE: [number, number, number, number] = [0.56, 0.22, 0.05, 0.99];
const HERO_DURATION = 2.1;

/* Phase 1 — Dramatic headline rise */
const headlineRise = {
  initial: { opacity: 0, y: 640 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: HERO_DURATION, ease: CINEMATIC_EASE },
  },
};

/* Phase 2 — Spring follow-ups (sub-headline, tagline, CTAs) */
const springFollow = (delay: number, yOffset = 170) => ({
  initial: { opacity: 0, y: yOffset },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 121,
      damping: 27,
      mass: 0.3,
      delay,
    },
  },
});

/* Phase 3 — Tight cascade for small elements */
const cascadeItem = (delay: number) => ({
  initial: { y: 31, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 255,
      damping: 30,
      mass: 1,
      delay,
    },
  },
});

/* Status pill — early fade (matches nav timing) */
const pillReveal = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 219,
      damping: 27,
      mass: 0.3,
      delay: 0.5,
    },
  },
};

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
      style={{ minHeight: "100dvh" }}
    >
      {/* ── Photo layer ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/brownies-pb.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
          aria-hidden="true"
        />
        {/* Dramatic dark gradient — cinematic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #050202 0%, rgba(8,3,3,0.97) 20%, rgba(12,4,4,0.93) 38%, rgba(18,6,6,0.78) 55%, rgba(22,8,8,0.5) 72%, rgba(28,10,10,0.22) 100%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "30%",
            background: "linear-gradient(to top, rgba(5,2,2,0.7), transparent)",
          }}
        />
      </div>

      {/* ── Animated glow orbs — ambient motion behind text ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      >
        <div
          className="absolute orb-a"
          style={{
            top: "10%",
            left: "-8%",
            width: "45vw",
            height: "45vw",
            maxWidth: 560,
            maxHeight: 560,
            background:
              "radial-gradient(circle, rgba(139,26,26,0.4) 0%, rgba(100,15,15,0.15) 45%, transparent 70%)",
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
            background:
              "radial-gradient(circle, rgba(27,120,120,0.15) 0%, rgba(20,94,94,0.06) 55%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Gold glow behind headline — reveals as text rises */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.8 }}
          className="absolute"
          style={{
            top: "25%",
            left: "8%",
            width: "50vw",
            height: "50vw",
            maxWidth: 700,
            maxHeight: 700,
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── Corner bracket decorations ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 2 }}
      >
        {/* Top-left */}
        <motion.div
          className="absolute"
          style={{ top: 28, left: 28 }}
          {...cascadeItem(2.2)}
        >
          <div
            style={{
              width: 44,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)",
            }}
          />
          <div
            style={{
              width: 1,
              height: 44,
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.5), transparent)",
              marginTop: -1,
            }}
          />
        </motion.div>
        {/* Top-right */}
        <motion.div
          className="absolute"
          style={{ top: 28, right: 28 }}
          {...cascadeItem(2.29)}
        >
          <div
            style={{
              width: 44,
              height: 1,
              background:
                "linear-gradient(270deg, rgba(212,175,55,0.5), transparent)",
            }}
          />
          <div
            style={{
              width: 1,
              height: 44,
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.5), transparent)",
              marginLeft: "auto",
            }}
          />
        </motion.div>
        {/* Bottom-left */}
        <motion.div
          className="absolute"
          style={{ bottom: 28, left: 28 }}
          {...cascadeItem(2.38)}
        >
          <div
            style={{
              width: 1,
              height: 44,
              background:
                "linear-gradient(0deg, rgba(212,175,55,0.5), transparent)",
            }}
          />
          <div
            style={{
              width: 44,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)",
              marginTop: -1,
            }}
          />
        </motion.div>
      </div>

      {/* ── Content — Cinematic staggered entrance ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "7rem",
          paddingBottom: "5rem",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          {/* Live status pill — early reveal */}
          <motion.div
            {...pillReveal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              marginBottom: "2rem",
              background: "rgba(27,120,120,0.06)",
              border: "1px solid rgba(27,120,120,0.28)",
              color: "var(--text-tertiary)",
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
            <span style={{ color: "rgba(212,175,55,0.85)" }}>
              Riverside Arts Market, Sat 10am-4pm
            </span>
          </motion.div>

          {/* Eyebrow — appears with sub-elements */}
          <motion.p
            {...springFollow(1.9, 100)}
            className="eyebrow"
            style={{ color: "#25A0A0", marginBottom: "1.25rem" }}
          >
            Jacksonville, Florida&nbsp;&nbsp;·&nbsp;&nbsp;Global Desserts
          </motion.p>

          {/* ═══ THE HEADLINE — 640px cinematic rise ═══ */}
          <h1 style={{ marginBottom: "1.25rem", lineHeight: 0.95, overflow: "hidden" }}>
            <motion.span
              {...headlineRise}
              style={{
                display: "block",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                color: "var(--cream)",
                letterSpacing: "-0.025em",
              }}
            >
              Cleopatra
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 640 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: HERO_DURATION,
                ease: CINEMATIC_EASE,
                delay: 0.08,
              }}
              style={{
                display: "block",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                color: "var(--gold)",
                letterSpacing: "-0.025em",
              }}
            >
              Delights
            </motion.span>
          </h1>

          {/* Diamond ornament divider */}
          <motion.div
            {...springFollow(2.08, 60)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: 52,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.55))",
              }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                background: "var(--gold)",
                transform: "rotate(45deg)",
                opacity: 0.75,
              }}
            />
            <div
              style={{
                width: 52,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.55), transparent)",
              }}
            />
          </motion.div>

          {/* Tagline — spring follow */}
          <motion.p
            {...springFollow(2.1, 120)}
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "var(--text-tertiary)",
              maxWidth: 440,
              marginBottom: "2.5rem",
            }}
          >
            A world of extraordinary desserts — handcrafted with flavors from
            Africa, the Middle East, Asia, Europe & the Americas.
          </motion.p>

          {/* CTAs — spring follow */}
          <motion.div
            {...springFollow(2.15, 80)}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
            }}
          >
            <a
              href="/menu"
              className="btn-shimmer"
              style={{
                padding: "14px 34px",
                borderRadius: 999,
                fontSize: "0.875rem",
                boxShadow:
                  "0 0 40px rgba(212,175,55,0.18), 0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              Explore Our Menu
            </a>
            <a
              href="/location"
              className="group"
              style={{
                padding: "14px 28px",
                borderRadius: 999,
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "1px solid rgba(212,175,55,0.28)",
                color: "var(--text-secondary)",
                background: "rgba(255,255,255,0.03)",
                letterSpacing: "0.03em",
                transition:
                  "border-color 0.25s var(--ease-out-expo), background 0.25s var(--ease-out-expo), transform 0.25s var(--ease-out-expo)",
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

          {/* Region tags — tight cascade (era.shopping-style 90ms stagger) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem 1.25rem",
              marginTop: "3rem",
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {["Africa", "Middle East", "Asia", "Europe", "Americas"].map(
              (r, i) => (
                <motion.span
                  key={r}
                  {...cascadeItem(2.2 + i * 0.09)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--text-quaternary)",
                  }}
                >
                  {i > 0 && (
                    <span
                      style={{
                        color: "rgba(212,175,55,0.15)",
                        fontSize: "0.5rem",
                      }}
                    >
                      &#10022;
                    </span>
                  )}
                  {r}
                </motion.span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator — fades in after the cascade completes ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
        transition={{
          opacity: { duration: 0.4, delay: scrolled ? 0 : 2.8 },
          y: { type: "spring", stiffness: 200, damping: 20, delay: scrolled ? 0 : 2.8 },
        }}
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
          <ChevronDown
            size={15}
            style={{ color: "rgba(212,175,55,0.3)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
