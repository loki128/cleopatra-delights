"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

const PHOTOS = [
  { src: "/images/collage.jpg", label: "Our Full Spread", featured: true, position: "center 40%" },
  { src: "/images/cookies-tray.jpg", label: "Cookie Collection", featured: false, position: "center 30%" },
  { src: "/images/biscoff-brownies.jpg", label: "Biscoff Brownies", featured: false, position: "center 45%" },
  { src: "/images/brownies-pb.jpg", label: "PB Pretzel Brownies", featured: false, position: "center 40%" },
  { src: "/images/cookies-biscoff.jpg", label: "Biscoff Cookies", featured: false, position: "center 50%" },
  { src: "/images/cookies-variety.jpg", label: "Cookie Variety", featured: false, position: "center 35%" },
];

/* Stagger entrance */
const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const gridItem = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section style={{ background: "var(--surface-0)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 section-py">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="eyebrow"
            style={{
              color: "#25A0A0",
              marginBottom: "0.875rem",
              display: "block",
              textAlign: "center",
            }}
          >
            Handcrafted Goods
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "var(--text-display)",
              color: "var(--cream)",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Made to Be Seen
          </h2>
          <div className="gold-divider" style={{ marginBottom: "1rem" }} />
          <p
            style={{
              fontSize: "var(--text-small)",
              color: "var(--text-tertiary)",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Every dessert is a work of art.
          </p>
        </motion.div>

        {/* Bento photo grid (Stripe-inspired varied spans) */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "260px",
            gap: "0.75rem",
          }}
        >
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.src}
              variants={gridItem}
              onClick={() => setSelected(index)}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                cursor: "pointer",
                border: "1px solid rgba(212,175,55,0.12)",
                gridColumn: photo.featured ? "1 / span 2" : undefined,
                gridRow: photo.featured ? "1 / span 2" : undefined,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(212,175,55,0.35)";
                el.style.boxShadow = "0 12px 40px rgba(212,175,55,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(212,175,55,0.12)";
                el.style.boxShadow = "none";
              }}
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                sizes={photo.featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                className="object-cover transition-transform duration-500 ease-out"
                style={{ objectPosition: photo.position }}
                loading="lazy"
              />
              {/* Hover label overlay */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  padding: "1.5rem 1.25rem 1rem",
                  background:
                    "linear-gradient(to top, rgba(8,4,4,0.85) 0%, rgba(8,4,4,0.4) 60%, transparent 100%)",
                  transform: "translateY(4px)",
                  transition: "transform 0.3s var(--ease-out-expo)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.transform = "translateY(4px)")
                }
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.95rem",
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {photo.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram prompt */}
        <p
          style={{
            fontSize: "var(--text-small)",
            color: "var(--text-tertiary)",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          Follow @CleopatraDelights on Instagram for more.
        </p>
      </div>

      {/* Lightbox — glassmorphism backdrop */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              background: "rgba(8,4,4,0.92)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              style={{
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "85vh",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[selected].src}
                alt={PHOTOS[selected].label}
                style={{
                  display: "block",
                  maxWidth: "90vw",
                  maxHeight: "85vh",
                  objectFit: "contain",
                }}
              />
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--cream)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
