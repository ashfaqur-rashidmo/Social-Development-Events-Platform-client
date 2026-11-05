"use client";

import EventSkeleton from "@/components/Events/EventSkeleton";

export default function ManageEventsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Manage My Events
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400">
          Update or remove the events you&apos;ve created.
        </p>
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <EventSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
