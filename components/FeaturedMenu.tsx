"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURED: { name: string; category: string; story: string; accentColor: string }[] = [
  { name: "Dubai Chocolate Cookie", category: "NYC Cookies", story: "Inspired by the viral pistachio kataifi bar — crispy chocolate shell, silky pistachio cream, kataifi crunch.", accentColor: "rgba(212,175,55,0.5)" },
  { name: "Biscoff Cheesecake", category: "Cheesecakes", story: "Silky cheesecake on a Biscoff crust — cookie butter dreams made real.", accentColor: "rgba(212,175,55,0.45)" },
  { name: "Red Velvet S'more Brownie", category: "Brownies", story: "Fudgy red velvet loaded with toasted marshmallow and dark chocolate.", accentColor: "rgba(180,60,60,0.55)" },
  { name: "Ferrero Rocher Cake Bar", category: "Cake Bars", story: "Hazelnut sponge, chocolate ganache, and a gold-crowned Ferrero finish.", accentColor: "rgba(180,120,40,0.5)" },
  { name: "Banana Pudding Blondie", category: "Blondies", story: "A Southern classic — vanilla blondie swirled with banana pudding and Nilla wafers.", accentColor: "rgba(200,170,50,0.5)" },
  { name: "Kinder Bueno Cookie", category: "NYC Cookies", story: "European childhood nostalgia baked into a thick NYC hazelnut-cream cookie.", accentColor: "rgba(160,100,40,0.5)" },
  { name: "Mango Shortcake", category: "Shortcakes", story: "Where the Caribbean meets the American South — bright tropical layers on vanilla cake.", accentColor: "rgba(220,120,40,0.5)" },
  { name: "Pistachio Caramel Pecan Cheesecake", category: "Cheesecakes", story: "Middle Eastern pistachios meet Southern pecans — two traditions, one legendary dessert.", accentColor: "rgba(100,160,80,0.5)" },
];

function FeaturedRow({ item, index, inView }: { item: typeof FEATURED[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: "0 2rem",
        padding: "1.75rem 0",
        borderBottom: "1px solid rgba(212,175,55,0.06)",
        transition: "background 0.25s var(--ease-out-expo)",
        background: hovered ? "rgba(212,175,55,0.025)" : "transparent",
        cursor: "default",
      }}
    >
      {/* Number — Stripe editorial style */}
      <div style={{
        paddingTop: "0.15rem",
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.2em",
        color: hovered ? "rgba(212,175,55,0.6)" : "rgba(212,175,55,0.22)",
        transition: "color 0.25s",
        fontFamily: "'Playfair Display', serif",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div style={{ display: "grid", gap: "0.75rem" }} className="md:grid-cols-2">
        <div>
          <p style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: hovered ? "rgba(212,175,55,0.7)" : "rgba(212,175,55,0.35)",
            marginBottom: "0.35rem",
            transition: "color 0.25s",
          }}>
            {item.category}
          </p>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontWeight: 600,
            color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
            lineHeight: 1.3,
            transition: "color 0.25s",
          }}>
            {item.name}
          </h3>
        </div>

        <div>
          <p style={{
            fontSize: "0.85rem",
            lineHeight: 1.75,
            fontStyle: "italic",
            color: hovered ? "var(--text-tertiary)" : "var(--text-quaternary)",
            transition: "color 0.3s ease",
            maxWidth: 480,
          }}>
            {item.story}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedMenu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" style={{ background: "var(--obsidian)", position: "relative" }} ref={ref}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" style={{ opacity: 0.1 }} />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="container"
        style={{ paddingTop: "var(--section-py)", paddingBottom: "3rem", position: "relative", zIndex: 1 }}
      >
        <p className="eyebrow" style={{ color: "#25A0A0", marginBottom: "1rem", display: "block" }}>
          Our Offerings
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          color: "var(--cream)",
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          maxWidth: 580,
          marginBottom: "0.75rem",
        }}>
          A Taste of<br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>the World</em>
        </h2>
        <div className="gold-divider-left" style={{ marginTop: "1.5rem" }} />
      </motion.div>

      {/* Editorial list */}
      <div className="container" style={{ paddingBottom: "var(--section-py)", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", height: 1, background: "rgba(212,175,55,0.1)", marginBottom: 0 }} />

        {FEATURED.map((item, i) => (
          <FeaturedRow key={item.name} item={item} index={i} inView={inView} />
        ))}

        <div style={{ width: "100%", height: 1, background: "rgba(212,175,55,0.1)" }} />
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="container"
        style={{ paddingBottom: "var(--section-py)", position: "relative", zIndex: 1 }}
      >
        <div style={{
          borderRadius: 20,
          padding: "2.5rem",
          textAlign: "center",
          background: "rgba(212,175,55,0.03)",
          border: "1px solid rgba(212,175,55,0.08)",
        }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(212,175,55,0.45)", marginBottom: "1.25rem" }}>
            Full Menu Includes
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
            {["NYC Cookies", "Cookie Cakes", "Brownies", "Blondies", "Cheesecakes", "Shortcakes", "Cake Bars", "Classic Delights", "Signature Cakes"].map((cat) => (
              <span key={cat} style={{
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: "0.75rem",
                fontWeight: 500,
                background: "rgba(212,175,55,0.05)",
                color: "rgba(212,175,55,0.6)",
                border: "1px solid rgba(212,175,55,0.1)",
                transition: "border-color 0.2s, color 0.2s",
              }}>
                {cat}
              </span>
            ))}
          </div>
          <a href="/menu" className="btn-shimmer" style={{ padding: "13px 32px", borderRadius: 999, fontSize: "0.875rem" }}>
            View Full Menu &rarr;
          </a>
        </div>
      </motion.div>
    </section>
  );
}
