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
} from "recharts";

type DataPoint = { weekLabel: string; revenue: number };

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="weekLabel"
            tick={{
              fill: "var(--dash-text-tertiary)",
              fontSize: 12,
              fontWeight: 500,
            }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{
              fill: "var(--dash-text-tertiary)",
              fontSize: 12,
              fontWeight: 500,
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
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
              marginBottom: 4,
            }}
            itemStyle={{ color: "var(--dash-gold)" }}
            formatter={(value) => [
              `$${Number(value ?? 0).toFixed(2)}`,
              "Revenue",
            ]}
            cursor={{ fill: "rgba(212, 175, 55, 0.04)" }}
          />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill="url(#goldGradient)"
                fillOpacity={0.85}
              />
            ))}
          </Bar>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dash-gold)" stopOpacity={1} />
              <stop offset="100%" stopColor="#9A7A10" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
