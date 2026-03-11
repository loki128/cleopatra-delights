"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const SIGNATURES = [
  {
    name: "Dubai Chocolate Cookie",
    tag: "Fan Favorite",
    tagStyle: { background: "#1B7878", color: "#E8F5F5" },
    region: "Middle Eastern Inspired",
    photo: "/images/cookies-tray.jpg",
    photoPosition: "center 30%",
    story:
      "Inspired by the viral pistachio kataifi bar that broke the internet. Crispy chocolate shell, silky pistachio cream center, kataifi crunch in every bite.",
    accentColor: "rgba(212,175,55,0.5)",
  },
  {
    name: "Biscoff Brownie",
    tag: "Best Seller",
    tagStyle: { background: "var(--red)", color: "var(--cream)" },
    region: "European Inspired",
    photo: "/images/biscoff-brownies.jpg",
    photoPosition: "center 40%",
    story:
      "Fudgy brownie base crowned with cookie butter glaze and a whole Lotus Biscoff biscuit. The one customers always come back for.",
    accentColor: "rgba(180,110,40,0.5)",
  },
  {
    name: "Peanut Butter Pretzel Brownie",
    tag: "Signature",
    tagStyle: { background: "rgba(255,255,255,0.1)", color: "rgba(250,240,230,0.8)", border: "1px solid rgba(255,255,255,0.15)" },
    region: "American Inspired",
    photo: "/images/brownies-pb.jpg",
    photoPosition: "center 45%",
    story:
      "Dense fudgy brownie with rivers of peanut butter, topped with crushed pretzels for a salty-sweet crunch. Pure indulgence.",
    accentColor: "rgba(180,130,60,0.5)",
  },
];

/* Linear-style stagger + blur-in */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SignatureSpotlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "var(--surface-0)", position: "relative", overflow: "hidden" }}>
      {/* Radial glow backdrop (Linear-inspired) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 10% 50%, rgba(139,26,26,0.1) 0%, transparent 55%), radial-gradient(ellipse at 90% 30%, rgba(27,120,120,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" style={{ opacity: 0.15 }} />

      <div className="container section-py" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p className="eyebrow" style={{ color: "#1B7878", marginBottom: "0.875rem" }}>
            Signature Creations
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "var(--text-display)",
              color: "var(--cream)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            The Ones People Come Back For
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* 3-col cards — Linear dark elevation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SIGNATURES.map((item) => (
            <SpotlightCard key={item.name} item={item} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <a
            href="/menu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.65)",
              transition: "color 0.25s var(--ease-out-expo)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.65)")}
          >
            View Full Menu
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

type SignatureItem = (typeof SIGNATURES)[number];

function SpotlightCard({ item }: { item: SignatureItem }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] } }}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        /* Linear-inspired elevation: surface-1 + subtle border */
        border: "1px solid rgba(255,255,255,0.06)",
        background: "var(--surface-1)",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = item.accentColor;
        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${item.accentColor}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Photo zone */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        <Image
          src={item.photo}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out hover:scale-105"
          style={{ objectPosition: item.photoPosition }}
          loading="lazy"
        />
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "50%",
            background: "linear-gradient(to top, rgba(10,10,10,0.85), transparent)",
          }}
        />
        {/* Tag */}
        <div className="absolute" style={{ top: 14, left: 14 }}>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 999,
              display: "inline-block",
              ...item.tagStyle,
            }}
          >
            {item.tag}
          </span>
        </div>
        {/* Region */}
        <div className="absolute" style={{ bottom: 14, left: 16 }}>
          <p
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.7)",
            }}
          >
            {item.region}
          </p>
        </div>
      </div>

      {/* Content zone */}
      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {item.name}
        </h3>
        <p
          style={{
            fontSize: "0.85rem",
            lineHeight: 1.7,
            fontStyle: "italic",
            color: "var(--text-tertiary)",
            flex: 1,
          }}
        >
          {item.story}
        </p>
      </div>
    </motion.div>
  );
}
