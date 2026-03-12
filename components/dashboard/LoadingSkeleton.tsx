"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export function StatCardSkeleton() {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl p-5 dash-stat"
    >
      <div className="dash-skeleton h-3 w-16 mb-3" />
      <div className="dash-skeleton h-7 w-20 mb-2.5" />
      <div className="dash-skeleton h-3 w-24" />
    </motion.div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="dash-card !p-0 overflow-hidden"
    >
      <div className="flex gap-6 px-5 py-3.5 border-b border-[var(--dash-border)]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="dash-skeleton h-3 flex-1 max-w-[100px]"
          />
        ))}
      </div>
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-6 px-5 py-3.5">
            {[1, 2, 3, 4, 5].map((j) => (
              <div
                key={j}
                className="dash-skeleton h-4 flex-1 max-w-[120px]"
                style={{
                  animationDelay: `${(i * 5 + j) * 50}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ChartSkeleton() {
  return (
    <motion.div variants={fadeUp} className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <div className="dash-skeleton h-4 w-20" />
        <div className="dash-skeleton h-3 w-14" />
      </div>
      <div className="h-[300px] w-full flex items-end gap-3 pt-8">
        {Array.from({ length: 8 }).map((_, i) => {
          const heights = [45, 65, 35, 80, 55, 70, 40, 60];
          return (
            <div
              key={i}
              className="flex-1 rounded-t-md dash-skeleton"
              style={{
                height: `${heights[i]}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
