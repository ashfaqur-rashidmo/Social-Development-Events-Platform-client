
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HandHeart,
  MapPin,
  CalendarDays,
  ArrowLeft,
  Clock,
  Tag,
  Users,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import type { Event } from "@/lib/type";
import Image from "next/image";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const EventDetails = ({ event }: { event: Event }) => {
  const router = useRouter();

  const [joining, setJoining] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;


  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("Please log in to join this event.");
      return;
    }

    if (joining) return;

    setJoining(true);

    const token = await getTokenFromClient();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/joined-events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: event._id,
            userEmail: user.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join event");
      }

      toast.success("You have successfully joined this event!");
    } catch (error) {
      console.error("Error joining event:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setJoining(false);
    }
  };


  return (
    <div className="mx-auto max-w-6xl">

      {/* Back Button */}
      <Link
        href="/upcoming-events"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-300"
      >
        <ArrowLeft size={18} />
        Back to Upcoming Events
      </Link>

      {/* Event Thumbnail */}
      <div className="overflow-hidden rounded-2xl">
        <Image
            width={800}
            height={400}
          src={event.thumbnailUrl}
          alt={event.title}
          className="h-[250px] w-full object-cover sm:h-[350px] lg:h-[430px]"
        />
      </div>

      {/* Event Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Main Information */}
        <div className="space-y-6 lg:col-span-2">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <Tag size={16} />
              {event.eventType}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
              {event.title}
            </h1>
          </div>

          {/* Description */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              About This Event
            </h2>

            <p className="whitespace-pre-line leading-8 text-slate-600 dark:text-slate-300">
              {event.description}
            </p>
          </section>

          {/* Event Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
              Event Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <CalendarDays size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Event Date</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {new Date(event.eventDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Event Time</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {new Date(event.eventDate).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Event Type</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {event.eventType}
                  </p>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Join Event Sidebar */}
        <aside>
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <HandHeart size={28} />
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                Be Part of the Change
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Join this event and contribute to making your community better.
              </p>
            </div>

            <button
              onClick={handleJoinEvent}
              disabled={joining || isPending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {joining ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <HandHeart size={20} />
                  Join Event
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              You must be logged in to join this event.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default EventDetails;
