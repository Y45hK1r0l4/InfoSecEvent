"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  event: {
    id: string;
    slug: string;
    title: string;
    location: string;
    date: string;
    mode: string;
  };
};

export default function MyEventCard({ event }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/events/${event.slug}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-dark-200 bg-dark-100 p-6">
      <h2 className="text-2xl font-semibold">{event.title}</h2>

      <p className="mt-2 text-light-200">{event.location}</p>

      <p className="text-light-200">{event.date}</p>

      <p className="mt-2 inline-block rounded bg-primary px-3 py-1 text-black">
        {event.mode}
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/events/${event.slug}/edit`}
          className="rounded bg-gray-700 px-4 py-2"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="rounded-md bg-red-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete Event"}
        </button>
      </div>
    </div>
  );
}