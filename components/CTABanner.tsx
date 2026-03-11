"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "radial-gradient(ellipse at 30% 50%, #6B1212 0%, #1B4040 45%, #0A0B0A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Layered orbs */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "50%", left: "55%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 400,
          background: "radial-gradient(ellipse, rgba(139,26,26,0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(27,120,120,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" style={{ opacity: 0.25 }} />

      {/* Corner marks */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[["top-8 left-8", "90deg, rgba(212,175,55,0.3), transparent"], ["top-8 right-8", "270deg, rgba(212,175,55,0.3), transparent"]].map(([pos, grad], i) => (
          <div key={i} className={`absolute ${pos}`}>
            <div style={{ width: 48, height: 1, background: `linear-gradient(${grad})` }} />
            <div style={{ width: 1, height: 48, background: `linear-gradient(${i === 0 ? "180" : "180"}deg, rgba(212,175,55,0.3), transparent)` }} />
          </div>
        ))}
      </div>

      <div className="container section-py" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow"
            style={{ color: "rgba(27,185,185,0.8)", marginBottom: "1.25rem" }}
          >
            Ready to Order?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
              color: "var(--cream)",
              lineHeight: 1.12,
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            Every bite tells a story.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{"What's yours?"}</em>
          </motion.h2>

          {/* Ornament divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: "1.75rem" }}
          >
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.45))" }} />
            <div style={{ width: 5, height: 5, background: "var(--gold)", transform: "rotate(45deg)", opacity: 0.7 }} />
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, rgba(212,175,55,0.45), transparent)" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(250,240,230,0.5)",
              maxWidth: 440,
              margin: "0 auto 2.5rem",
            }}
          >
            Custom orders for birthdays, weddings, corporate events, and every celebration. Made fresh. Handcrafted with care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.42 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="/order"
              className="btn-shimmer"
              style={{
                padding: "14px 36px",
                borderRadius: 999,
                fontSize: "0.875rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 0 48px rgba(212,175,55,0.22), 0 4px 24px rgba(0,0,0,0.5)",
              }}
            >
              Place a Custom Order
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
            <a
              href="/menu"
              style={{
                padding: "14px 36px",
                borderRadius: 999,
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "1px solid rgba(250,240,230,0.2)",
                color: "rgba(250,240,230,0.7)",
                background: "rgba(255,255,255,0.04)",
                transition: "all 0.2s",
                letterSpacing: "0.03em",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(212,175,55,0.5)";
                el.style.color = "rgba(212,175,55,0.9)";
                el.style.background = "rgba(212,175,55,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(250,240,230,0.2)";
                el.style.color = "rgba(250,240,230,0.7)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              View Full Menu
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
