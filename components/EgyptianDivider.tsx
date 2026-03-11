/**
 * EgyptianDivider — a horizontal frieze-style ornamental band.
 * Repeating geometric motif (lotus diamond + horizontal rules) in gold.
 * Use between sections to signal Egyptian visual language.
 */
export default function EgyptianDivider({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 0,
        overflow: "hidden",
        opacity,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* Left rule */}
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6))" }} />

      {/* Frieze pattern — repeated 3x */}
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          width="80"
          height="20"
          viewBox="0 0 80 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          {/* Outer horizontal lines */}
          <line x1="0" y1="4" x2="80" y2="4" stroke="rgba(212,175,55,0.7)" strokeWidth="0.5" />
          <line x1="0" y1="16" x2="80" y2="16" stroke="rgba(212,175,55,0.7)" strokeWidth="0.5" />

          {/* Left small diamond */}
          <polygon points="10,10 14,6 18,10 14,14" fill="none" stroke="rgba(212,175,55,0.9)" strokeWidth="0.6" />

          {/* Center lotus / ankh diamond */}
          <polygon points="40,4 47,10 40,16 33,10" fill="none" stroke="rgba(212,175,55,1)" strokeWidth="0.8" />
          <line x1="40" y1="6.5" x2="40" y2="13.5" stroke="rgba(212,175,55,0.6)" strokeWidth="0.5" />
          <line x1="35.5" y1="10" x2="44.5" y2="10" stroke="rgba(212,175,55,0.6)" strokeWidth="0.5" />

          {/* Right small diamond */}
          <polygon points="62,10 66,6 70,10 66,14" fill="none" stroke="rgba(212,175,55,0.9)" strokeWidth="0.6" />

          {/* Vertical tick marks */}
          <line x1="24" y1="7" x2="24" y2="13" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
          <line x1="56" y1="7" x2="56" y2="13" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
        </svg>
      ))}

      {/* Right rule */}
      <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(212,175,55,0.6))" }} />
    </div>
  );
}
