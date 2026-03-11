"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/locationData";

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section style={{ background: "var(--cream-dark)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-muted)" }}>
            Gallery
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--red)" }}>
            Made to Be Seen
          </h2>
          <div className="gold-divider mb-4" />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Every dessert is a work of art. Click to get a closer look.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer ${i === 0 ? "col-span-2 md:col-span-1 row-span-2" : ""}`}
              style={{
                background: item.color,
                aspectRatio: i === 0 ? "1/1.8" : "1/1",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                <span className="text-5xl">{item.emoji}</span>
                <span className="text-xs font-semibold text-center leading-snug" style={{ color: "rgba(250,240,230,0.7)" }}>
                  {item.label}
                </span>
              </div>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.1)" }}
              >
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Instagram prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm mt-8"
          style={{ color: "var(--text-muted)" }}
        >
          Follow{" "}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:opacity-80"
            style={{ color: "var(--red)" }}
          >
            @CleopatraDelights
          </a>{" "}
          on Instagram for more photos and daily updates.
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(10,5,5,0.92)", backdropFilter: "blur(10px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative rounded-3xl flex flex-col items-center justify-center gap-4 p-12 max-w-sm w-full"
              style={{
                background: GALLERY_ITEMS[selected].color,
                border: "1px solid rgba(212,175,55,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "var(--cream)" }}
              >
                <X size={16} />
              </button>
              <span className="text-8xl">{GALLERY_ITEMS[selected].emoji}</span>
              <h3 className="font-serif text-2xl font-bold text-center" style={{ color: "var(--cream)" }}>
                {GALLERY_ITEMS[selected].label}
              </h3>
              <a
                href="/menu"
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "var(--gold)", color: "var(--charcoal)" }}
              >
                View on Menu
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
