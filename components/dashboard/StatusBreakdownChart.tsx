"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { OrderStatus } from "@prisma/client";

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
    <div className="flex flex-col items-center gap-6">
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
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--dash-surface-3)",
                border: "1px solid var(--dash-border-gold)",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "var(--dash-shadow-elevated)",
              }}
              labelStyle={{
                color: "var(--dash-text-primary)",
                fontWeight: 600,
              }}
              formatter={(value) => [value ?? 0, "Orders"]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className="text-[28px] font-bold text-[var(--dash-text-primary)]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {total}
          </span>
          <span className="text-[11px] font-medium text-[var(--dash-text-tertiary)] uppercase tracking-wider">
            Total
          </span>
        </div>
      </div>

      {/* Custom legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 w-full">
        {chartData.map((entry) => (
          <div key={entry.status} className="flex items-center gap-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: STATUS_COLORS[entry.status] }}
            />
            <span className="text-[13px] text-[var(--dash-text-secondary)] flex-1 truncate">
              {entry.name}
            </span>
            <span
              className="text-[13px] font-semibold text-[var(--dash-text-primary)] tabular-nums"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {entry.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
