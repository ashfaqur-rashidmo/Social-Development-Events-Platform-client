import React from "react";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/type";

import  EditEventsDetails  from "./EditEventsDetails";

import DeletingUserEvents from "./DeletingUserEvents";

interface MyEventsCardProps {
  events: Event[];
}



const MyEventsCard = ({ events }: MyEventsCardProps) => {
  return (
    <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event._id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Event Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={event.thumbnailUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute left-4 top-4">
              <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md">
                {event.eventType}
              </span>
            </div>
          </div>

          {/* Event Information */}
          <div className="flex flex-1 flex-col p-5">
            <h2 className="line-clamp-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
              {event.title}
            </h2>

            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {event.description}
            </p>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <MapPin size={17} className="shrink-0 text-emerald-600" />
                <span className="line-clamp-1">{event.location}</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <CalendarDays size={17} className="shrink-0 text-emerald-600" />
                <span>
                  {new Date(event.eventDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* View Event */}
            <div className="mt-auto pt-5">
              <Link
                href={`/events/${event._id}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-800"
              >
                View Event
                <ArrowUpRight size={16} />
              </Link>

              <EditEventsDetails event={event}/>

              <DeletingUserEvents event={event}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEventsCard;