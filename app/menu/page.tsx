"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MENU_ITEMS, CATEGORIES } from "@/lib/menuData";
import type { MenuItem } from "@/lib/menuData";

/* Category-specific dark gradients */
const CATEGORY_GRADIENTS: Record<string, string> = {
  "NYC Cookies":      "linear-gradient(155deg, #1C0A02 0%, #2E1608 60%, #1C0A02 100%)",
  "Cookie Cakes":     "linear-gradient(155deg, #1A0E04 0%, #2C1A0A 60%, #1A0E04 100%)",
  "Brownies":         "linear-gradient(155deg, #160404 0%, #260808 60%, #160404 100%)",
  "Blondies":         "linear-gradient(155deg, #1C1806 0%, #2C2410 60%, #1C1806 100%)",
  "Cheesecakes":      "linear-gradient(155deg, #0E0E14 0%, #1A1A22 60%, #0E0E14 100%)",
  "Shortcakes":       "linear-gradient(155deg, #160810 0%, #241018 60%, #160810 100%)",
  "Cake Bars":        "linear-gradient(155deg, #160C02 0%, #261806 60%, #160C02 100%)",
  "Classic Delights": "linear-gradient(155deg, #0C100C 0%, #161C16 60%, #0C100C 100%)",
  "Signature Cakes":  "linear-gradient(155deg, #0E0A16 0%, #1C1424 60%, #0E0A16 100%)",
};

/* Category-specific hover border glow colors */
const CATEGORY_HOVER_COLORS: Record<string, string> = {
  "NYC Cookies":      "rgba(212,175,55,0.55)",
  "Cookie Cakes":     "rgba(200,140,40,0.5)",
  "Brownies":         "rgba(180,50,50,0.6)",
  "Blondies":         "rgba(220,185,60,0.5)",
  "Cheesecakes":      "rgba(100,160,200,0.45)",
  "Shortcakes":       "rgba(200,80,100,0.5)",
  "Cake Bars":        "rgba(190,120,50,0.5)",
  "Classic Delights": "rgba(80,140,80,0.45)",
  "Signature Cakes":  "rgba(160,100,220,0.45)",
};

/* Tag colors */
const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  bestseller:     { bg: "rgba(212,175,55,0.12)",  color: "rgba(212,175,55,0.8)" },
  "fan favorite": { bg: "rgba(139,26,26,0.2)",    color: "rgba(220,100,100,0.9)" },
  viral:          { bg: "rgba(99,102,241,0.15)",  color: "rgba(180,185,255,0.9)" },
  specialty:      { bg: "rgba(16,185,129,0.15)",  color: "rgba(80,220,160,0.9)" },
  classic:        { bg: "rgba(180,180,180,0.1)",  color: "rgba(200,200,200,0.7)" },
  rotating:       { bg: "rgba(245,158,11,0.15)",  color: "rgba(245,180,80,0.9)" },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      MENU_ITEMS.filter((item) => {
        const matchCat = activeCategory === "All" || item.category === activeCategory;
        const matchSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
      }),
    [activeCategory, search]
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: MENU_ITEMS.length };
    MENU_ITEMS.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--obsidian)", minHeight: "100vh" }}>

        {/* Page hero — dark, consistent with homepage */}
        <div className="page-hero" style={{ background: "var(--obsidian)" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 25% 60%, rgba(139,26,26,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.08) 0%, transparent 50%)",
            }}
          />
          <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.25 }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="eyebrow"
              style={{ color: "#25A0A0", marginBottom: "1rem" }}
            >
              Our Menu
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
              Our Offerings
            </motion.h1>
            <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                fontSize: "var(--text-body)",
                color: "var(--text-tertiary)",
                maxWidth: 460,
                margin: "0 auto",
              }}
            >
              {MENU_ITEMS.length} handcrafted desserts across {CATEGORIES.length - 1} categories.
              Custom orders always welcome.
            </motion.p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>

          {/* Search — dark themed */}
          <div style={{ maxWidth: 480, margin: "0 auto 2rem" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-quaternary)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search desserts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-gold-dark"
                style={{
                  width: "100%",
                  paddingLeft: 44,
                  paddingRight: search ? 40 : 16,
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderRadius: 999,
                  fontSize: "0.875rem",
                  background: "var(--surface-1)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  color: "var(--cream)",
                  fontFamily: "Inter, sans-serif",
                  outline: "none",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <X size={13} style={{ color: "var(--text-tertiary)" }} />
                </button>
              )}
            </div>
          </div>

          {/* Category pills — dark themed */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 16px",
                    borderRadius: 999,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.25s var(--ease-out-expo)",
                    background: active ? "var(--gold)" : "var(--surface-1)",
                    color: active ? "#120e00" : "var(--text-secondary)",
                    border: active
                      ? "1px solid var(--gold)"
                      : "1px solid rgba(212,175,55,0.12)",
                    boxShadow: active
                      ? "0 4px 16px rgba(212,175,55,0.28)"
                      : "none",
                  }}
                >
                  {cat}
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: active ? "rgba(18,14,0,0.15)" : "rgba(212,175,55,0.08)",
                      color: active ? "#120e00" : "rgba(212,175,55,0.6)",
                    }}
                  >
                    {counts[cat] ?? 0}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Results count */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ fontSize: "0.75rem", color: "var(--text-quaternary)", fontWeight: 500 }}>
              {filtered.length === 0 ? "No results" : `${filtered.length} item${filtered.length !== 1 ? "s" : ""}`}
              {search && ` matching "${search}"`}
            </p>
            {(search || activeCategory !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(212,175,55,0.7)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={11} /> Clear filters
              </button>
            )}
          </div>

          {/* Menu grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center", padding: "5rem 0" }}
              >
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--cream)", marginBottom: "0.5rem" }}>
                  Nothing found
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-quaternary)" }}>
                  Try a different search or category
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {filtered.map((item, i) => (
                  <MenuCard key={item.name} item={item} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom order banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: "4rem",
              borderRadius: 24,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/collage.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, rgba(30,5,5,0.97) 0%, rgba(45,8,8,0.93) 40%, rgba(60,12,12,0.82) 70%, rgba(30,5,5,0.88) 100%)",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "3rem 2rem",
                textAlign: "center",
              }}
            >
              <p className="eyebrow" style={{ color: "rgba(212,175,55,0.7)", marginBottom: "1rem" }}>
                {"Don't See What You Want?"}
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "var(--cream)",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                Custom Orders Available
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "var(--text-tertiary)",
                  maxWidth: 440,
                  margin: "0 auto 2rem",
                }}
              >
                Birthday cakes, wedding desserts, corporate gifting, or a completely custom flavor. Reach out and we&apos;ll make it happen.
              </p>
              <a
                href="/order"
                className="btn-shimmer"
                style={{
                  padding: "13px 32px",
                  borderRadius: 999,
                  fontSize: "0.875rem",
                  boxShadow: "0 0 28px rgba(212,175,55,0.2)",
                }}
              >
                Get in Touch &rarr;
              </a>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── MenuCard ── */
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tags = item.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.3)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Full photo background */}
      <div style={{ position: "relative", height: 420 }}>
        <Image
          src={item.photo}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          style={{
            objectPosition: "center 40%",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Gradient overlay — stronger at bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(15,10,5,0.95) 0%, rgba(15,10,5,0.7) 30%, rgba(15,10,5,0.15) 55%, transparent 100%)",
          }}
        />

        {/* Tags — top right */}
        {tags.length > 0 && (
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6, zIndex: 2 }}>
            {tags.map((tag) => {
              const s = TAG_COLORS[tag] ?? { bg: "rgba(212,175,55,0.15)", color: "rgba(212,175,55,0.8)" };
              return (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: s.color,
                    border: "1px solid rgba(255,255,255,0.1)",
                    textTransform: "capitalize",
                    letterSpacing: "0.04em",
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Glassmorphism text overlay — bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1.5rem",
            zIndex: 2,
          }}
        >
          {/* Category label */}
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.7)",
            }}
          >
            {item.category}
          </span>

          {/* Name */}
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.35rem",
              fontWeight: 600,
              fontStyle: "italic",
              color: "#F2E4C8",
              lineHeight: 1.3,
              marginTop: "0.35rem",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {item.name}
          </h3>

          {/* Description — glassmorphism card */}
          <div
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: 14,
              background: "rgba(30,20,10,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                lineHeight: 1.65,
                color: "rgba(242,228,200,0.8)",
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
