export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5">
              <div className="h-5 w-1/3 bg-muted rounded animate-pulse" />
            </div>
            <div className="p-6 pt-0 grid gap-2">
              <div className="h-8 w-1/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
    </div>
  )
}
