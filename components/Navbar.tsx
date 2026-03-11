"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Menu", href: "/menu" },
  { label: "Find Us", href: "/location" },
  { label: "Order", href: "/order" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [announced, setAnnounced] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const segment = href.replace("/#", "/").split("/")[1];
    if (!segment) return pathname === href;
    return pathname.startsWith("/" + segment);
  };

  const barHeight = announced ? 44 : 0;
  const isHomepage = pathname === "/" || pathname === "";
  const isLight = !isHomepage && !scrolled;

  return (
    <>
      {/* Announcement bar */}
      <AnimatePresence>
        {announced && (
          <motion.div
            initial={{ height: 44, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] overflow-hidden flex items-center justify-center"
            style={{ background: "#145E5E", borderBottom: "1px solid rgba(212,175,55,0.25)" }}
          >
            <p className="text-xs font-medium tracking-wide text-center px-12 sm:px-10" style={{ color: "rgba(255,255,255,0.9)" }}>
              &#10022; Now taking Spring 2026 custom orders — DM{" "}
              <span style={{ color: "var(--gold)" }}>@CleopatraDelights</span> on Instagram
            </p>
            <button
              onClick={() => setAnnounced(false)}
              className="absolute right-2 p-3 rounded hover:opacity-70 transition-opacity"
              style={{ color: "rgba(212,175,55,0.6)" }}
              aria-label="Dismiss announcement"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main navbar — Apple-style translucent glass */}
      <header
        className="fixed left-0 right-0 z-50"
        style={{
          top: barHeight,
          /* Apple-inspired: saturate + blur glass */
          background: isLight
            ? "rgba(242,228,200,0.85)"
            : scrolled
            ? "rgba(8,7,10,0.82)"
            : "transparent",
          backdropFilter: (isLight || scrolled) ? "saturate(180%) blur(20px)" : "none",
          WebkitBackdropFilter: (isLight || scrolled) ? "saturate(180%) blur(20px)" : "none",
          /* Gold hint bottom border (Linear-inspired) */
          borderBottom: isLight
            ? "1px solid rgba(139,26,26,0.12)"
            : scrolled
            ? "1px solid rgba(212,175,55,0.1)"
            : "1px solid transparent",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 64 }}>
          <a href="/" className="flex items-center gap-3 leading-none">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                overflow: "hidden",
                border: `1.5px solid ${isLight ? "rgba(139,26,26,0.35)" : "rgba(212,175,55,0.5)"}`,
                boxShadow: `0 0 0 3px ${isLight ? "rgba(139,26,26,0.06)" : "rgba(212,175,55,0.08)"}`,
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Image
                src="/images/logo.jpg"
                alt="Cleopatra Delights"
                width={44}
                height={44}
                className="object-cover"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="font-serif font-bold"
                style={{
                  fontSize: "1.1rem",
                  color: isLight ? "var(--red)" : "var(--gold)",
                  letterSpacing: "-0.01em",
                }}
              >
                Cleopatra Delights
              </span>
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase" as const,
                  color: isLight ? "rgba(26,14,6,0.4)" : "var(--text-quaternary)",
                }}
              >
                Jacksonville, FL
              </span>
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-medium tracking-wide relative"
                    style={{
                      color: active
                        ? (isLight ? "var(--red)" : "var(--gold)")
                        : (isLight ? "rgba(26,14,6,0.65)" : "var(--text-secondary)"),
                      transition: "color 0.2s ease",
                    }}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: isLight ? "var(--red)" : "var(--gold)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="/order"
            className={`hidden md:inline-flex items-center ${isLight ? "" : "btn-shimmer"}`}
            style={isLight ? {
              padding: "9px 20px",
              borderRadius: 999,
              fontSize: "0.8rem",
              fontWeight: 600,
              background: "var(--red)",
              color: "var(--cream)",
              transition: "transform 0.25s var(--ease-out-expo), box-shadow 0.25s var(--ease-out-expo)",
            } : {
              padding: "9px 20px",
              borderRadius: 999,
              fontSize: "0.8rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            Custom Order
          </a>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-3 rounded-lg"
            style={{ color: isLight ? "var(--charcoal)" : "var(--cream)" }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90]"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[min(18rem,85vw)] flex flex-col"
              style={{
                background: "rgba(18,6,6,0.98)",
                borderLeft: "2px solid rgba(212,175,55,0.25)",
              }}
            >
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
              >
                <span className="font-serif text-lg font-bold" style={{ color: "var(--gold)" }}>
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg"
                  style={{ color: "rgba(250,240,230,0.6)" }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="flex flex-col px-6 py-8 gap-6 flex-1">
                {links.map((l) => {
                  const active =
                    pathname === l.href ||
                    (l.href !== "/" && pathname.startsWith(l.href.split("#")[0]));
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="text-lg font-medium transition-colors"
                        style={{
                          color: active ? "var(--gold)" : "rgba(250,240,230,0.8)",
                        }}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="px-6 pb-8">
                <a
                  href="/order"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold btn-shimmer"
                >
                  Custom Order
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
