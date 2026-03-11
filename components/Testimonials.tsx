"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/locationData";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#FAF0E6", position: "relative", overflow: "hidden" }}>
      {/* Background quote watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(14rem, 28vw, 40rem)",
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

      <div className="container section-py" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p
            className="eyebrow"
            style={{ color: "#1B7878", marginBottom: "0.875rem" }}
          >
            What People Say
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1A1A1A",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Straight From Our Customers
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Desktop 3-col grid */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(139,26,26,0.08)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 16px rgba(26,26,26,0.05)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: "1.25rem" }}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  color: "#2A2A2A",
                  flex: 1,
                  marginBottom: "1.5rem",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Item badge */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "rgba(27,120,120,0.08)",
                  color: "#1B7878",
                  border: "1px solid rgba(27,120,120,0.18)",
                  width: "fit-content",
                  marginBottom: "1.25rem",
                }}
              >
                {t.item}
              </span>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "#1B7878",
                    color: "var(--cream)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A" }}>{t.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(26,26,26,0.4)" }}>{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <MobileCarousel inView={inView} />
      </div>
    </section>
  );
}

function MobileCarousel({ inView }: { inView: boolean }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
  };

  const next = useCallback(() => {
    setDir(1);
    setIdx((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, inView, next]);

  const t = TESTIMONIALS[idx];

  return (
    <div
      className="md:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ position: "relative" }}>
        <button
          onClick={prev}
          className="absolute z-10"
          style={{
            left: -4,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(27,120,120,0.2)",
            color: "#1B7878",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={next}
          className="absolute z-10"
          style={{
            right: -4,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(27,120,120,0.2)",
            color: "#1B7878",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>

        <div style={{ padding: "0 2rem", overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(139,26,26,0.08)",
                borderRadius: "var(--radius-lg)",
                padding: "1.75rem",
                boxShadow: "0 2px 16px rgba(26,26,26,0.05)",
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: "1rem" }}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={13} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                ))}
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", lineHeight: 1.65, fontStyle: "italic", color: "#2A2A2A", marginBottom: "1.25rem" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <span style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 999, background: "rgba(27,120,120,0.08)", color: "#1B7878", border: "1px solid rgba(27,120,120,0.18)", marginBottom: "1rem" }}>
                {t.item}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1B7878", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem" }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1A1A1A" }}>{t.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "rgba(26,26,26,0.4)" }}>{t.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "1.25rem" }}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            style={{
              width: i === idx ? 22 : 7,
              height: 7,
              borderRadius: 999,
              background: i === idx ? "var(--gold)" : "rgba(139,26,26,0.2)",
              transition: "all 0.3s",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
