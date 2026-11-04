
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { Event } from "@/lib/type";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import Loader from "@/components/Spinner/Loader";

const JoinedEvents = () => {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        // Get JWT token
       const token = await getTokenFromClient();

        // Fetch joined events
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/joined-events/${encodeURIComponent(
            session.user.email
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch joined events");
        }

        const res: Event[] = await response.json();

        const sortedEvents = res.sort(
          (a, b) =>
            new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime()
        );

        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching joined events:", error);
        setEvents([]);
      }
    };

    fetchJoinedEvents();
  }, [session, isPending]);

  if (isPending) {
    return (
      <p className="flex h-9 w-24 items-center justify-center">
       <Loader />
      </p>
    );
  }

  if (!session?.user) {
    return (
      <p className="py-10 text-center">
        Please log in to see your joined events.
      </p>
    );
  }

  if (events.length === 0) {
    return (
      <p className="py-10 text-center">
        You haven&apos;t joined any events yet.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        My Joined Events
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <Image
              src={event.thumbnailUrl}
              alt={event.title}
              width={400}
              height={208}
              className="h-52 w-full object-cover"
            />

            <div className="flex flex-1 flex-col p-5">
              <p className="mb-2 text-sm text-emerald-600">
                {event.eventType}
              </p>

              <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                {event.title}
              </h2>

              <p className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                <MapPin size={16} className="shrink-0 text-emerald-600" />
                {event.location}
              </p>

              <p className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
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
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoinedEvents;
