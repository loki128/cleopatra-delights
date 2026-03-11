"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Heart, Star } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Global Inspiration",
    desc: "Every recipe is a journey — from Dubai's chocolate-drenched streets to the rich dessert traditions of West Africa, Asia, and beyond.",
  },
  {
    icon: Heart,
    title: "Made with Care",
    desc: "Each treat is handcrafted in small batches. No shortcuts, no shortcuts — just real ingredients and genuine love for the craft.",
  },
  {
    icon: Star,
    title: "Locally Rooted",
    desc: "Born and based in Jacksonville, FL. You'll find us at local markets, pop-ups, and events — bringing the world's flavors to your neighborhood.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section" style={{ background: "var(--cream-dark)" }} ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-muted)" }}>
            Our Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--red)" }}>
            Where Every Bite<br />
            <span className="italic" style={{ color: "var(--charcoal)" }}>Tells a Story</span>
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Cleopatra Delights started with a simple idea: the world&apos;s best desserts shouldn&apos;t be hard to find.
            We travel the globe through flavor — mastering the techniques and traditions of African, Middle Eastern,
            Asian, European, and American sweets — and bring them all to Jacksonville, FL.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="rounded-2xl p-8 text-center"
                style={{ background: "var(--cream)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(139,26,26,0.08)" }}
                >
                  <Icon size={24} style={{ color: "var(--red)" }} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3" style={{ color: "var(--charcoal)" }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
