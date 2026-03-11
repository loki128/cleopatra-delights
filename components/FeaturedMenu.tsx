"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type FeaturedItem = {
  name: string;
  category: string;
  story: string;
  emoji: string;
  large: boolean;
  cardBg: string;
  accentColor: string;
};

const featured: FeaturedItem[] = [
  {
    name: "Dubai Chocolate Cookie",
    category: "NYC Cookies",
    story: "Inspired by the viral pistachio kataifi bar that broke the internet in 2024.",
    emoji: "🌟",
    large: true,
    cardBg: "linear-gradient(145deg, #1A0A02 0%, #2D1206 50%, #1A0A02 100%)",
    accentColor: "rgba(212,175,55,0.6)",
  },
  {
    name: "Biscoff Cheesecake",
    category: "Cheesecakes",
    story: "Silky cheesecake on a Biscoff crust — cookie butter dreams made real.",
    emoji: "🍰",
    large: false,
    cardBg: "linear-gradient(145deg, #1A1005 0%, #281808 100%)",
    accentColor: "rgba(212,175,55,0.5)",
  },
  {
    name: "Red Velvet S'more Brownie",
    category: "Brownies",
    story: "Fudgy red velvet loaded with toasted marshmallow and dark chocolate.",
    emoji: "❤️",
    large: false,
    cardBg: "linear-gradient(145deg, #1A0505 0%, #2D0808 100%)",
    accentColor: "rgba(180,60,60,0.6)",
  },
  {
    name: "Ferrero Rocher Cake Bar",
    category: "Cake Bars",
    story: "Hazelnut sponge, chocolate ganache, and a gold-crowned Ferrero finish.",
    emoji: "🌰",
    large: false,
    cardBg: "linear-gradient(145deg, #160C02 0%, #241505 100%)",
    accentColor: "rgba(180,120,40,0.5)",
  },
  {
    name: "Banana Pudding Blondie",
    category: "Blondies",
    story: "A Southern classic — vanilla blondie swirled with banana pudding and Nilla wafers.",
    emoji: "🍌",
    large: false,
    cardBg: "linear-gradient(145deg, #151205 0%, #1E1A08 100%)",
    accentColor: "rgba(200,170,50,0.5)",
  },
  {
    name: "Kinder Bueno Cookie",
    category: "NYC Cookies",
    story: "European childhood nostalgia baked into a thick NYC hazelnut-cream cookie.",
    emoji: "🍫",
    large: false,
    cardBg: "linear-gradient(145deg, #1A0E04 0%, #2A1608 100%)",
    accentColor: "rgba(160,100,40,0.5)",
  },
  {
    name: "Mango Shortcake",
    category: "Shortcakes",
    story: "Where the Caribbean meets the American South — bright tropical layers on vanilla cake.",
    emoji: "🥭",
    large: false,
    cardBg: "linear-gradient(145deg, #1A0C04 0%, #261208 100%)",
    accentColor: "rgba(220,120,40,0.5)",
  },
  {
    name: "Pistachio Caramel Pecan Cheesecake",
    category: "Cheesecakes",
    story: "Middle Eastern pistachios meet Southern pecans — two traditions, one legendary dessert.",
    emoji: "🟢",
    large: true,
    cardBg: "linear-gradient(145deg, #0A1008 0%, #121A0E 50%, #0A1008 100%)",
    accentColor: "rgba(100,160,80,0.5)",
  },
];

const categories = [
  "NYC Cookies", "Cookie Cakes", "Brownies", "Blondies",
  "Cheesecakes", "Shortcakes", "Cake Bars", "Classic Delights", "Signature Cakes",
];

function BentoCard({ item, index, inView, isLarge }: { item: FeaturedItem; index: number; inView: boolean; isLarge: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.04 + index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: item.cardBg,
        border: `1px solid ${hovered ? item.accentColor : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20,
        padding: isLarge ? "2.5rem" : "1.6rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        height: "100%",
        minHeight: isLarge ? 300 : 170,
        cursor: "default",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${item.accentColor}` : "0 2px 8px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle radial glow in corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: isLarge ? 200 : 120,
          height: isLarge ? 200 : 120,
          background: `radial-gradient(circle at top right, ${item.accentColor.replace("0.5", "0.15").replace("0.6", "0.18")}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div style={{ fontSize: isLarge ? "3.5rem" : "2.5rem", marginBottom: "0.75rem", lineHeight: 1 }}>{item.emoji}</div>
        <div
          style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,175,55,0.7)", marginBottom: "0.5rem" }}
        >
          {item.category}
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontSize: isLarge ? "1.35rem" : "0.95rem",
            color: "rgba(250,240,230,0.92)",
            lineHeight: 1.3,
          }}
        >
          {item.name}
        </h3>
      </div>

      <div style={{ position: "relative", marginTop: "1rem" }}>
        <AnimatePresence>
          {hovered ? (
            <motion.p
              key="story"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: "0.78rem", lineHeight: 1.65, fontStyle: "italic", color: "rgba(250,240,230,0.55)" }}
            >
              {item.story}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FeaturedMenu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" className="section-py" style={{ background: "var(--charcoal)" }} ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Our Offerings
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--cream)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
            A Taste of the World
          </h2>
          <div className="gold-divider mb-5" />
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(250,240,230,0.5)", maxWidth: 500, margin: "0 auto" }}>
            From NYC-style cookies to Middle Eastern-inspired cheesecakes — every item handcrafted with globally-sourced inspiration.
          </p>
        </motion.div>

        {/* ── DESKTOP BENTO GRID (lg+) ── */}
        <div
          className="hidden lg:grid gap-4 mb-12"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "180px",
          }}
        >
          <div style={{ gridColumn: "1 / span 2", gridRow: "1 / span 2", minHeight: 0, display: "flex" }}>
            <BentoCard item={featured[0]} index={0} inView={inView} isLarge={true} />
          </div>
          <div style={{ minHeight: 0, display: "flex" }}><BentoCard item={featured[1]} index={1} inView={inView} isLarge={false} /></div>
          <div style={{ minHeight: 0, display: "flex" }}><BentoCard item={featured[2]} index={2} inView={inView} isLarge={false} /></div>
          <div style={{ minHeight: 0, display: "flex" }}><BentoCard item={featured[3]} index={3} inView={inView} isLarge={false} /></div>
          <div style={{ minHeight: 0, display: "flex" }}><BentoCard item={featured[4]} index={4} inView={inView} isLarge={false} /></div>
          <div style={{ minHeight: 0, display: "flex" }}><BentoCard item={featured[5]} index={5} inView={inView} isLarge={false} /></div>
          <div style={{ minHeight: 0, display: "flex" }}><BentoCard item={featured[6]} index={6} inView={inView} isLarge={false} /></div>
          <div style={{ gridColumn: "3 / span 2", gridRow: "3 / span 2", minHeight: 0, display: "flex" }}>
            <BentoCard item={featured[7]} index={7} inView={inView} isLarge={true} />
          </div>
        </div>

        {/* ── MOBILE GRID ── */}
        <div className="grid grid-cols-2 gap-3 lg:hidden mb-12">
          {featured.map((item, i) => (
            <div key={item.name} style={{ minHeight: 160 }}>
              <BentoCard item={item} index={i} inView={inView} isLarge={false} />
            </div>
          ))}
        </div>

        {/* Category strip + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)" }}
        >
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(212,175,55,0.6)", marginBottom: "1.25rem" }}>
            Full Menu Includes
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {categories.map((cat) => (
              <span
                key={cat}
                style={{ padding: "6px 16px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 500, background: "rgba(212,175,55,0.07)", color: "rgba(212,175,55,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                {cat}
              </span>
            ))}
          </div>
          <a
            href="/menu"
            className="btn-shimmer px-8 py-3.5 rounded-full text-sm"
            style={{ boxShadow: "0 4px 20px rgba(212,175,55,0.15)" }}
          >
            View Full Menu →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
