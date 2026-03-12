"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  Area,
  ComposedChart,
} from "recharts";
import { motion } from "framer-motion";

type DataPoint = { weekLabel: string; revenue: number };

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dash-gold)" stopOpacity={1} />
              <stop offset="100%" stopColor="#9A7A10" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dash-gold)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="var(--dash-gold)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="weekLabel"
            tick={{
              fill: "var(--dash-text-tertiary)",
              fontSize: 11,
              fontWeight: 500,
            }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{
              fill: "var(--dash-text-tertiary)",
              fontSize: 11,
              fontWeight: 500,
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
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
              marginBottom: 4,
              fontSize: 13,
            }}
            itemStyle={{ color: "var(--dash-gold)", fontSize: 13 }}
            formatter={(value) => [
              `$${Number(value ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
              "Revenue",
            ]}
            cursor={{ fill: "rgba(212, 175, 55, 0.04)" }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            fill="url(#goldAreaGradient)"
            stroke="none"
          />
          <Bar
            dataKey="revenue"
            radius={[6, 6, 0, 0]}
            maxBarSize={44}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill="url(#goldGradient)"
                fillOpacity={0.9}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
