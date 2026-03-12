"use client";

import {
  StatCardSkeleton,
  TableSkeleton,
  ChartSkeleton,
} from "@/components/dashboard/LoadingSkeleton";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

export default function DashboardLoading() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-7"
    >
      {/* Mobile spacer */}
      <div className="h-12 md:hidden" />

      {/* Header skeleton */}
      <div className="pb-5 border-b border-[var(--dash-border)]">
        <div className="dash-skeleton h-6 w-28" />
      </div>

      {/* KPI cards */}
      <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </motion.div>

      {/* Section label */}
      <div className="pb-2 border-b border-[var(--dash-border)]">
        <div className="dash-skeleton h-3 w-16" />
      </div>

      {/* Charts */}
      <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <ChartSkeleton />
        </div>
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
      </motion.div>

      {/* Section label */}
      <div className="pb-2 border-b border-[var(--dash-border)]">
        <div className="dash-skeleton h-3 w-20" />
      </div>

      {/* Table */}
      <TableSkeleton rows={5} />
    </motion.div>
  );
}
