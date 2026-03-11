"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";

const PHOTOS = [
  { src: "/images/collage.jpg", label: "Our Full Spread", featured: true, position: "center 40%" },
  { src: "/images/cookies-tray.jpg", label: "Cookie Collection", featured: false, position: "center 30%" },
  { src: "/images/biscoff-brownies.jpg", label: "Biscoff Brownies", featured: false, position: "center 45%" },
  { src: "/images/brownies-pb.jpg", label: "PB Pretzel Brownies", featured: false, position: "center 40%" },
  { src: "/images/cookies-biscoff.jpg", label: "Biscoff Cookies", featured: false, position: "center 50%" },
  { src: "/images/cookies-variety.jpg", label: "Cookie Variety", featured: false, position: "center 35%" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section style={{ background: "var(--papyrus)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
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
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--red)",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Made to Be Seen
          </h2>
          <div className="gold-divider" style={{ marginBottom: "1rem" }} />
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Every dessert is a work of art.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div
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
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              onClick={() => setSelected(index)}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                cursor: "pointer",
                border: "1px solid rgba(212,175,55,0.15)",
                gridColumn: photo.featured ? "1 / span 2" : undefined,
                gridRow: photo.featured ? "1 / span 2" : undefined,
              }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: photo.position,
                  transition: "transform 0.5s ease",
                  display: "block",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                }
              />
              {/* Hover overlay — label slides up from bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem 1.25rem 1rem",
                  background:
                    "linear-gradient(to top, rgba(8,4,4,0.85) 0%, rgba(8,4,4,0.4) 60%, transparent 100%)",
                  transform: "translateY(4px)",
                  transition: "transform 0.3s ease",
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
                    color: "rgba(250,240,230,0.92)",
                  }}
                >
                  {photo.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram prompt */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          Follow @CleopatraDelights on Instagram for more.
        </p>
      </div>

      {/* Lightbox */}
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
              background: "rgba(8,4,4,0.94)",
              backdropFilter: "blur(12px)",
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
