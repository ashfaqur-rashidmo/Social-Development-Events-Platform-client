
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { ButtonLoading } from "@/components/ButtonLoading";




const EVENT_TYPES = [
  "Donation",
  "Food Drive",
  "Clothing Drive",
  "Blood Donation",
  "Cleanup",
  "Fundraiser",
  "Awareness Campaign",
  "Workshop",
  "Seminar",
  "Plantation"
];

// Browser-local "today" for the date input's min floor (submit handler re-validates future dates)
const TODAY_MIN = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

const CreateEventPage = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();
const user = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  const [event, setEvent] = useState({
    title: "",
    eventType: "Donation",
    thumbnailUrl: "",
    location: "",
    eventDate: "",
    description: "",
  });

  
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  // Create event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (new Date(event.eventDate) <= new Date(new Date().toDateString())) {
      toast.error("Please select a future date.");
      return;
    }

    setIsLoading(true);

    const token = await getTokenFromClient();
    
    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify({
          ...event,
           creatorEmail: user?.email,
          eventDate: new Date(event.eventDate).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      toast.success("Event created successfully!");
      router.push("/upcoming-events");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
            New Drive
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Create Event
          </h1>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Only future dates are accepted.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Title
            </label>

            <input
              name="title"
              type="text"
              value={event.title}
              onChange={handleChange}
              placeholder="Winter Clothes Distribution"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Event Type
            </label>

            <div className="relative">
              <select
                name="eventType"
                value={event.eventType}
                onChange={handleChange}
                required
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Thumbnail Image URL
            </label>

            <input
              name="thumbnailUrl"
              type="url"
              value={event.thumbnailUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Location
            </label>

            <input
              name="location"
              type="text"
              value={event.location}
              onChange={handleChange}
              placeholder="Mirpur 10, Dhaka"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Event Date
            </label>

            <input
              name="eventDate"
              type="date"
              value={event.eventDate}
              onChange={handleChange}
              min={TODAY_MIN}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>

            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the event and how people can help."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
           <ButtonLoading isLoading={isLoading} loadingText="Creating Event...">
              Create Event
            </ButtonLoading>
          </button>
        </form>
      </div>
    </main>
  );
}
        


export default CreateEventPage;
