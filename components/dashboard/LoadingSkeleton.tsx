export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-surface-1)] p-6">
      <div className="dash-skeleton h-3 w-20 mb-4" />
      <div className="dash-skeleton h-9 w-24 mb-3" />
      <div className="dash-skeleton h-3 w-32" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="dash-card !p-0 overflow-hidden">
      {/* Header */}
      <div className="flex gap-6 px-5 py-4 border-b border-[var(--dash-border)]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="dash-skeleton h-3 flex-1 max-w-[100px]"
          />
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-[var(--dash-border)]">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-6 px-5 py-4">
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
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-6">
        <div className="dash-skeleton h-4 w-24" />
        <div className="dash-skeleton h-3 w-16" />
      </div>
      <div className="h-[300px] w-full flex items-end gap-3 pt-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md dash-skeleton"
            style={{
              height: `${25 + Math.random() * 65}%`,
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
