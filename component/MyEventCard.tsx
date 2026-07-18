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
  return (
    <div className="rounded-xl border border-dark-200 bg-dark-100 p-6">
      <h2 className="text-2xl font-semibold">
        {event.title}
      </h2>

      <p className="mt-2 text-light-200">
        {event.location}
      </p>

      <p className="text-light-200">
        {event.date}
      </p>

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
          className="rounded bg-red-600 px-4 py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}