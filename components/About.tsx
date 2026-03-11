"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const blurUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "var(--surface-0)", position: "relative", overflow: "hidden" }}
    >
      {/* Radial glow backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(139,26,26,0.1) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(27,120,120,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" style={{ opacity: 0.15 }} />

      <div className="container section-py" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={blurUp}
            className="eyebrow"
            style={{ color: "#25A0A0", marginBottom: "1.25rem", display: "block" }}
          >
            Our Story
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={blurUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
              color: "var(--cream)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginBottom: "1.25rem",
            }}
          >
            Born in Jacksonville.<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Inspired by the World.</em>
          </motion.h2>

          <motion.div variants={blurUp}>
            <div className="gold-divider" style={{ marginBottom: "2.5rem" }} />
          </motion.div>

          {/* Pull quote — large cinematic statement */}
          <motion.blockquote
            variants={blurUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.55,
              marginBottom: "3rem",
              position: "relative",
              padding: "0 2rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-0.25em",
                left: 0,
                fontFamily: "'Playfair Display', serif",
                fontSize: "3.5rem",
                color: "rgba(212,175,55,0.25)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              &ldquo;
            </span>
            The name Cleopatra wasn&apos;t chosen for spectacle — it was chosen as a declaration.
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-0.55em",
                right: 0,
                fontFamily: "'Playfair Display', serif",
                fontSize: "3.5rem",
                color: "rgba(212,175,55,0.25)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              &rdquo;
            </span>
          </motion.blockquote>
        </motion.div>

        {/* Story paragraphs — narrow centered column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {[
            "The most powerful queen in history ruled at the intersection of Africa, the Mediterranean, and the Middle East. That intersection is exactly where our desserts live — taking the finest flavors from multiple worlds and making them extraordinary.",
            "Every recipe is an act of translation: taking something beloved from another culture and making it at home in Jacksonville. A Dubai chocolate bar becomes a cookie. A Biscoff biscuit becomes a brownie. A Middle Eastern pistachio becomes a cheesecake filling.",
            "We operate from a food trailer because that\u2019s how real food moves — city to city, market to market, neighborhood to neighborhood. Just like the ancient trade routes that first carried spices, honey, and sweet things across continents.",
          ].map((text, i) => (
            <p key={i} style={{ fontSize: "var(--text-body)", lineHeight: 1.85, color: "var(--text-tertiary)", fontWeight: 400, textAlign: "center" }}>
              {text}
            </p>
          ))}

          {/* Region tags */}
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem 1.5rem",
              alignItems: "center",
            }}
          >
            {["Africa", "Middle East", "Asia", "Europe", "The Americas"].map((r, i) => (
              <span key={r} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                {i > 0 && (
                  <span style={{ color: "rgba(212,175,55,0.25)", fontSize: "0.45rem" }}>&#10022;</span>
                )}
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--text-quaternary)",
                  }}
                >
                  {r}
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="about-stats-strip"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem 0",
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(212,175,55,0.08)",
          }}
        >
          {[
            { num: "5", label: "Continents of Inspiration" },
            { num: "50+", label: "Handcrafted Flavors" },
            { num: "1", label: "Food Trailer" },
            { num: "\u221E", label: "Passion" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ textAlign: "center", padding: "0 1.5rem" }}>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    fontWeight: 700,
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.num}
                </p>
                <p
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text-quaternary)",
                  }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
