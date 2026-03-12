"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import type { OrderStatus } from "@prisma/client";
import AnimatedNumber from "./AnimatedNumber";

const STATUS_COLORS: Record<OrderStatus, string> = {
  NEW: "#D4AF37",
  REVIEWED: "rgba(250,243,230,0.35)",
  CONFIRMED: "#2DD4BF",
  IN_PROGRESS: "#60A5FA",
  READY: "#34D399",
  DELIVERED: "#34D399",
  CANCELLED: "#F87171",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: "New",
  REVIEWED: "Reviewed",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  READY: "Ready",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

type DataPoint = { status: OrderStatus; count: number };

export default function StatusBreakdownChart({
  data,
}: { data: DataPoint[] }) {
  const chartData = data
    .filter((d) => d.count > 0)
    .map((d) => ({ ...d, name: STATUS_LABELS[d.status] }));

  const total = chartData.reduce((sum, d) => sum + d.count, 0);

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-[var(--dash-text-tertiary)] text-sm">
        No orders yet
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-6"
    >
      {/* Donut chart */}
      <div className="relative h-[200px] w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              strokeWidth={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status]}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(36, 36, 40, 0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--dash-border-gold)",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "var(--dash-shadow-elevated)",
              }}
              labelStyle={{
                color: "var(--dash-text-primary)",
                fontWeight: 600,
                fontSize: 13,
              }}
              formatter={(value) => [value ?? 0, "Orders"]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <AnimatedNumber
            value={total}
            className="text-[28px] font-bold text-[var(--dash-text-primary)] block"
          />
          <span className="text-[11px] font-medium text-[var(--dash-text-tertiary)] uppercase tracking-wider">
            Total
          </span>
        </div>
      </div>

      {/* Custom legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 w-full">
        {chartData.map((entry, i) => (
          <motion.div
            key={entry.status}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5"
          >
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: STATUS_COLORS[entry.status] }}
            />
            <span className="text-[13px] text-[var(--dash-text-secondary)] flex-1 truncate">
              {entry.name}
            </span>
            <span
              className="text-[13px] font-semibold text-[var(--dash-text-primary)]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {entry.count}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
