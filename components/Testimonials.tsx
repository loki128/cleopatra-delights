"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/locationData";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ background: "#0A1F1F", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle concentric circle background elements */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(600px, 80vw)",
          height: "min(600px, 80vw)",
          border: "1px solid rgba(212,175,55,0.04)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(400px, 60vw)",
          height: "min(400px, 60vw)",
          border: "1px solid rgba(212,175,55,0.06)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div className="container section-py" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            className="eyebrow"
            style={{
              color: "#25A0A0",
              marginBottom: "0.875rem",
              display: "block",
              textAlign: "center",
            }}
          >
            What People Say
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--cream)",
              textAlign: "center",
              marginBottom: "1.25rem",
            }}
          >
            Straight From Our Customers
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          {/* Featured quote — TESTIMONIALS[0] */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              textAlign: "center",
              maxWidth: 720,
              margin: "0 auto",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "4rem",
                lineHeight: 0.8,
                color: "rgba(212,175,55,0.25)",
                marginBottom: "1rem",
              }}
            >
              &ldquo;
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.35rem, 2.5vw, 1.9rem)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "rgba(250,240,230,0.88)",
                lineHeight: 1.65,
                marginBottom: "1.75rem",
              }}
            >
              {TESTIMONIALS[0].text}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.75rem" }}>✦</span>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "rgba(212,175,55,0.7)",
                }}
              >
                — {TESTIMONIALS[0].name}, Jacksonville
              </p>
              <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.75rem" }}>✦</span>
            </div>
            {TESTIMONIALS[0].item && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(37,160,160,0.75)",
                }}
              >
                {TESTIMONIALS[0].item}
              </span>
            )}
          </motion.div>

          {/* Gold separator */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              width: "100%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
              marginBottom: "3rem",
            }}
          />

          {/* Two secondary quotes */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}
          >
            {[TESTIMONIALS[1], TESTIMONIALS[2]].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    lineHeight: 0.9,
                    color: "rgba(212,175,55,0.2)",
                    marginBottom: "0.75rem",
                  }}
                >
                  &ldquo;
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontStyle: "italic",
                    color: "rgba(250,240,230,0.65)",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  {t.text}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: "rgba(212,175,55,0.55)",
                  }}
                >
                  — {t.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <MobileCarousel inView={inView} />
      </div>
    </section>
  );
}

function MobileCarousel({ inView }: { inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, inView, next]);

  const t = TESTIMONIALS[current];

  return (
    <div className="md:hidden">
      <div
        style={{ position: "relative", padding: "0 2.5rem" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            color: "rgba(212,175,55,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next testimonial"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            color: "rgba(212,175,55,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={16} />
        </button>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
                lineHeight: 0.85,
                color: "rgba(212,175,55,0.22)",
                marginBottom: "0.875rem",
              }}
            >
              &ldquo;
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "rgba(250,240,230,0.8)",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              {t.text}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ color: "rgba(212,175,55,0.45)", fontSize: "0.7rem" }}>✦</span>
              <p
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "rgba(212,175,55,0.65)",
                }}
              >
                — {t.name}, Jacksonville
              </p>
              <span style={{ color: "rgba(212,175,55,0.45)", fontSize: "0.7rem" }}>✦</span>
            </div>
            {t.item && (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(37,160,160,0.7)",
                }}
              >
                {t.item}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: "1.75rem",
        }}
      >
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              width: i === current ? 22 : 7,
              height: 7,
              borderRadius: 999,
              background:
                i === current
                  ? "rgba(212,175,55,0.75)"
                  : "rgba(212,175,55,0.18)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
