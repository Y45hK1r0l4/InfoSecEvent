"use client";

import { useState } from "react";
import { signup } from "@/lib/api/auth";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signup(form);

      setSuccess("Account created successfully.");

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-14 rounded-xl border p-16"
    >
      <h1 className="text-6xl font-bold">
        Create Account
      </h1>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        className="rounded border p-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
        className="rounded border p-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
        className="rounded border p-3"
      />

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-600">
          {success}
        </p>
      )}

      <button
        disabled={loading}
        className="rounded bg-black p-3 text-white disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}