"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

function parseNumericValue(value: string | number): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} | null {
  if (typeof value === "number") {
    return { prefix: "", number: value, suffix: "", decimals: 0 };
  }
  const match = value.match(/^([^0-9]*)([0-9,]+\.?\d*)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ""));
  if (isNaN(num)) return null;
  const decimalPart = match[2].split(".")[1];
  return {
    prefix: match[1],
    number: num,
    suffix: match[3],
    decimals: decimalPart ? decimalPart.length : 0,
  };
}

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
  const trendDirection = trend
    ? trend.startsWith("+")
      ? "up"
      : trend.startsWith("-")
        ? "down"
        : "flat"
    : null;

  const parsed = parseNumericValue(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative overflow-hidden rounded-2xl p-5
        ${accent ? "dash-stat-accent border-l-2 border-l-[var(--dash-accent)]" : "dash-stat"}
      `}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--dash-text-tertiary)] mb-2">
        {title}
      </p>

      {parsed ? (
        <AnimatedNumber
          value={parsed.number}
          prefix={parsed.prefix}
          suffix={parsed.suffix}
          decimals={parsed.decimals}
          className="block text-[28px] font-bold leading-none tracking-tight dash-mono text-[var(--dash-text-primary)]"
        />
      ) : (
        <p
          className="text-[28px] font-bold leading-none tracking-tight dash-mono text-[var(--dash-text-primary)]"
        >
          {value}
        </p>
      )}

      <div className="flex items-center gap-2 mt-2.5">
        {trend && trendDirection && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`
              inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-md
              ${
                trendDirection === "up"
                  ? "text-[var(--dash-success)] bg-[var(--dash-success-muted)]"
                  : trendDirection === "down"
                    ? "text-[var(--dash-error)] bg-[var(--dash-error-muted)]"
                    : "text-[var(--dash-text-tertiary)] bg-white/[0.05]"
              }
            `}
          >
            {trendDirection === "up" ? (
              <TrendingUp size={11} />
            ) : trendDirection === "down" ? (
              <TrendingDown size={11} />
            ) : (
              <Minus size={11} />
            )}
            {trend}
          </motion.span>
        )}
        {subtext && (
          <p className="text-[12px] text-[var(--dash-text-tertiary)]">
            {subtext}
          </p>
        )}
      </div>
    </motion.div>
  );
}
