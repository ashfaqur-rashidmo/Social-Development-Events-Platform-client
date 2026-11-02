"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import type { Event } from "@/lib/type";


const JoinedEvents = () => {
    
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/joined-events/${(
            session.user.email
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch joined events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session, isPending]);

  if (isPending || loading) {
    return <p className="py-10 text-center">Loading joined events...</p>;
  }

  if (!session?.user) {
    return <p className="py-10 text-center">Please log in to see your joined events.</p>;
  }

  if (events.length === 0) {
    return <p className="py-10 text-center">You haven't joined any events yet.</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">My Joined Events</h1>

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