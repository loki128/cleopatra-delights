import { Instagram, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--gold)" }}>
              Cleopatra Delights
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(250,240,230,0.5)" }}>
              A world of extraordinary desserts — handcrafted in Jacksonville, FL.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(250,240,230,0.4)" }}>
              <MapPin size={12} />
              Jacksonville, FL
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Menu", href: "#menu" },
                { label: "Find Us", href: "/location" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors hover:text-gold"
                    style={{ color: "rgba(250,240,230,0.5)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
              Connect
            </h4>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-gold mb-4"
              style={{ color: "rgba(250,240,230,0.5)" }}
            >
              <Instagram size={15} />
              @CleopatraDelights
            </a>
            <p className="text-xs mt-4" style={{ color: "rgba(250,240,230,0.3)" }}>
              Custom orders & catering inquiries welcome.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs"
          style={{ borderTop: "1px solid rgba(212,175,55,0.1)", color: "rgba(250,240,230,0.25)" }}
        >
          <p>© 2026 Cleopatra Delights. All rights reserved.</p>
          <p>Jacksonville, FL · Where Every Bite Tells a Story</p>
        </div>
      </div>
    </footer>
  );
}
