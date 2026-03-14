"use client";
import { Instagram, MapPin, Mail } from "lucide-react";
import Image from "next/image";

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

        {/* Brand close — centered identity statement */}
        <div style={{
          textAlign: "center",
          paddingBottom: "3rem",
          marginBottom: "3rem",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
        }}>
          {/* Logo */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            margin: "0 auto 1.5rem",
            overflow: "hidden",
            border: "2px solid rgba(212,175,55,0.35)",
            boxShadow: "0 0 0 4px rgba(212,175,55,0.06)",
            background: "#fff",
            position: "relative",
          }}>
            <Image
              src="/images/logo.jpg"
              alt="Cleopatra Delights"
              width={72}
              height={72}
              className="object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {/* Brand name */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "var(--gold)",
            marginBottom: "0.75rem",
            lineHeight: 1.2,
          }}>
            Cleopatra Delights
          </h2>
          {/* Ornament */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: "1rem",
          }}>
            <div style={{ width: 32, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4))" }} />
            <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.55rem" }}>◈</span>
            <div style={{ width: 32, height: 1, background: "linear-gradient(270deg, transparent, rgba(212,175,55,0.4))" }} />
          </div>
          {/* Tagline */}
          <p style={{
            fontSize: "0.85rem",
            lineHeight: 1.7,
            color: "rgba(250,240,230,0.32)",
            maxWidth: 380,
            margin: "0 auto",
            fontStyle: "italic",
          }}>
            Made from scratch, in Jacksonville — inspired by the world.
          </p>
        </div>

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
                  position: "relative",
                }}
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Cleopatra Delights"
                  width={52}
                  height={52}
                  className="object-cover"
                  style={{ width: "100%", height: "100%" }}
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
              href="https://www.instagram.com/cleopatra.delights/"
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
                href="https://www.instagram.com/cleopatra.delights/"
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

          {/* Stay Connected */}
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
              New flavors, seasonal specials, and pop-up announcements — all on Instagram.
            </p>
            <a
              href="https://www.instagram.com/cleopatra.delights/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer"
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Instagram size={14} />
              Follow Us
            </a>
            <div style={{ marginTop: "1rem" }}>
              <a
                href="mailto:lukita@cleopatradelights.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.8rem",
                  color: "rgba(250,240,230,0.35)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,240,230,0.35)")}
              >
                <Mail size={12} style={{ color: "rgba(212,175,55,0.4)" }} />
                lukita@cleopatradelights.com
              </a>
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
            Made from scratch in Jacksonville, FL — inspired by the world.
          </p>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.5), rgba(212,175,55,0.3), rgba(139,26,26,0.5), transparent)" }} />
    </footer>
  );
}
