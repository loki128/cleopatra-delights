"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram } from "lucide-react";

const TILES = [
  {
    numeral: "I",
    title: "Food Trailer",
    desc: "Our fully equipped trailer brings freshly baked desserts to Jacksonville neighborhoods, markets, and events.",
  },
  {
    numeral: "II",
    title: "Pop-Ups & Events",
    desc: "We appear at farmers markets, festivals, corporate events, and private gatherings. Book us for your event.",
  },
  {
    numeral: "III",
    title: "Custom Pickup",
    desc: "Proudly serving Duval County. Custom orders available for scheduled pickup across the city.",
  },
];

export default function FindUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="find-us" style={{ background: "var(--surface-0)", position: "relative" }} ref={ref}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" style={{ opacity: 0.12 }} />

      <div className="container section-py" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p className="eyebrow" style={{ color: "#25A0A0", marginBottom: "0.875rem" }}>
            Come Find Us
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--cream)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            We Come to You
          </h2>
          <div className="gold-divider" style={{ marginBottom: "1rem" }} />
          <p
            style={{
              fontSize: "var(--text-small)",
              color: "var(--text-tertiary)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Our food trailer and canopy stand move through Jacksonville. Follow Instagram for real-time updates.
          </p>
        </motion.div>

        {/* Three info tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.numeral}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                background: "var(--surface-1)",
                border: "1px solid rgba(212,175,55,0.08)",
                borderRadius: 16,
                padding: "2rem",
                transition: "border-color 0.3s ease",
                cursor: "default",
              }}
              whileHover={{ borderColor: "rgba(212,175,55,0.25)", y: -3 }}
            >
              <div
                style={{
                  height: 1,
                  width: 40,
                  background: "linear-gradient(90deg, var(--gold), transparent)",
                  marginBottom: "0.75rem",
                }}
              />
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                  fontWeight: 600,
                }}
              >
                {tile.numeral}
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                }}
              >
                {tile.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.75,
                  color: "var(--text-tertiary)",
                }}
              >
                {tile.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            background: "linear-gradient(105deg, rgba(139,26,26,0.12) 0%, rgba(212,175,55,0.04) 50%, rgba(139,26,26,0.08) 100%)",
            border: "1px solid rgba(212,175,55,0.12)",
            borderRadius: 20,
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.4rem",
                fontWeight: 600,
              }}
            >
              Never Miss a Drop
            </p>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--cream)",
                marginBottom: "0.4rem",
                lineHeight: 1.2,
              }}
            >
              Follow @CleopatraDelights
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
              Real-time location drops, new flavors, event announcements.
            </p>
          </div>
          <a
            href="/location"
            className="btn-shimmer"
            style={{
              padding: "11px 28px",
              borderRadius: 999,
              fontSize: "0.875rem",
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Instagram size={14} />
            View Full Schedule
          </a>
        </motion.div>
      </div>
    </section>
  );
}
