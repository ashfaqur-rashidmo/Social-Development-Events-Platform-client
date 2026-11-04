
import EventDetails from "@/components/Events/EventDetails";
import type { Event } from "@/lib/type";
import { notFound } from "next/navigation";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/events/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch event details");
  }

  const eventData: Event = await response.json();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-950">
      <EventDetails event={eventData} />
    </main>
  );
};

export default EventDetailsPage;
