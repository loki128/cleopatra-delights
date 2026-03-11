"use client";
import { Instagram, MapPin, Mail, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Full Menu", href: "/menu" },
  { label: "Find Us", href: "/location" },
  { label: "Custom Order", href: "/order" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A" }}>
      {/* Top border line */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)" }} />

      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "3rem" }}>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "3rem 2.5rem",
          }}
          className="md:grid-cols-4-footer"
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1rem" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1.5px solid rgba(212,175,55,0.35)",
                  boxShadow: "0 0 0 4px rgba(212,175,55,0.06)",
                  flexShrink: 0,
                  background: "#fff",
                }}
              >
                <img
                  src="/images/logo.jpg"
                  alt="Cleopatra Delights"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    marginBottom: "0.15rem",
                    lineHeight: 1.15,
                  }}
                >
                  Cleopatra Delights
                </h3>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(250,240,230,0.25)" }}>
                  Jacksonville, Florida
                </p>
              </div>
            </div>

            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)", margin: "1rem 0" }} />

            <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(250,240,230,0.4)", marginBottom: "1.25rem", maxWidth: 240 }}>
              Handcrafted global desserts from Jacksonville&apos;s most adventurous food trailer. Where every bite tells a story.
            </p>

            <a
              href="https://instagram.com/cleopatradelights"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.8rem",
                color: "rgba(250,240,230,0.45)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,240,230,0.45)")}
            >
              <Instagram size={14} style={{ color: "var(--gold)" }} />
              @CleopatraDelights
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.5rem",
              }}
            >
              Explore
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(250,240,230,0.4)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,240,230,0.85)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,240,230,0.4)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Us */}
          <div>
            <h4
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.5rem",
              }}
            >
              Find Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.875rem", color: "rgba(250,240,230,0.4)" }}>
                <MapPin size={13} style={{ color: "rgba(212,175,55,0.5)", marginTop: 2, flexShrink: 0 }} />
                <span>Jacksonville, FL &amp; Surrounding Areas</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(250,240,230,0.4)", paddingLeft: "1.3rem" }}>Food Trailer &amp; Canopy Stand</p>
              <p style={{ fontSize: "0.875rem", color: "rgba(250,240,230,0.4)", paddingLeft: "1.3rem" }}>Available at markets &amp; events</p>
              <a
                href="https://instagram.com/cleopatradelights"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: "0.875rem",
                  color: "rgba(212,175,55,0.55)",
                  transition: "color 0.2s",
                  paddingLeft: "1.3rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.55)")}
              >
                <Instagram size={12} />
                Follow for live updates
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}
            >
              Stay in the Loop
            </h4>
            <p style={{ fontSize: "0.8rem", color: "rgba(250,240,230,0.3)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              New flavors, seasonal specials, and pop-up announcements.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="input-gold"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(212,175,55,0.18)",
                  color: "var(--cream)",
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "var(--radius-sm)",
                  padding: "10px 14px",
                  fontSize: "0.8rem",
                  outline: "none",
                }}
              />
              <button
                className="btn-shimmer"
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                Subscribe
                <ArrowRight size={12} />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "0.75rem" }}>
              <Mail size={10} style={{ color: "rgba(212,175,55,0.3)" }} />
              <p style={{ fontSize: "0.7rem", color: "rgba(250,240,230,0.2)" }}>No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(212,175,55,0.08)", margin: "3rem 0 1.75rem" }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.625rem",
            textAlign: "center",
          }}
          className="md:flex-row md:justify-between"
        >
          <p style={{ fontSize: "0.75rem", color: "rgba(250,240,230,0.18)" }}>
            © 2026 Cleopatra Delights. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(250,240,230,0.18)", fontStyle: "italic" }}>
            &ldquo;Where Every Bite Tells a Story&rdquo; — Jacksonville, FL
          </p>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.5), rgba(212,175,55,0.3), rgba(139,26,26,0.5), transparent)" }} />
    </footer>
  );
}
