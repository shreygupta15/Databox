export function SkeletonKpiCard() {
  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 skeleton-pulse rounded-lg" />
        <div className="h-6 w-16 skeleton-pulse rounded-full" />
      </div>
      <div className="h-4 w-24 skeleton-pulse mb-2" />
      <div className="h-7 w-32 skeleton-pulse" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-4 w-32 skeleton-pulse mb-1.5" />
          <div className="h-3 w-48 skeleton-pulse" />
        </div>
      </div>
      <div className="h-[300px] flex items-end gap-2 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 skeleton-pulse rounded-t"
            style={{ height: `${30 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-4 w-40 skeleton-pulse mb-1.5" />
          <div className="h-3 w-32 skeleton-pulse" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-10 skeleton-pulse rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 skeleton-pulse rounded" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonActivityFeed() {
  return (
    <div className="chart-container">
      <div className="mb-4">
        <div className="h-4 w-24 skeleton-pulse mb-1.5" />
        <div className="h-3 w-20 skeleton-pulse" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-3">
            <div className="h-7 w-7 skeleton-pulse rounded-md shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-full skeleton-pulse mb-2" />
              <div className="h-3 w-16 skeleton-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
