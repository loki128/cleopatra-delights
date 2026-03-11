"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Truck, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import { UPCOMING_EVENTS, TYPE_STYLES } from "@/lib/locationData";

export default function LocationPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--cream)" }}>

        {/* Hero */}
        <div
          className="pt-32 pb-16 px-6 text-center relative overflow-hidden"
          style={{ background: "var(--charcoal)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 60% 40%, rgba(139,26,26,0.3) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(212,175,55,0.08) 0%, transparent 50%)"
          }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
              Find Us
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--cream)" }}>
              Where to Find<br />
              <span className="italic" style={{ color: "var(--gold)" }}>Cleopatra Delights</span>
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-base" style={{ color: "rgba(250,240,230,0.6)" }}>
              We operate from a food trailer and canopy stand across Jacksonville.
              Find us at markets, pop-ups, and events — follow Instagram for real-time updates.
            </p>
          </div>
        </div>

        {/* Quick info bar */}
        <div style={{ background: "var(--red)", borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { icon: Truck,     text: "Food Trailer + Canopy Stand" },
              { icon: MapPin,    text: "Jacksonville, FL & Surrounding Areas" },
              { icon: Instagram, text: "@CleopatraDelights for live updates" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "rgba(250,240,230,0.85)" }}>
                <Icon size={14} style={{ color: "var(--gold)" }} />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold-muted)" }}>
              Schedule
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "var(--red)" }}>
              Upcoming Locations & Events
            </h2>
          </motion.div>

          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event, i) => {
              const typeStyle = TYPE_STYLES[event.type];
              return (
                <motion.div
                  key={event.name + event.date}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
                  style={{
                    background: "white",
                    border: "1px solid rgba(212,175,55,0.15)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Date block */}
                  <div
                    className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
                    style={{ background: "var(--red)" }}
                  >
                    <span className="text-xs font-bold uppercase" style={{ color: "rgba(250,240,230,0.6)" }}>
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="text-xl font-bold leading-none" style={{ color: "var(--cream)" }}>
                      {event.date.split(" ")[1]}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg font-semibold" style={{ color: "var(--charcoal)" }}>
                        {event.name}
                      </h3>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{ background: typeStyle.bg, color: typeStyle.color }}
                      >
                        {typeStyle.label}
                      </span>
                      {event.note && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                          style={{ background: "rgba(212,175,55,0.1)", color: "var(--gold-muted)" }}>
                          {event.note}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} />
                        {event.address}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {event.day} · {event.time}
                      </span>
                    </div>
                  </div>

                  {/* Calendar link */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all hover:scale-105"
                    style={{ background: "rgba(139,26,26,0.07)", color: "var(--red)" }}
                  >
                    <Calendar size={13} />
                    Save Date
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-center mt-6"
            style={{ color: "var(--text-muted)" }}
          >
            Schedule is updated regularly. Follow{" "}
            <a href="https://instagram.com" className="font-semibold" style={{ color: "var(--red)" }}>
              @CleopatraDelights
            </a>{" "}
            on Instagram for last-minute pop-ups and location changes.
          </motion.p>
        </div>

        {/* Map embed */}
        <div style={{ background: "var(--cream-dark)" }}>
          <div className="max-w-5xl mx-auto px-6 md:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold-muted)" }}>
                Service Area
              </p>
              <h2 className="font-serif text-3xl font-bold" style={{ color: "var(--red)" }}>
                Jacksonville & Surrounding Areas
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224011.4737437698!2d-81.87697!3d30.33218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7f9!2sJacksonville%2C%20FL!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cleopatra Delights service area — Jacksonville FL"
              />
            </motion.div>
          </div>
        </div>

        {/* Gallery */}
        <Gallery />

        {/* Testimonials */}
        <Testimonials />

        {/* Instagram CTA */}
        <div className="px-6 py-16 text-center" style={{ background: "var(--cream)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <Instagram size={28} className="mx-auto mb-4" style={{ color: "var(--red)" }} />
            <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--charcoal)" }}>
              Never Miss a Drop
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Follow us for daily location updates, new flavors, and behind-the-scenes content.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "var(--red)", color: "var(--cream)", boxShadow: "0 4px 20px rgba(139,26,26,0.25)" }}
            >
              <Instagram size={15} />
              Follow @CleopatraDelights
            </a>
          </motion.div>
        </div>

      </main>
      <Footer />
    </>
  );
}
