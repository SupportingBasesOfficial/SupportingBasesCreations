import {
  CanvasSkeleton,
  SidebarSkeleton,
  InspectorSkeleton,
} from "../components/Skeletons";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <SidebarSkeleton />
        <div className="relative flex-1">
          <CanvasSkeleton />
        </div>
        <InspectorSkeleton />
      </div>
    </div>
  );
}
