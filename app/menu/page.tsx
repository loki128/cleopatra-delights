"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
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

/* Tag colors — dark-background friendly */
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
      <main style={{ background: "var(--cream)", minHeight: "100vh" }}>

        {/* Page hero */}
        <div className="page-hero">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 25% 60%, rgba(139,26,26,0.42) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.1) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="dot-grid"
            style={{ position: "absolute", inset: 0, opacity: 0.32, pointerEvents: "none" }}
          />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <p className="eyebrow" style={{ color: "#25A0A0", marginBottom: "1rem" }}>
              Full Menu
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--cream)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                letterSpacing: "-0.01em",
              }}
            >
              Our Offerings
            </h1>
            <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(250,240,230,0.55)",
                maxWidth: 460,
                margin: "0 auto",
              }}
            >
              {MENU_ITEMS.length} handcrafted desserts across {CATEGORIES.length - 1} categories.
              Custom orders always welcome.
            </p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>

          {/* Search */}
          <div style={{ maxWidth: 480, margin: "0 auto 2rem" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search desserts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-gold"
                style={{
                  width: "100%",
                  paddingLeft: 44,
                  paddingRight: search ? 40 : 16,
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderRadius: 999,
                  fontSize: "0.875rem",
                  background: "white",
                  border: "1px solid rgba(212,175,55,0.22)",
                  color: "var(--charcoal)",
                  fontFamily: "Inter, sans-serif",
                  outline: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
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
                  <X size={13} style={{ color: "var(--text-muted)" }} />
                </button>
              )}
            </div>
          </div>

          {/* Category pills — centered */}
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
                    transition: "all 0.2s",
                    background: active ? "var(--gold)" : "white",
                    color: active ? "#120e00" : "var(--text-muted)",
                    border: active
                      ? "1px solid var(--gold)"
                      : "1px solid rgba(212,175,55,0.22)",
                    boxShadow: active
                      ? "0 4px 16px rgba(212,175,55,0.28)"
                      : "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {cat}
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: active ? "rgba(18,14,0,0.15)" : "rgba(139,26,26,0.07)",
                      color: active ? "#120e00" : "var(--red)",
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
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
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
                  color: "var(--red)",
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
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                  Nothing found
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1.25rem",
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
              borderRadius: 28,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Background photo */}
            <div style={{ position: "absolute", inset: 0 }}>
              <img
                src="/images/collage.jpg"
                alt=""
                aria-hidden="true"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
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
                  color: "rgba(250,240,230,0.55)",
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
                Get in Touch →
              </a>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── MenuCard — unified typographic design, no image zone ── */
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const cardGradient =
    CATEGORY_GRADIENTS[item.category] ??
    "linear-gradient(155deg, #1A0A02 0%, #2E1608 100%)";

  const hoverBorderColor =
    CATEGORY_HOVER_COLORS[item.category] ?? "rgba(212,175,55,0.55)";

  const firstTag = item.tags && item.tags.length > 0 ? item.tags[0] : null;
  const restTags = item.tags && item.tags.length > 1 ? item.tags.slice(1) : [];

  const isLongName = item.name.length > 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardGradient,
        border: `1px solid ${hovered ? hoverBorderColor : "rgba(212,175,55,0.12)"}`,
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 240,
        padding: "1.75rem",
        position: "relative",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.28), 0 0 0 1px ${hoverBorderColor}`
          : "0 2px 12px rgba(0,0,0,0.18)",
        cursor: "default",
      }}
    >
      {/* Egyptian corner brackets */}
      {/* top-left */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          width: 16,
          height: 16,
          borderTop: "1px solid rgba(212,175,55,0.2)",
          borderLeft: "1px solid rgba(212,175,55,0.2)",
          pointerEvents: "none",
        }}
      />
      {/* top-right */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 16,
          height: 16,
          borderTop: "1px solid rgba(212,175,55,0.2)",
          borderRight: "1px solid rgba(212,175,55,0.2)",
          pointerEvents: "none",
        }}
      />
      {/* bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          width: 16,
          height: 16,
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          borderLeft: "1px solid rgba(212,175,55,0.2)",
          pointerEvents: "none",
        }}
      />
      {/* bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          width: 16,
          height: 16,
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          borderRight: "1px solid rgba(212,175,55,0.2)",
          pointerEvents: "none",
        }}
      />

      {/* 1. Top row: category overline + first tag badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.6)",
          }}
        >
          {item.category}
        </span>
        {firstTag && (() => {
          const s = TAG_COLORS[firstTag] ?? {
            bg: "rgba(212,175,55,0.08)",
            color: "rgba(212,175,55,0.65)",
          };
          return (
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 999,
                background: s.bg,
                color: s.color,
                border: "1px solid rgba(212,175,55,0.12)",
                textTransform: "capitalize",
                letterSpacing: "0.04em",
              }}
            >
              {firstTag}
            </span>
          );
        })()}
      </div>

      {/* 2. Decorative divider with diamond */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          marginTop: "0.75rem",
          opacity: 0.4,
        }}
      >
        <div
          style={{
            width: 28,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,1), transparent)",
          }}
        />
        <span
          style={{
            fontSize: "0.5rem",
            color: "rgba(212,175,55,1)",
            lineHeight: 1,
          }}
        >
          ✦
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(90deg, rgba(212,175,55,1), transparent)",
          }}
        />
      </div>

      {/* 3. Product name */}
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isLongName ? "1rem" : "1.1rem",
          fontWeight: 600,
          fontStyle: "italic",
          color: "rgba(250,240,230,0.9)",
          lineHeight: 1.35,
          marginTop: "0.75rem",
          marginBottom: 0,
        }}
      >
        {item.name}
      </h3>

      {/* 4. Description */}
      <p
        style={{
          fontSize: "0.78rem",
          lineHeight: 1.7,
          color: hovered ? "rgba(250,240,230,0.6)" : "rgba(250,240,230,0.45)",
          flex: 1,
          marginTop: "0.75rem",
          transition: "color 0.2s",
          overflow: hovered ? "visible" : "hidden",
          display: "-webkit-box",
          WebkitLineClamp: hovered ? undefined : 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {item.description}
      </p>

      {/* 5. Remaining tags row (skip first tag already shown in top row) */}
      {restTags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            marginTop: "auto",
            paddingTop: "0.75rem",
          }}
        >
          {restTags.map((tag) => {
            const s = TAG_COLORS[tag] ?? {
              bg: "rgba(212,175,55,0.08)",
              color: "rgba(212,175,55,0.65)",
            };
            return (
              <span
                key={tag}
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  padding: "3px 9px",
                  borderRadius: 999,
                  background: s.bg,
                  color: s.color,
                  border: "1px solid rgba(212,175,55,0.12)",
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
    </motion.div>
  );
}
