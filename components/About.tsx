"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "var(--papyrus)", position: "relative", overflow: "hidden" }}
    >
      {/* Grain texture overlay */}
      <div
        className="grain"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      <div className="container section-py" style={{ position: "relative", zIndex: 1 }}>

        {/* PART 1 — Full-width editorial opening */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "4rem" }}
        >
          <p
            className="eyebrow"
            style={{ color: "var(--teal)", marginBottom: "1rem", display: "block" }}
          >
            Our Story
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
              color: "#1A0E06",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: 800,
            }}
          >
            Born in Jacksonville.<br />
            <em style={{ fontStyle: "italic", color: "var(--red)" }}>Inspired by the World.</em>
          </h2>
        </motion.div>

        {/* PART 2 — 2-col layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem 4rem",
            alignItems: "start",
            marginBottom: "4rem",
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT COLUMN — Origin story text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Pull quote with left gold border */}
            <div
              style={{
                borderLeft: "3px solid var(--gold)",
                paddingLeft: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#2A1A0A",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;The name Cleopatra wasn&apos;t chosen for spectacle — it was chosen as a declaration.&rdquo;
              </p>
            </div>

            {/* Three origin story paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#5C4030", fontWeight: 400 }}>
                The most powerful queen in history ruled at the intersection of Africa, the Mediterranean,
                and the Middle East. That intersection is exactly where our desserts live — taking the finest
                flavors from multiple worlds and making them extraordinary.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#5C4030", fontWeight: 400 }}>
                Every recipe is an act of translation: taking something beloved from another culture and making
                it at home in Jacksonville. A Dubai chocolate bar becomes a cookie. A Biscoff biscuit becomes a
                brownie. A Middle Eastern pistachio becomes a cheesecake filling.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#5C4030", fontWeight: 400 }}>
                We operate from a food trailer because that&apos;s how real food moves — city to city, market to market,
                neighborhood to neighborhood. Just like the ancient trade routes that first carried spices, honey,
                and sweet things across continents.
              </p>
            </div>

            {/* Horizontal inspiration list */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.35rem 1.5rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(90,60,30,0.45)",
                }}
              >
                Inspired by
              </span>
              {["Africa", "Middle East", "Asia", "Europe", "The Americas"].map((r, i) => (
                <span key={r} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  {i > 0 && (
                    <span style={{ color: "rgba(212,175,55,0.3)", fontSize: "0.5rem" }}>◈</span>
                  )}
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--teal)",
                    }}
                  >
                    {r}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Photo with Egyptian frame border */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Egyptian frame — outer border with corner ornaments */}
            <div style={{ position: "relative", padding: "12px" }}>
              {/* Outer decorative border */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid rgba(212,175,55,0.35)",
                  borderRadius: 4,
                  pointerEvents: "none",
                }}
              />
              {/* Corner ornaments — 4 corners, each a 20x20px L-shape */}
              {[
                { top: 4, left: 4 },
                { top: 4, right: 4 },
                { bottom: 4, left: 4 },
                { bottom: 4, right: 4 },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    ...pos,
                    width: 20,
                    height: 20,
                    borderTop: i < 2 ? "2px solid rgba(212,175,55,0.6)" : undefined,
                    borderBottom: i >= 2 ? "2px solid rgba(212,175,55,0.6)" : undefined,
                    borderLeft: i % 2 === 0 ? "2px solid rgba(212,175,55,0.6)" : undefined,
                    borderRight: i % 2 === 1 ? "2px solid rgba(212,175,55,0.6)" : undefined,
                    pointerEvents: "none",
                  }}
                />
              ))}
              {/* Inner content */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  aspectRatio: "4/5",
                }}
              >
                <img
                  src="/images/collage.jpg"
                  alt="Cleopatra Delights dessert collection"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 35%",
                    display: "block",
                  }}
                />
                {/* Subtle overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 60%, rgba(8,4,2,0.35) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* PART 3 — Stats strip at bottom (static, no animations) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 0,
            paddingTop: "3rem",
            borderTop: "1px solid rgba(139,26,26,0.12)",
          }}
        >
          {[
            { num: "5", label: "Continents of Inspiration" },
            { num: "50+", label: "Handcrafted Flavors" },
            { num: "1", label: "Food Trailer" },
            { num: "∞", label: "Passion" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <div style={{ textAlign: "center", padding: "0 2.5rem" }}>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
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
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(90,60,30,0.55)",
                  }}
                >
                  {s.label}
                </p>
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    width: 1,
                    height: 36,
                    background: "rgba(139,26,26,0.15)",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
