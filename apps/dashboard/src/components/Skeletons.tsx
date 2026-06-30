export function CanvasSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-2 w-24 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="flex h-full w-60 flex-col border-r border-gray-200 bg-white p-4">
      <div className="mb-4 h-5 w-24 animate-pulse rounded bg-gray-200" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-lg bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}

export function InspectorSkeleton() {
  return (
    <div className="flex h-full w-72 flex-col border-l border-gray-200 bg-white p-4">
      <div className="mb-4 h-5 w-20 animate-pulse rounded bg-gray-200" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
            <div className="h-8 w-full animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
