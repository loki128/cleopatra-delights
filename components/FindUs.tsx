"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Truck, Calendar, Instagram } from "lucide-react";

export default function FindUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="find-us" className="section" style={{ background: "var(--cream)" }} ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-muted)" }}>
            Come Find Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--red)" }}>
            We Come to You
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Cleopatra Delights operates from a food trailer and canopy stand across Jacksonville.
            Follow us on Instagram for real-time location updates and event announcements.
          </p>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Truck,
              title: "Food Trailer",
              desc: "Our fully equipped trailer brings freshly made desserts directly to Jacksonville neighborhoods, markets, and events.",
            },
            {
              icon: Calendar,
              title: "Pop-ups & Events",
              desc: "We appear at farmers markets, festivals, corporate events, and private parties. Inquire about booking us for your event.",
            },
            {
              icon: MapPin,
              title: "Jacksonville, FL",
              desc: "Proudly serving Duval County and surrounding areas. Custom orders available for pickup across the city.",
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="rounded-2xl p-7 text-center"
                style={{ background: "var(--cream-dark)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(139,26,26,0.08)" }}
                >
                  <Icon size={20} style={{ color: "var(--red)" }} />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: "var(--charcoal)" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-2xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, var(--red), #6B1212)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <Instagram size={28} className="mx-auto mb-4" style={{ color: "var(--gold)" }} />
          <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--cream)" }}>
            Follow for Daily Updates
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(250,240,230,0.7)" }}>
            Get real-time location drops, new flavors, and event announcements on Instagram.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "var(--gold)", color: "var(--charcoal)" }}
          >
            <Instagram size={15} />
            @CleopatraDelights
          </a>
        </motion.div>
      </div>
    </section>
  );
}
