"use client";

import { type FormEvent, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: data.get("code") }),
      });
      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.message || "The shop door stayed shut.");
      }

      const requestedPath = searchParams.get("next");
      const destination =
        requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/admin/site";

      router.replace(destination);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The shop door stayed shut.");
      inputRef.current?.select();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="admin-login__form" onSubmit={handleSubmit}>
      <label htmlFor="admin-code">Shop code</label>
      <div className="admin-login__controls">
        <input
          ref={inputRef}
          id="admin-code"
          name="code"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Opening…" : "Enter the shop"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className="admin-login__message" role="alert" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
