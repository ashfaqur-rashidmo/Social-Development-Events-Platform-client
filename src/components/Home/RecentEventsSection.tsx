"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import EventSkeleton from "@/components/Events/EventSkeleton";
import type { Event } from "@/lib/type";

const RECENT_EVENTS_LIMIT = 6;

export default function RecentEventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/upcoming-events`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load recent events.");
        }

        const data = await response.json();

        // Keep only future events, nearest first, capped at 6
        const now = new Date();
        const upcoming = data
          .filter((e: Event) => new Date(e.eventDate) > now)
          .sort(
            (a: Event, b: Event) =>
              new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
          )
          .slice(0, RECENT_EVENTS_LIMIT);

        setEvents(upcoming);
      } catch (err) {
        console.error("Error fetching recent events:", err);
        setError("Unable to load recent events.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-50 px-6 py-16 dark:bg-slate-950">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Recent Upcoming Events
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-slate-50 px-6 py-16 dark:bg-slate-950">
        <div className="max-w-8xl mx-auto text-center py-20">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="bg-slate-50 px-6 py-16 dark:bg-slate-950">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Recent Upcoming Events
            </h2>
          </div>
          <p className="text-center text-slate-500 dark:text-slate-400 py-16">
            No upcoming events right now.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-t border-slate-200 px-6 py-16 dark:bg-slate-950 dark:border-slate-800">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-teal-700">
              Recent Drives
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Recent Upcoming Events
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-slate-400 max-w-xl">
              Join the nearest community drives happening soon in your area.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <Image
                width={400}
                height={208}
                src={event.thumbnailUrl}
                alt={event.title}
                className="h-52 w-full object-cover"
              />

              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {event.eventType}
                </span>

                <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  {event.title}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin size={16} className="shrink-0 text-emerald-600" />
                  {event.location}
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CalendarDays size={16} className="shrink-0 text-emerald-600" />
                  {new Date(event.eventDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <Link
                  href={`/events/${event._id}`}
                  className="mt-auto block w-full rounded-lg bg-emerald-700 px-6 py-3.5 text-center font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-800"
                >
                  View Event
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            View All Events
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
