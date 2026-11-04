
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      setEvents([]);
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
        You haven't joined any events yet.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">
        My Joined Events
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >
            <Image
              src={event.thumbnailUrl}
              alt={event.title}
              width={500}
              height={300}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <p className="mb-2 text-sm text-emerald-600">
                {event.eventType}
              </p>

              <h2 className="mb-2 text-xl font-semibold">
                {event.title}
              </h2>

              <p className="mb-2 text-sm text-gray-600">
                {event.location}
              </p>

              <p className="mb-4 text-sm text-gray-600">
                {new Date(event.eventDate).toLocaleDateString()}
              </p>

              <Link
                href={`/events/${event._id}`}
                className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
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
