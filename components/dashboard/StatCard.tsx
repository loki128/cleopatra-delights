import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtext,
  trend,
  accent = false,
}: {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  accent?: boolean;
}) {
  // Parse trend direction from string
  const trendDirection = trend
    ? trend.startsWith("+")
      ? "up"
      : trend.startsWith("-")
        ? "down"
        : "flat"
    : null;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6
        border transition-all duration-200
        ${
          accent
            ? "bg-[var(--dash-surface-1)] border-[var(--dash-border-gold)] shadow-[var(--dash-shadow-card)]"
            : "bg-[var(--dash-surface-1)] border-[var(--dash-border)] hover:border-[var(--dash-border-strong)]"
        }
      `}
    >
      {/* Subtle gold glow on accent card */}
      {accent && (
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[var(--dash-gold)] opacity-[0.04] blur-3xl pointer-events-none" />
      )}

      {/* Label */}
      <p className="text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-3">
        {title}
      </p>

      {/* Value — dominant element */}
      <p
        className={`
          text-[var(--dash-text-3xl)] font-bold leading-none tracking-tight
          ${accent ? "text-[var(--dash-gold)]" : "text-[var(--dash-text-primary)]"}
        `}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>

      {/* Subtext + trend */}
      <div className="flex items-center gap-2 mt-3">
        {trend && trendDirection && (
          <span
            className={`
              inline-flex items-center gap-1 text-[12px] font-semibold px-2 py-0.5 rounded-md
              ${
                trendDirection === "up"
                  ? "text-[var(--dash-success)] bg-[var(--dash-success-muted)]"
                  : trendDirection === "down"
                    ? "text-[var(--dash-error)] bg-[var(--dash-error-muted)]"
                    : "text-[var(--dash-text-tertiary)] bg-[rgba(255,255,255,0.05)]"
              }
            `}
          >
            {trendDirection === "up" ? (
              <TrendingUp size={12} />
            ) : trendDirection === "down" ? (
              <TrendingDown size={12} />
            ) : (
              <Minus size={12} />
            )}
            {trend}
          </span>
        )}
        {subtext && (
          <p className="text-[var(--dash-text-sm)] text-[var(--dash-text-tertiary)]">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
