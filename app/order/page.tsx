"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, Send, ChevronDown } from "lucide-react";
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
  website: string; // honeypot
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

function Field({ label, required, error, children }: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        {label} {required && <span style={{ color: "var(--red)" }}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs flex items-center gap-1"
            style={{ color: "#dc2626" }}
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = {
  background: "white",
  border: "1px solid rgba(139,26,26,0.15)",
  color: "var(--charcoal)",
  fontFamily: "Inter, sans-serif",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const focusStyle = "focus:outline-none focus:ring-2";

export default function OrderPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", orderType: "",
    eventDate: "", occasion: "", notes: "", howHeard: "", website: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      <main style={{ background: "var(--cream)", minHeight: "100vh" }}>

        {/* Hero */}
        <div
          className="pt-32 pb-16 px-6 text-center relative overflow-hidden"
          style={{ background: "var(--charcoal)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 40% 60%, rgba(139,26,26,0.35) 0%, transparent 60%)",
          }} />
          <div className="relative z-10 max-w-xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
              Custom Orders
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--cream)" }}>
              Let&apos;s Create<br />
              <span className="italic" style={{ color: "var(--gold)" }}>Something Special</span>
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(250,240,230,0.6)" }}>
              Birthdays, weddings, corporate events, or just because — we love custom orders.
              Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* What to expect strip */}
        <div style={{ background: "var(--red)" }}>
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-6 md:gap-16 text-xs font-medium" style={{ color: "rgba(250,240,230,0.8)" }}>
            {["Response within 24 hours", "All dietary needs considered", "Pickup across Jacksonville"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span style={{ color: "var(--gold)" }}>✦</span> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-16">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-12 text-center"
                style={{ background: "white", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(16,185,129,0.1)" }}
                >
                  <CheckCircle size={32} style={{ color: "#10b981" }} />
                </motion.div>
                <h2 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--charcoal)" }}>
                  Order Request Sent!
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                  Thank you, <strong>{form.name}</strong>! We&apos;ve received your request and will
                  reach out to <strong>{form.email}</strong> within 24 hours to discuss your order.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/menu" className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: "var(--red)", color: "var(--cream)" }}>
                    Browse Menu
                  </a>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", orderType: "", eventDate: "", occasion: "", notes: "", howHeard: "", website: "" }); }}
                    className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: "var(--cream-dark)", color: "var(--charcoal)", border: "1px solid rgba(212,175,55,0.2)" }}
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
                  className="rounded-3xl p-8 md:p-10 space-y-6"
                  style={{ background: "white", border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 4px 30px rgba(0,0,0,0.05)" }}
                >
                  {/* Honeypot — hidden from humans */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={set("website")}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <h2 className="font-serif text-2xl font-bold" style={{ color: "var(--charcoal)" }}>
                    Your Order Details
                  </h2>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required error={errors.name}>
                      <input
                        type="text" value={form.name} onChange={set("name")}
                        placeholder="Your name"
                        className={focusStyle}
                        style={{ ...inputStyle, borderColor: errors.name ? "#dc2626" : undefined }}
                      />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input
                        type="email" value={form.email} onChange={set("email")}
                        placeholder="your@email.com"
                        className={focusStyle}
                        style={{ ...inputStyle, borderColor: errors.email ? "#dc2626" : undefined }}
                      />
                    </Field>
                  </div>

                  {/* Phone + Order Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone" error={errors.phone}>
                      <input
                        type="tel" value={form.phone} onChange={set("phone")}
                        placeholder="(904) 555-0000"
                        className={focusStyle}
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Order Type" required error={errors.orderType}>
                      <div className="relative">
                        <select
                          value={form.orderType} onChange={set("orderType")}
                          className={focusStyle}
                          style={{ ...inputStyle, appearance: "none", paddingRight: "36px", borderColor: errors.orderType ? "#dc2626" : undefined }}
                        >
                          <option value="">Select type...</option>
                          {ORDER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                      </div>
                    </Field>
                  </div>

                  {/* Event Date + Occasion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Event Date">
                      <input
                        type="date" value={form.eventDate} onChange={set("eventDate")}
                        className={focusStyle}
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Occasion">
                      <input
                        type="text" value={form.occasion} onChange={set("occasion")}
                        placeholder="Birthday, Wedding, Corporate..."
                        className={focusStyle}
                        style={inputStyle}
                      />
                    </Field>
                  </div>

                  {/* Notes */}
                  <Field label="Flavor & Order Notes" required error={errors.notes}>
                    <textarea
                      value={form.notes} onChange={set("notes")}
                      rows={5}
                      placeholder="Tell us what you'd like — flavors, quantity, dietary restrictions, inspiration, anything that helps us create the perfect order for you..."
                      className={focusStyle}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6", borderColor: errors.notes ? "#dc2626" : undefined }}
                    />
                  </Field>

                  {/* How heard */}
                  <Field label="How Did You Hear About Us?">
                    <div className="relative">
                      <select
                        value={form.howHeard} onChange={set("howHeard")}
                        className={focusStyle}
                        style={{ ...inputStyle, appearance: "none", paddingRight: "36px" }}
                      >
                        <option value="">Select...</option>
                        {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                    </div>
                  </Field>

                  {/* Server error */}
                  <AnimatePresence>
                    {status === "error" && serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl text-sm"
                        style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", color: "#dc2626" }}
                      >
                        <AlertCircle size={16} className="shrink-0" />
                        {serverError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                    whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-semibold transition-all"
                    style={{
                      background: status === "loading" ? "rgba(139,26,26,0.5)" : "var(--red)",
                      color: "var(--cream)",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      boxShadow: status !== "loading" ? "0 4px 20px rgba(139,26,26,0.25)" : "none",
                    }}
                  >
                    {status === "loading"
                      ? <><Loader2 size={16} className="animate-spin" /> Sending your request...</>
                      : <><Send size={15} /> Send Order Request</>
                    }
                  </motion.button>

                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    We respond within 24 hours. Your information is never shared or sold.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
