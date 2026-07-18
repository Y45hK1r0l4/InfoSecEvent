import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import MyEventCard from "@/component/MyEventCard";

export default async function MyEventsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  await connectDB();

  const events = await Event.find({
    createdBy: user.id,
  })
    .sort({ createdAt: -1 })
    .lean();

  const formattedEvents = events.map((event) => ({
    ...event,
    id: event._id.toString(),
  }));

  return (
    <main className="wrapper py-10">
      <h1 className="mb-8 text-3xl font-bold">My Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {formattedEvents.map((event) => (
          <MyEventCard key={event.id} event={event} />
        ))}
      </div>{" "}
    </main>
  );
}
