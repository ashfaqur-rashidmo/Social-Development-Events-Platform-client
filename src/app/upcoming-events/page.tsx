
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Event } from "@/lib/type";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import Loader from "@/components/Spinner/Loader";
import EventFilters from "@/components/Events/EventFilters";


const UpcomingEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUpcomingEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/upcoming-events"
        );

        if (!response.ok) {
          throw new Error("Failed to load events.");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Something went wrong while loading events.");
      } finally {
        setLoading(false);
      }
    };

    getUpcomingEvents();
  }, []);

  // Show only future events
  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) > new Date()
  );


  // Get unique event categories
const categories = [
  "All",
  ...new Set(
    upcomingEvents.map((event) => event.eventType).filter(Boolean)
  ),
];


// Filter events by category and search
const filteredEvents = upcomingEvents.filter((event) => {
  const matchesCategory =
    selectedCategory === "All" ||
    event.eventType?.toLowerCase() === selectedCategory.toLowerCase();

  const search = searchQuery.toLowerCase().trim();

  const matchesSearch =
    event.title.toLowerCase().includes(search) ||
    event.location.toLowerCase().includes(search);

  return matchesCategory && matchesSearch;
});

// Clear filters
const clearFilters = () => {
  setSelectedCategory("All");
  setSearchQuery("");
};

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Upcoming Events
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400">
            Discover events and make a positive impact in your community.
          </p>
        </div>

        <EventFilters
  categories={categories}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  clearFilters={clearFilters}
/>

{/* Results Count */}
<p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
  Showing {filteredEvents.length} of {upcomingEvents.length} events
</p>

        {/* Event Grid */}
        {filteredEvents.length === 0 ? (
          <p className="py-16 text-center text-slate-500">
            No upcoming events available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
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

                {/* Event Information */}
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
                    {new Date(event.eventDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
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
        )}
      </div>
    </main>
  );
};

export default UpcomingEventsPage;
