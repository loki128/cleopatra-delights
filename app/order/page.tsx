"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, Send, ChevronDown, Sparkles, Clock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type FormData = {
  name: string;
  email: string;
  phone: string;
  orderType: string;
  eventDate: string;
  occasion: string;
  notes: string;
  howHeard: string;
  website: string;
};

type FieldError = Partial<Record<keyof FormData, string>>;

const ORDER_TYPES = [
  "NYC Cookie Box",
  "Cookie Cake",
  "Brownie Tray",
  "Blondie Tray",
  "Cheesecake",
  "Shortcake",
  "Cake Bar Box",
  "Signature Cake",
  "Catering Package",
  "Custom / Other",
];

const HOW_HEARD = [
  "Instagram",
  "TikTok",
  "Word of Mouth",
  "Farmers Market",
  "Google Search",
  "Event / Pop-Up",
  "Other",
];

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(212,175,55,0.18)",
  color: "var(--cream)",
  fontFamily: "Inter, sans-serif",
  borderRadius: "var(--radius-sm)",
  padding: "11px 15px",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const inputFocusClass = "input-gold-dark";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(250,240,230,0.45)",
        }}
      >
        {label} {required && <span style={{ color: "rgba(212,175,55,0.8)" }}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 5, color: "#f87171" }}
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OrderPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", orderType: "",
    eventDate: "", occasion: "", notes: "", howHeard: "", website: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const validate = (): boolean => {
    const newErrors: FieldError = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.orderType) newErrors.orderType = "Please select an order type";
    if (!form.notes.trim()) newErrors.notes = "Please describe what you'd like";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--obsidian)", minHeight: "100vh" }}>

        {/* Page hero */}
        <div className="page-hero" style={{ background: "var(--obsidian)" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 35% 60%, rgba(139,26,26,0.45) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <p className="eyebrow" style={{ color: "#25A0A0", marginBottom: "1rem" }}>Custom Orders</p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--cream)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                letterSpacing: "-0.01em",
              }}
            >
              {"Let's Create"}<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Something Special</em>
            </h1>
            <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
            <p style={{ fontSize: "1rem", color: "rgba(250,240,230,0.5)", maxWidth: 440, margin: "0 auto" }}>
              Birthdays, weddings, corporate events, or just because. Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* Main content — 2-col desktop */}
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              alignItems: "start",
              position: "relative",
            }}
            className="lg:order-grid"
          >

            {/* Left: Context panel (desktop only) */}
            <div
              className="hidden lg:block"
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  borderRadius: "var(--radius-xl)",
                  padding: "2.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--cream)",
                    lineHeight: 1.3,
                    marginBottom: "1.5rem",
                  }}
                >
                  How it <em style={{ fontStyle: "italic", color: "var(--gold)" }}>works</em>
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    { icon: Send, step: "01", title: "Fill the form", desc: "Tell us what you want — flavors, quantity, occasion, timeline." },
                    { icon: Clock, step: "02", title: "We confirm", desc: "We respond within 24 hours to finalize your order details." },
                    { icon: Sparkles, step: "03", title: "Made fresh", desc: "Your order is handcrafted with premium ingredients and ready for pickup." },
                  ].map(({ icon: Icon, step, title, desc }) => (
                    <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(139,26,26,0.2)",
                          border: "1px solid rgba(139,26,26,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(212,175,55,0.45)", marginBottom: 3 }}>{step}</p>
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--cream)", marginBottom: 4 }}>{title}</p>
                        <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "rgba(250,240,230,0.4)" }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badge */}
              <div
                style={{
                  background: "rgba(212,175,55,0.05)",
                  border: "1px solid rgba(212,175,55,0.1)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Shield size={18} style={{ color: "rgba(212,175,55,0.5)", flexShrink: 0 }} />
                <p style={{ fontSize: "0.78rem", lineHeight: 1.55, color: "rgba(250,240,230,0.35)" }}>
                  Your information is kept private and never shared or sold.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    borderRadius: "var(--radius-xl)",
                    padding: "3.5rem 2.5rem",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(212,175,55,0.1)",
                      border: "1px solid rgba(212,175,55,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.75rem",
                    }}
                  >
                    <CheckCircle size={30} style={{ color: "var(--gold)" }} />
                  </motion.div>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--cream)",
                      marginBottom: "0.875rem",
                    }}
                  >
                    Order Request Sent!
                  </h2>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(250,240,230,0.5)", marginBottom: "2.5rem" }}>
                    Thank you, <strong style={{ color: "var(--cream)" }}>{form.name}</strong>! We&apos;ve received your request and will reach out to <strong style={{ color: "var(--cream)" }}>{form.email}</strong> within 24 hours. Every creation at Cleopatra Delights is made to order — yours is next.
                  </p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <a
                      href="/menu"
                      style={{
                        padding: "11px 24px",
                        borderRadius: 999,
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        background: "var(--red)",
                        color: "var(--cream)",
                        transition: "all 0.2s",
                      }}
                    >
                      Browse Menu
                    </a>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setForm({ name: "", email: "", phone: "", orderType: "", eventDate: "", occasion: "", notes: "", howHeard: "", website: "" });
                      }}
                      style={{
                        padding: "11px 24px",
                        borderRadius: 999,
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(250,240,230,0.7)",
                        border: "1px solid rgba(212,175,55,0.2)",
                        cursor: "pointer",
                      }}
                    >
                      Submit Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(212,175,55,0.12)",
                      borderRadius: "var(--radius-xl)",
                      padding: "2.5rem",
                    }}
                  >
                    {/* Honeypot */}
                    <input type="text" name="website" value={form.website} onChange={set("website")} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "var(--cream)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Your Order Details
                    </h2>
                    <p style={{ fontSize: "0.8rem", color: "rgba(250,240,230,0.35)", marginBottom: "2rem" }}>
                      Fields marked with <span style={{ color: "rgba(212,175,55,0.7)" }}>*</span> are required.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      {/* Name + Email */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1.25rem" }} className="sm:grid-cols-2-order">
                        <Field label="Your Name" required error={errors.name}>
                          <input type="text" value={form.name} onChange={set("name")} placeholder="Your name" className="input-gold" style={{ ...inputStyle, borderColor: errors.name ? "#f87171" : undefined }} />
                        </Field>
                        <Field label="Email Address" required error={errors.email}>
                          <input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" className="input-gold" style={{ ...inputStyle, borderColor: errors.email ? "#f87171" : undefined }} />
                        </Field>
                      </div>

                      {/* Phone + Order Type */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1.25rem" }} className="sm:grid-cols-2-order">
                        <Field label="Phone (Optional)" error={errors.phone}>
                          <input type="tel" value={form.phone} onChange={set("phone")} placeholder="(904) 555-0000" className="input-gold" style={inputStyle} />
                        </Field>
                        <Field label="What Are You Craving?" required error={errors.orderType}>
                          <div style={{ position: "relative" }}>
                            <select value={form.orderType} onChange={set("orderType")} className="input-gold" style={{ ...inputStyle, appearance: "none", paddingRight: 36, borderColor: errors.orderType ? "#f87171" : undefined }}>
                              <option value="">Select type...</option>
                              {ORDER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <ChevronDown size={13} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(250,240,230,0.4)" }} />
                          </div>
                        </Field>
                      </div>

                      {/* Date + Occasion */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1.25rem" }} className="sm:grid-cols-2-order">
                        <Field label="When Do You Need It?">
                          <input type="date" value={form.eventDate} onChange={set("eventDate")} className="input-gold" style={inputStyle} />
                        </Field>
                        <Field label="What's the Occasion?">
                          <input type="text" value={form.occasion} onChange={set("occasion")} placeholder="Birthday, Wedding, Corporate..." className="input-gold" style={inputStyle} />
                        </Field>
                      </div>

                      {/* Notes */}
                      <Field label="Tell Us Everything" required error={errors.notes}>
                        <textarea
                          value={form.notes}
                          onChange={set("notes")}
                          rows={5}
                          placeholder="Tell us what you'd like — flavors, quantity, dietary restrictions, inspiration, anything that helps us create the perfect order for you..."
                          className="input-gold"
                          style={{ ...inputStyle, resize: "vertical", lineHeight: "1.65", borderColor: errors.notes ? "#f87171" : undefined }}
                        />
                      </Field>

                      {/* How heard */}
                      <Field label="How Did You Hear About Us?">
                        <div style={{ position: "relative" }}>
                          <select value={form.howHeard} onChange={set("howHeard")} className="input-gold" style={{ ...inputStyle, appearance: "none", paddingRight: 36 }}>
                            <option value="">Select...</option>
                            {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
                          </select>
                          <ChevronDown size={13} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(250,240,230,0.4)" }} />
                        </div>
                      </Field>

                      {/* Server error */}
                      <AnimatePresence>
                        {status === "error" && serverError && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "14px 16px",
                              borderRadius: "var(--radius-sm)",
                              background: "rgba(248,113,113,0.08)",
                              border: "1px solid rgba(248,113,113,0.2)",
                              color: "#f87171",
                              fontSize: "0.875rem",
                            }}
                          >
                            <AlertCircle size={15} style={{ flexShrink: 0 }} />
                            {serverError}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={status !== "loading" ? { scale: 1.01 } : {}}
                        whileTap={status !== "loading" ? { scale: 0.99 } : {}}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          padding: "14px",
                          borderRadius: "var(--radius-md)",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          background: status === "loading" ? "rgba(139,26,26,0.4)" : "var(--red)",
                          color: "var(--cream)",
                          cursor: status === "loading" ? "not-allowed" : "pointer",
                          border: "none",
                          boxShadow: status !== "loading" ? "0 4px 24px rgba(139,26,26,0.3)" : "none",
                          letterSpacing: "0.02em",
                          transition: "all 0.2s",
                        }}
                      >
                        {status === "loading" ? (
                          <><Loader2 size={15} className="animate-spin" /> Sending your request...</>
                        ) : (
                          <><Send size={14} /> Send Order Request</>
                        )}
                      </motion.button>

                      <p style={{ fontSize: "0.75rem", textAlign: "center", color: "rgba(250,240,230,0.25)" }}>
                        We respond within 24 hours. Your information is never shared or sold.
                      </p>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
