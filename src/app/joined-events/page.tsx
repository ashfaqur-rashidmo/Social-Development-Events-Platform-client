
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { auth } from "@/lib/auth";
import type { Event } from "@/lib/type";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const JoinedEvents = async () => {

    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return (
            <p className="py-10 text-center">
                Please log in to see your joined events.
            </p>
        );
    }

    let events: Event[] = [];

    try {
        const token = await getTokenFromServer();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/joined-events/${(session.user.email)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch joined events");
        }

        events = await response.json();

        // Sort events by date
        events.sort(
            (a, b) =>
                new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );

    } catch (error) {
        console.log("Error fetching joined events:", error);

        return (
            <p className="py-10 text-center text-red-500">
                Failed to load joined events.
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

            <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
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