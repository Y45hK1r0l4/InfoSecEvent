import { notFound, redirect } from "next/navigation";

import connectDB from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Event from "@/database/event.model";
import EventForm from "@/component/EventForm";


export default async function EditEventPage({ slug }: { slug: string }) {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  await connectDB();

  const event = await Event.findOne({
    slug,
  }).lean();

  if (!event) {
    notFound();
  }

  // Ownership check
  if (event.createdBy.toString() !== user.id) {
    redirect("/");
  }

  return (
    <main className="wrapper py-10">
      <h1 className="text-3xl font-bold">Edit Event</h1>

      <EventForm
        mode="edit"
        initialData={{
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          venue: event.venue,
          mode: event.mode,
          description: event.description,
          overview: event.overview,
          audience: event.audience,
          organizer: event.organizer,
          tags: event.tags,
          agenda: event.agenda,
          image: event.image,
          slug: event.slug,
        }}
      />
    </main>
  );
}
