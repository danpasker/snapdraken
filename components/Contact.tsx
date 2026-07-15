"use client";

import { type FormEvent, useState } from "react";
import { MotionReveal } from "./MotionReveal";

type FormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactProps {
  email?: string;
  phone?: string;
}

export function Contact({
  email = "travis@snapdraken.com",
  phone,
}: ContactProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.message || result?.error || "The brief could not be sent.",
        );
      }

      form.reset();
      setStatus("success");
      setMessage(
        result?.message || "Brief received. Travis will follow up after reviewing it.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The brief could not be sent. Please email Travis directly.",
      );
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__vignette" aria-hidden="true" />
      <MotionReveal className="contact-section__inner">
        <div className="contact-section__heading">
          <p className="section-eyebrow">Start a Project</p>
          <h2 id="contact-title">Let’s build something impossible.</h2>
          <p>
            Every project starts with a conversation about what the story wants to
            feel like.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__grid">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Company</span>
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label>
              <span>Project Type</span>
              <select name="projectType" defaultValue="" required>
                <option value="" disabled>
                  Select one
                </option>
                <option>Attraction</option>
                <option>Exhibit</option>
                <option>Set Build</option>
                <option>Brand Activation</option>
                <option>Mural</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              <span>Budget Range</span>
              <select name="budget" defaultValue="" required>
                <option value="" disabled>
                  Select one
                </option>
                <option>Under $50k</option>
                <option>$50k-$250k</option>
                <option>$250k-$1M</option>
                <option>$1M+</option>
              </select>
            </label>
            <label>
              <span>Timeline</span>
              <input
                name="timeline"
                type="text"
                placeholder="Opening date or working window"
                required
              />
            </label>
          </div>

          <label className="contact-form__brief">
            <span>Brief</span>
            <textarea
              name="brief"
              rows={4}
              placeholder="The place, the audience, the hard deadline."
              required
            />
          </label>

          <label className="contact-form__honeypot" aria-hidden="true">
            <span>Website</span>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>

          <div className="contact-form__footer">
            <button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send the brief"}
            </button>
            <p
              className={`contact-form__status contact-form__status--${status}`}
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {message}
            </p>
          </div>
        </form>

        <address className="contact-section__alternative">
          <div>
            <span>Email</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          {phone && (
            <div>
              <span>Phone</span>
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
            </div>
          )}
          <div>
            <span>Shop</span>
            <p>La Grange, NC · Site visits by appointment</p>
          </div>
        </address>
      </MotionReveal>
    </section>
  );
}
