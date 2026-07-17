"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/lib/api/auth";

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(form);

      router.push("/");
      router.refresh();

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
        Login
      </h1>

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
        required
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
        required
      />

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black p-3 text-white disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}