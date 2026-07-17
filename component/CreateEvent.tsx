"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventForm() {
  
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [mode, setMode] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [audience, setAudience] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [tags, setTags] = useState("");
  const [agenda, setAgenda] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an event image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("location", location);
      formData.append("venue", venue);
      formData.append("mode", mode);
      formData.append("description", description);
      formData.append("overview", overview);
      formData.append("audience", audience);
      formData.append("organizer", organizer);
      formData.append("tags", tags);
      formData.append("agenda", agenda);
      formData.append("image", image);

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(response.status);
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }
      router.push(`/events/${data.event.slug}`);

      // Clear form
      setTitle("");
      setDate("");
      setTime("");
      setLocation("");
      setVenue("");
      setMode("");
      setDescription("");
      setOverview("");
      setAudience("");
      setOrganizer("");
      setTags("");
      setAgenda("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-6 rounded-xl bg-dark-100 p-8"
      >
        {/* Title */}

        <div className="space-y-4">
          <label className="block text-light-200">Event Title</label>

          <input
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Date */}

        <div className="space-y-2">
          <label className="block text-light-200">Date</label>

          <div className="relative flex items-center">
            <img
              src="/icons/calendar.svg"
              alt="date"
              width={14}
              height={14}
              className="absolute left-4 h-4 w-4"
              style={{ width: "auto", height: "auto" }}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md bg-dark-200 border border-dark-200 pl-10 pr-4 py-3 text-sm  focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Select Event Date"
            />
          </div>
        </div>

        {/* Time */}

        <div className="space-y-2">
          <label className="block text-light-200">Time</label>

          <div className="relative flex items-center">
            <img
              src="/icons/clock.svg"
              alt="time"
              width={14}
              height={14}
              className="absolute left-4 h-4 w-4"
              style={{ width: "auto", height: "auto" }}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md bg-dark-200 border border-dark-200 pl-10 pr-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter venue or online link"
            />
          </div>
        </div>

        {/* Location */}

        <div className="space-y-2">
          <label className="block text-light-200">Location</label>

          <div className="relative flex items-center">
            <img
              src="/icons/pin.svg"
              alt="Location"
              width={14}
              height={14}
              className="absolute left-4 h-4 w-4"
              style={{ width: "auto", height: "auto" }}
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md bg-dark-200 border border-dark-200 pl-10 pr-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter Location"
            />
          </div>
        </div>

        {/* Venue */}

        <div className="space-y-2">
          <label className="block text-light-200">Venue</label>

          <div className="relative flex items-center">
            <img
              src="/icons/pin.svg"
              alt="venue"
              width={14}
              height={14}
              className="absolute left-4 h-4 w-4"
              style={{ width: "auto", height: "auto" }}
            />

            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full rounded-md bg-dark-200 border border-dark-200 pl-10 pr-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter venue or online link"
            />
          </div>
        </div>

        {/* Event Type */}

        <div className="space-y-2">
          <label className="block text-light-200">Event Type</label>

          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
            }}
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm text-light-200 appearance-none focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option>Select event type</option>
            <option>hybrid</option>
            <option>online</option>
            <option>offline</option>
          </select>
        </div>

        {/* Image */}

        <div className="space-y-2">
          <label className="block text-light-200">Event Image / Banner</label>

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-dark-200 bg-dark-200 p-5 text-sm text-light-200">
            {image ? image.name : "Upload event image or banner"}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
            />
          </label>
        </div>

        {/* Description */}

        <div className="space-y-2">
          <label className="block text-light-200">Event Description</label>

          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows={7}
            placeholder="Briefly describe the event"
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>

        {/* Overview */}

        <div className="space-y-2">
          <label className="block text-light-200">Overview</label>

          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={4}
            placeholder="Give a short overview of the event"
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>

        {/* Audience */}

        <div className="space-y-2">
          <label className="block text-light-200">Target Audience</label>

          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Students, Professionals, Security Researchers"
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Agenda */}

        <div className="space-y-2">
          <label className="block text-light-200">Agenda</label>

          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            rows={5}
            placeholder="Opening Keynote, Workshop, CTF Finals..."
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>

        {/* Organizer */}

        <div className="space-y-2">
          <label className="block text-light-200">Organizer</label>

          <input
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            placeholder="About the Organizer"
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Tags */}

        <div className="space-y-2">
          <label className="block text-light-200">Tags</label>

          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="AI, Cybersecurity, Workshop"
            className="w-full rounded-md bg-dark-200 border border-dark-200 px-4 py-3 text-sm placeholder:text-light-200 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-black hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Creating Event..." : "Save Event"}
        </button>
      </form>
    </div>
  );
}
