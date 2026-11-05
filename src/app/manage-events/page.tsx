
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { Event } from "@/lib/type";
import MyEventsCard from "@/components/Events/MyEventsCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";


const ManageEventsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="py-20 text-center">
        Please login to manage your events.
      </div>
    );
  }

  const user = session.user;

  let events: Event[] = [];

  const token = await getTokenFromServer();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/user-events/${(user.email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    events = await res.json();

    console.log("Fetched events:", events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Manage My Events
        </h1>

        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-400">
          Update or remove the events you&apos;ve created.
        </p>

        {events.length === 0 ? (
          <p className="mt-8 text-slate-500">
            You haven&apos;t created any events yet.
          </p>
        ) : (
          <MyEventsCard events={events} />
        )}
      </div>
    </main>
  );
};

export default ManageEventsPage;
