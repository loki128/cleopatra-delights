"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const regions = [
  { label: "Africa" },
  { label: "Middle East" },
  { label: "Asia" },
  { label: "Europe" },
  { label: "Americas" },
];

const stats = [
  { num: "5", label: "Continents" },
  { num: "50+", label: "Flavors" },
  { num: "1", label: "Trailer" },
  { num: "∞", label: "Passion" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "#FAF0E6", overflow: "hidden", position: "relative" }}
    >
      {/* Big decorative quote mark background element */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(18rem, 35vw, 55rem)",
          fontWeight: 700,
          color: "rgba(139,26,26,0.03)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        &ldquo;
      </div>

      <div
        className="container section-py"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT: Pull quote + regions */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Big quote mark */}
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "5rem",
                fontWeight: 700,
                color: "var(--gold)",
                lineHeight: 0.8,
                marginBottom: "0.5rem",
                opacity: 0.6,
              }}
            >
              &ldquo;
            </div>

            {/* Pull quote */}
            <blockquote
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "#1A1A1A",
                fontWeight: 400,
                paddingLeft: "1.5rem",
                borderLeft: "2px solid var(--gold)",
                marginBottom: "2.5rem",
              }}
            >
              We don&apos;t just make desserts. We tell the story of every culture that shaped how the world eats sweet.
            </blockquote>

            {/* Region label */}
            <p
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--red)",
                marginBottom: "0.875rem",
              }}
            >
              Global Inspirations
            </p>

            {/* Region pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {regions.map((r) => (
                <span
                  key={r.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    background: "rgba(27,120,120,0.08)",
                    border: "1px solid rgba(27,120,120,0.2)",
                    color: "#1B7878",
                  }}
                >
                  {r.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Story + stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--red)",
                marginBottom: "0.875rem",
              }}
            >
              Our Story
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "var(--red)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              Where Every Bite<br />
              <span style={{ fontStyle: "italic", color: "#1A1A1A" }}>Tells a Story</span>
            </h2>

            {/* Gold divider left-aligned */}
            <div
              style={{
                width: 70,
                height: 1,
                background: "linear-gradient(90deg, var(--gold), transparent)",
                marginBottom: "1.75rem",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#5C4A3A" }}>
                Cleopatra Delights started with a simple idea: the world&apos;s best desserts
                shouldn&apos;t be hard to find. We travel the globe through flavor — mastering the techniques and traditions of African, Middle Eastern,
                Asian, European, and American sweets — and bring them all to Jacksonville, FL.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#5C4A3A" }}>
                From our food trailer and canopy stand, we serve handcrafted desserts at local markets, pop-ups, and events
                across Duval County. Every item is made in small batches with real ingredients — no shortcuts, no compromise.
              </p>
            </div>

            {/* Stats row with dividers */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(26,26,26,0.12)",
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    textAlign: "center",
                    borderRight: i < stats.length - 1 ? "1px solid rgba(27,120,120,0.12)" : "none",
                    padding: "0 0.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.6rem, 2.8vw, 2rem)",
                      fontWeight: 700,
                      color: "var(--red)",
                      lineHeight: 1,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {s.num}
                  </p>
                  <p
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(26,26,26,0.45)",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
