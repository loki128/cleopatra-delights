"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const featured = [
  { name: "Dubai Chocolate Cookie", category: "NYC Cookies", desc: "Rich dark chocolate with pistachio and kataifi — inspired by the viral Dubai bar.", emoji: "🍫" },
  { name: "Biscoff Cheesecake", category: "Cheesecakes", desc: "Creamy cheesecake on a Biscoff crust, topped with cookie butter drizzle.", emoji: "🍰" },
  { name: "Red Velvet S'more Brownie", category: "Brownies", desc: "Fudgy red velvet brownie loaded with toasted marshmallow and chocolate.", emoji: "🟥" },
  { name: "Ferrero Rocher Cake Bar", category: "Cake Bars", desc: "Layers of hazelnut, chocolate sponge, and a Ferrero Rocher crown.", emoji: "🌰" },
  { name: "Banana Pudding Blondie", category: "Blondies", desc: "Vanilla blondie swirled with banana pudding and crushed Nilla wafers.", emoji: "🍌" },
  { name: "Kinder Bueno Cookie", category: "NYC Cookies", desc: "Buttery cookie packed with hazelnut cream and Kinder Bueno pieces.", emoji: "🍪" },
  { name: "Mango Shortcake", category: "Shortcakes", desc: "Fresh mango layers over light vanilla cake and whipped cream.", emoji: "🥭" },
  { name: "Pistachio Caramel Pecan Cheesecake", category: "Cheesecakes", desc: "Bold pistachio cheesecake with salted caramel and candied pecans.", emoji: "🟢" },
];

export default function FeaturedMenu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" className="section" style={{ background: "var(--charcoal)" }} ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
            Our Offerings
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--cream)" }}>
            A Taste of the World
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(250,240,230,0.6)" }}>
            From NYC-style cookies to Middle Eastern-inspired cake bars — every item is handcrafted with globally-sourced inspiration.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {featured.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl p-6 flex flex-col gap-3 cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              <div className="text-3xl">{item.emoji}</div>
              <div>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  {item.category}
                </span>
                <h3
                  className="font-serif text-lg font-semibold mt-1 leading-snug"
                  style={{ color: "var(--cream)" }}
                >
                  {item.name}
                </h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(250,240,230,0.5)" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Categories strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="rounded-2xl p-6 text-center"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Full Menu Includes
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["NYC Cookies", "Cookie Cakes", "Brownies", "Blondies", "Cheesecakes", "Shortcakes", "Cake Bars", "Classic Cakes", "Flan"].map((cat) => (
              <span
                key={cat}
                className="px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(212,175,55,0.12)", color: "var(--gold)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
