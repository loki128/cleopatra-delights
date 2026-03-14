"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const ROW_1 = [
  { src: "/images/collage.jpg", label: "Our Full Spread", position: "center 40%" },
  { src: "/images/cookies-tray.jpg", label: "Cookie Collection", position: "center 30%" },
  { src: "/images/biscoff-brownies.jpg", label: "Our First Batch", position: "center 45%" },
  { src: "/images/brownies-pb.jpg", label: "PB Pretzel Brownies", position: "center 40%" },
  { src: "/images/cookies-biscoff.jpg", label: "Biscoff Cookies", position: "center 50%" },
  { src: "/images/cookies-variety.jpg", label: "Cookie Variety", position: "center 35%" },
];

const ROW_2 = [
  { src: "/images/cookies-variety.jpg", label: "Cookie Variety", position: "center 35%" },
  { src: "/images/brownies-pb.jpg", label: "PB Pretzel Brownies", position: "center 40%" },
  { src: "/images/collage.jpg", label: "Our Full Spread", position: "center 40%" },
  { src: "/images/cookies-biscoff.jpg", label: "Biscoff Cookies", position: "center 50%" },
  { src: "/images/biscoff-brownies.jpg", label: "Our First Batch", position: "center 45%" },
  { src: "/images/cookies-tray.jpg", label: "Cookie Collection", position: "center 30%" },
];

function MarqueeRow({
  photos,
  direction,
  duration,
}: {
  photos: typeof ROW_1;
  direction: "left" | "right";
  duration: number;
}) {
  /* Duplicate the set for seamless loop */
  const items = [...photos, ...photos];

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={direction === "left" ? "marquee-gallery-left" : "marquee-gallery-right"}
        style={{
          display: "flex",
          gap: "0.75rem",
          width: "max-content",
          animationDuration: `${duration}s`,
        }}
      >
        {items.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            style={{
              position: "relative",
              width: "clamp(240px, 75vw, 320px)",
              height: "clamp(165px, 52vw, 220px)",
              borderRadius: 14,
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(212,175,55,0.08)",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.label}
              fill
              sizes="320px"
              className="object-cover"
              style={{ objectPosition: photo.position }}
              loading="lazy"
            />
            {/* Bottom gradient with label */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.25rem 1rem 0.75rem",
                background: "linear-gradient(to top, rgba(8,7,10,0.8) 0%, rgba(8,7,10,0.3) 60%, transparent 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {photo.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--surface-0)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,26,26,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}
      >
        <p
          className="eyebrow"
          style={{ color: "#25A0A0", marginBottom: "0.875rem", display: "block" }}
        >
          Handcrafted Goods
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "var(--text-display)",
            color: "var(--cream)",
            marginBottom: "1rem",
          }}
        >
          Made to Be Seen
        </h2>
        <div className="gold-divider" />
      </motion.div>

      {/* Dual marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <MarqueeRow photos={ROW_1} direction="left" duration={45} />
        <MarqueeRow photos={ROW_2} direction="right" duration={50} />
      </motion.div>
    </section>
  );
}
