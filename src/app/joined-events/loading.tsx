"use client";

import EventSkeleton from "@/components/Events/EventSkeleton";

export default function JoinedEventsLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        My Joined Events
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <EventSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
