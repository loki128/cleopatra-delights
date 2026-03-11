"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram } from "lucide-react";

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [start, target, duration]);

  return count;
}

const MARQUEE_ITEMS = [
  "Riverside Arts Market",
  "Springfield Farmers Market",
  "Beaches Pop-Up",
  "Jacksonville Food Festival",
  "Avondale Spring Market",
  "San Marco Pop-Up",
  "Private Events Welcome",
  "Corporate Catering Available",
];

const TILES = [
  {
    numeral: "I",
    title: "Food Trailer",
    desc: "Our fully equipped trailer brings freshly baked desserts to Jacksonville neighborhoods, markets, and events.",
  },
  {
    numeral: "II",
    title: "Pop-Ups & Events",
    desc: "We appear at farmers markets, festivals, corporate events, and private gatherings. Book us for your event.",
  },
  {
    numeral: "III",
    title: "Custom Pickup",
    desc: "Proudly serving Duval County. Custom orders available for scheduled pickup across the city.",
  },
];

export default function FindUs() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const orders = useCountUp(500, 1.8, statsInView);
  const flavors = useCountUp(9, 1.2, statsInView);

  return (
    <section id="find-us" style={{ background: "#0D0B08" }} ref={ref}>

      {/* Stats strip */}
      <div
        ref={statsRef}
        style={{
          background: "#0A0804",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
          padding: "3rem 0",
        }}
      >
        {/* Decorative gold line above stats */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
            marginBottom: "3rem",
          }}
        />

        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Stat: Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", padding: "0 3rem" }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "4rem",
                fontWeight: 700,
                color: "var(--gold)",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {orders}+
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(250,240,230,0.4)",
              }}
            >
              Orders Fulfilled
            </p>
          </motion.div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "rgba(212,175,55,0.15)",
              alignSelf: "center",
              flexShrink: 0,
            }}
          />

          {/* Stat: Flavors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textAlign: "center", padding: "0 3rem" }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "4rem",
                fontWeight: 700,
                color: "var(--gold)",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {flavors}
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(250,240,230,0.4)",
              }}
            >
              Flavor Traditions
            </p>
          </motion.div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "rgba(212,175,55,0.15)",
              alignSelf: "center",
              flexShrink: 0,
            }}
          />

          {/* Stat: #1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ textAlign: "center", padding: "0 3rem" }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "4rem",
                fontWeight: 700,
                color: "var(--gold)",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              #1
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(250,240,230,0.4)",
              }}
            >
              Jacksonville&apos;s Favorite
            </p>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip — kept exactly as-is */}
      <div style={{ background: "var(--red)", borderBottom: "1px solid rgba(212,175,55,0.15)", overflow: "hidden" }}>
        <div className="py-3 flex overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((dupe) => (
              <span
                key={dupe}
                className="flex items-center shrink-0"
                aria-hidden={dupe === 1}
              >
                {MARQUEE_ITEMS.map((item, j) => (
                  <span key={`${dupe}-${j}`} className="flex items-center gap-6 px-6 text-xs font-medium tracking-wide whitespace-nowrap" style={{ color: "rgba(250,240,230,0.8)" }}>
                    <span>{item}</span>
                    <span style={{ color: "var(--gold)" }}>&#10022;</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container section-py">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p
            className="eyebrow"
            style={{ color: "#25A0A0", marginBottom: "0.875rem" }}
          >
            Come Find Us
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--cream)",
              lineHeight: 1.15,
            }}
          >
            We Come to You
          </h2>
          <div className="gold-divider" style={{ marginBottom: "1rem" }} />
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(250,240,230,0.45)",
              maxWidth: "480px",
              margin: "1rem auto 0",
            }}
          >
            Our food trailer and canopy stand move through Jacksonville. Follow Instagram for real-time updates.
          </p>
        </motion.div>

        {/* Three editorial info tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.numeral}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              style={{
                background: "rgba(212,175,55,0.03)",
                border: "1px solid rgba(212,175,55,0.12)",
                borderRadius: "16px",
                padding: "2rem",
                transition: "border-color 0.3s ease, transform 0.3s ease",
                cursor: "default",
              }}
              whileHover={{
                borderColor: "rgba(212,175,55,0.3)",
                y: -3,
              }}
            >
              {/* Egyptian ornament: thin gold line + roman numeral */}
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "linear-gradient(90deg, var(--gold), transparent)",
                  marginBottom: "0.75rem",
                }}
              />
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                  fontWeight: 600,
                }}
              >
                {tile.numeral}
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--cream)",
                  marginBottom: "0.75rem",
                }}
              >
                {tile.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.75,
                  color: "rgba(250,240,230,0.45)",
                }}
              >
                {tile.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner — Egyptian-inspired horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            background: "linear-gradient(105deg, rgba(139,26,26,0.15) 0%, rgba(212,175,55,0.05) 50%, rgba(139,26,26,0.1) 100%)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: "20px",
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Left copy */}
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.4rem",
                fontWeight: 600,
              }}
            >
              Never Miss a Drop
            </p>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--cream)",
                marginBottom: "0.4rem",
                lineHeight: 1.2,
              }}
            >
              Follow @CleopatraDelights
            </h3>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(250,240,230,0.4)",
              }}
            >
              Real-time location drops, new flavors, event announcements.
            </p>
          </div>

          {/* Right CTA */}
          <a
            href="/location"
            className="btn-shimmer"
            style={{
              padding: "11px 28px",
              borderRadius: "999px",
              fontSize: "0.875rem",
              display: "inline-flex",
              gap: "8px",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Instagram size={14} />
            View Full Schedule
          </a>
        </motion.div>

      </div>
    </section>
  );
}
