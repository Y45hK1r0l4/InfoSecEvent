"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateProfile } from "@/lib/api/auth";

type User = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  user: User;
};

export default function ProfileForm({ user }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateProfile(form);
      setSuccess("Profile updated successfully.");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const hasChanges = form.name !== user.name || form.email !== user.email;

  return (
    <form
    onSubmit={handleSubmit}
    className="mx-auto flex w-full max-w-sm flex-col items-center rounded-xl border p-8"
    >
      <h2 className="mb-6 text-2xl font-semibold">Profile Information</h2>

      <div className="mb-5 w-full">
        <label htmlFor="name" className="mb-1 block text-sm">
          Name
        </label>
        <input
          id="name"
          className="w-full rounded border p-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-5 w-full">
        <label htmlFor="email" className="mb-1 block text-sm">
          Email
        </label>
        <input
          id="email"
          className="w-full rounded border p-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={!hasChanges || loading}
        className="mt-2 rounded bg-black px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-600">{success}</p>}
    </form>
  );
}