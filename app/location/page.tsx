"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Truck, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UPCOMING_EVENTS, TYPE_STYLES } from "@/lib/locationData";

/* Type badge colors for dark background */
const DARK_TYPE_STYLES: Record<string, { label: string; bg: string; color: string; border: string }> = {
  market:   { label: "Farmers Market", bg: "rgba(16,185,129,0.1)",  color: "rgba(80,220,160,0.9)",  border: "rgba(16,185,129,0.2)" },
  popup:    { label: "Pop-Up",         bg: "rgba(99,102,241,0.1)",  color: "rgba(180,185,255,0.9)", border: "rgba(99,102,241,0.2)" },
  private:  { label: "Private Event",  bg: "rgba(245,158,11,0.1)",  color: "rgba(245,180,80,0.9)",  border: "rgba(245,158,11,0.2)" },
  festival: { label: "Festival",       bg: "rgba(212,175,55,0.1)", color: "rgba(212,175,55,0.9)",  border: "rgba(212,175,55,0.2)" },
};

const blurIn = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function LocationPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--obsidian)", minHeight: "100vh" }}>

        {/* Hero — dark, consistent */}
        <div className="page-hero" style={{ background: "var(--obsidian)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 60% 40%, rgba(139,26,26,0.3) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(27,120,120,0.1) 0%, transparent 50%)"
          }} />
          <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.2 }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="eyebrow" style={{ color: "#25A0A0", marginBottom: "1rem", display: "block" }}
            >
              Find Us
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--cream)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                letterSpacing: "-0.015em",
              }}
            >
              Where to Find<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Cleopatra Delights</em>
            </motion.h1>
            <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ fontSize: "var(--text-body)", color: "var(--text-tertiary)", maxWidth: 500, margin: "0 auto" }}
            >
              We operate from a food trailer and canopy stand across Jacksonville.
              Follow Instagram for real-time updates.
            </motion.p>
          </div>
        </div>

        {/* Quick info bar — obsidian surface */}
        <div style={{ background: "var(--surface-1)", borderBottom: "1px solid rgba(212,175,55,0.08)", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { icon: Truck,     text: "Food Trailer + Canopy Stand" },
              { icon: MapPin,    text: "Jacksonville, FL & Surrounding" },
              { icon: Instagram, text: "@CleopatraDelights for live drops" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <Icon size={14} style={{ color: "var(--gold)" }} />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events — dark cards */}
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ marginBottom: "2.5rem" }}
          >
            <p className="eyebrow" style={{ color: "#25A0A0", marginBottom: "0.75rem", display: "block" }}>
              Schedule
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "var(--text-display)",
                fontWeight: 700,
                color: "var(--cream)",
                lineHeight: 1.15,
              }}
            >
              Upcoming Locations &<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Events</em>
            </h2>
            <div className="gold-divider-left" style={{ marginTop: "1.25rem" }} />
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {UPCOMING_EVENTS.map((event, i) => {
              const typeStyle = DARK_TYPE_STYLES[event.type] || DARK_TYPE_STYLES.market;
              return (
                <motion.div
                  key={event.name + event.date}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={blurIn}
                  style={{
                    borderRadius: 16,
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    background: "var(--surface-1)",
                    border: "1px solid rgba(212,175,55,0.08)",
                    transition: "border-color 0.3s, transform 0.3s var(--ease-out-expo)",
                  }}
                  whileHover={{ borderColor: "rgba(212,175,55,0.2)", y: -2 }}
                  className="md:flex-row md:items-center"
                >
                  {/* Date block */}
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: "rgba(139,26,26,0.15)",
                      border: "1px solid rgba(139,26,26,0.25)",
                    }}
                  >
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(212,175,55,0.6)" }}>
                      {event.date.split(" ")[0]}
                    </span>
                    <span style={{ fontSize: "1.35rem", fontWeight: 700, lineHeight: 1, color: "var(--cream)", fontFamily: "'Playfair Display', serif" }}>
                      {event.date.split(" ")[1]}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {event.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: typeStyle.bg,
                          color: typeStyle.color,
                          border: `1px solid ${typeStyle.border}`,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {typeStyle.label}
                      </span>
                      {event.note && (
                        <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(212,175,55,0.08)", color: "rgba(212,175,55,0.7)", border: "1px solid rgba(212,175,55,0.12)" }}>
                          {event.note}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: "0.8rem", color: "var(--text-quaternary)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={11} style={{ color: "rgba(212,175,55,0.4)" }} />
                        {event.address}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Clock size={11} style={{ color: "rgba(212,175,55,0.4)" }} />
                        {event.day} · {event.time}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <a
                    href="https://instagram.com/cleopatradelights"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: 12,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      flexShrink: 0,
                      background: "rgba(212,175,55,0.06)",
                      color: "rgba(212,175,55,0.7)",
                      border: "1px solid rgba(212,175,55,0.12)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
                      e.currentTarget.style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)";
                      e.currentTarget.style.color = "rgba(212,175,55,0.7)";
                    }}
                  >
                    <Calendar size={12} />
                    Save Date
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: "0.78rem", textAlign: "center", marginTop: "1.5rem", color: "var(--text-quaternary)" }}
          >
            Schedule updated regularly. Follow{" "}
            <a href="https://instagram.com/cleopatradelights" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(212,175,55,0.7)", fontWeight: 600 }}>
              @CleopatraDelights
            </a>{" "}
            for last-minute pop-ups.
          </motion.p>
        </div>

        {/* Map embed — dark styled */}
        <div style={{ background: "var(--surface-1)", borderTop: "1px solid rgba(212,175,55,0.06)", borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
          <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: "2rem" }}
            >
              <p className="eyebrow" style={{ color: "#25A0A0", marginBottom: "0.75rem", display: "block" }}>
                Service Area
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--cream)" }}>
                Jacksonville & Surrounding Areas
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224011.4737437698!2d-81.87697!3d30.33218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7f9!2sJacksonville%2C%20FL!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0, display: "block", filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cleopatra Delights service area — Jacksonville FL"
              />
            </motion.div>
          </div>
        </div>

        {/* Instagram CTA — dark themed */}
        <div style={{ background: "var(--nile)", position: "relative", overflow: "hidden" }}>
          {/* Radial glow */}
          <div className="absolute pointer-events-none" aria-hidden="true" style={{
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)",
            filter: "blur(40px)",
          }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container"
            style={{ paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center", position: "relative", zIndex: 1 }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}>
              <Instagram size={24} style={{ color: "var(--gold)" }} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--cream)", marginBottom: "0.75rem" }}>
              Never Miss a Drop
            </h3>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-tertiary)", marginBottom: "2rem", maxWidth: 400, margin: "0 auto 2rem" }}>
              Follow us for daily location updates, new flavors, and behind-the-scenes content.
            </p>
            <a
              href="https://instagram.com/cleopatradelights"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer"
              style={{
                padding: "13px 28px",
                borderRadius: 999,
                fontSize: "0.875rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Instagram size={15} />
              Follow @CleopatraDelights
            </a>
          </motion.div>
        </div>

      </main>
      <Footer />
    </>
  );
}
