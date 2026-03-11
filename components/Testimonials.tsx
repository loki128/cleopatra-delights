"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/locationData";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "var(--charcoal)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
            What People Say
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Straight From Our Customers
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.1)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={13} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1 italic" style={{ color: "rgba(250,240,230,0.7)" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Item tag */}
              <span
                className="text-xs px-3 py-1 rounded-full w-fit font-medium"
                style={{ background: "rgba(212,175,55,0.1)", color: "var(--gold)" }}
              >
                {t.item}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--red)", color: "var(--cream)" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--cream)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "rgba(250,240,230,0.35)" }}>{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
