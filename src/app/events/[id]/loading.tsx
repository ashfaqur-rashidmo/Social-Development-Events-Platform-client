"use client";

import EventSkeleton from "@/components/Events/EventSkeleton";

export default function EventDetailsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <EventSkeleton />
      </div>
    </main>
  );
}
