import {
  CanvasSkeleton,
  SidebarSkeleton,
  InspectorSkeleton,
} from "../components/Skeletons";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-200" />
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
