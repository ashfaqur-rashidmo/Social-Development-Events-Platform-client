import { Skeleton } from "@heroui/react";

export default function EventSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Thumbnail skeleton */}
      <Skeleton className="h-52 w-full" />

      <div className="flex flex-1 flex-col p-5">
        {/* Category pill skeleton */}
        <Skeleton className="w-24 h-8 rounded-full" />
        <Skeleton className="mt-4 h-6 w-3/4" />
        <Skeleton className="mt-3 h-5 w-1/2" />
        <Skeleton className="mt-2 h-5 w-1/2" />
        <Skeleton className="mt-auto h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
