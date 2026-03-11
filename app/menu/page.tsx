"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MENU_ITEMS, CATEGORIES } from "@/lib/menuData";

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  bestseller:   { bg: "rgba(212,175,55,0.15)", color: "#B8960C" },
  "fan favorite": { bg: "rgba(139,26,26,0.12)", color: "#8B1A1A" },
  viral:        { bg: "rgba(99,102,241,0.12)", color: "#6366f1" },
  specialty:    { bg: "rgba(16,185,129,0.12)", color: "#059669" },
  classic:      { bg: "rgba(100,116,139,0.12)", color: "#475569" },
  rotating:     { bg: "rgba(245,158,11,0.12)", color: "#d97706" },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

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

        {/* Hero banner */}
        <div
          className="pt-32 pb-16 px-6 text-center relative overflow-hidden"
          style={{ background: "var(--charcoal)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(212,175,55,0.1) 0%, transparent 50%)"
          }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
              Full Menu
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--cream)" }}>
              Our Offerings
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-base" style={{ color: "rgba(250,240,230,0.6)" }}>
              {MENU_ITEMS.length} handcrafted desserts across {CATEGORIES.length - 1} categories.
              Custom orders always welcome.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search desserts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3.5 rounded-full text-sm outline-none transition-all"
              style={{
                background: "var(--cream-dark)",
                border: "1px solid rgba(212,175,55,0.25)",
                color: "var(--charcoal)",
                fontFamily: "Inter, sans-serif",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={14} style={{ color: "var(--text-muted)" }} />
              </button>
            )}
          </div>

          {/* Category filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background: active ? "var(--red)" : "var(--cream-dark)",
                    color: active ? "var(--cream)" : "var(--text-muted)",
                    border: active ? "1px solid var(--red)" : "1px solid rgba(212,175,55,0.2)",
                    boxShadow: active ? "0 4px 14px rgba(139,26,26,0.25)" : "none",
                  }}
                >
                  {cat}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs"
                    style={{
                      background: active ? "rgba(255,255,255,0.2)" : "rgba(139,26,26,0.08)",
                      color: active ? "var(--cream)" : "var(--red)",
                    }}
                  >
                    {counts[cat] ?? 0}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {filtered.length === 0 ? "No results" : `${filtered.length} item${filtered.length !== 1 ? "s" : ""}`}
              {search && ` for "${search}"`}
            </p>
            {(search || activeCategory !== "All") && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ color: "var(--red)" }}
              >
                <SlidersHorizontal size={12} />
                Clear filters
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
                className="text-center py-24"
              >
                <p className="text-4xl mb-4">🔍</p>
                <p className="font-serif text-xl mb-2" style={{ color: "var(--charcoal)" }}>Nothing found</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try a different search or category</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    className="rounded-2xl p-5 flex flex-col gap-3"
                    style={{
                      background: "white",
                      border: "1px solid rgba(212,175,55,0.15)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Emoji */}
                    <div className="text-3xl">{item.emoji}</div>

                    {/* Category tag */}
                    <span
                      className="text-xs font-semibold tracking-widest uppercase w-fit px-2 py-0.5 rounded"
                      style={{ background: "rgba(139,26,26,0.07)", color: "var(--red)" }}
                    >
                      {item.category}
                    </span>

                    {/* Name */}
                    <h3 className="font-serif text-base font-semibold leading-snug" style={{ color: "var(--charcoal)" }}>
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                            style={TAG_COLORS[tag] ?? { bg: "rgba(0,0,0,0.05)", color: "#555" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom order banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-3xl p-10 text-center"
            style={{
              background: "linear-gradient(135deg, var(--red), #6B1212)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)" }}>
              Don&apos;t See What You Want?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
              Custom Orders Available
            </h2>
            <p className="text-sm leading-relaxed max-w-lg mx-auto mb-8" style={{ color: "rgba(250,240,230,0.7)" }}>
              We love bringing your vision to life. Whether it&apos;s a birthday, wedding, corporate event,
              or a custom flavor — reach out and we&apos;ll make it happen.
            </p>
            <a
              href="/#find-us"
              className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "var(--gold)",
                color: "var(--charcoal)",
                boxShadow: "0 0 24px rgba(212,175,55,0.3)",
              }}
            >
              Get in Touch
            </a>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
