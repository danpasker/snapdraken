"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ConstructionInquiryFormProps = {
  label?: string;
};

export function ConstructionInquiryForm({
  label = "Bring us a world to build",
}: ConstructionInquiryFormProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.requestAnimationFrame(() => nameRef.current?.focus());

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

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
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.message || "The brief could not be sent.");
      }

      form.reset();
      setStatus("success");
      setMessage("Brief received. We’ll be in touch soon.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The brief could not be sent. Please try again.",
      );
    }
  }

  function closeForm() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="holding-form__trigger"
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          setStatus("idle");
          setMessage("");
          setOpen(true);
        }}
      >
        {label}
        <span aria-hidden="true">↗</span>
      </button>

      {open ? (
        <div
          className="holding-form__backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <section
            className="holding-form"
            role="dialog"
            aria-modal="true"
            aria-labelledby="holding-form-title"
          >
            <button
              className="holding-form__close"
              type="button"
              aria-label="Close project form"
              onClick={closeForm}
            >
              ×
            </button>

            <div className="holding-form__heading">
              <p>Start a project</p>
              <h2 id="holding-form-title">What world are we building?</h2>
              <span>Your details go straight to the shop. The recipient stays private.</span>
            </div>

            {status === "success" ? (
              <div className="holding-form__success" role="status">
                <strong>It’s in the shop.</strong>
                <p>{message}</p>
                <button type="button" onClick={closeForm}>
                  Back to the site
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="holding-form__grid">
                  <label>
                    <span>Name</span>
                    <input ref={nameRef} name="name" type="text" autoComplete="name" required />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                  <label>
                    <span>Company <small>Optional</small></span>
                    <input name="company" type="text" autoComplete="organization" />
                  </label>
                  <label>
                    <span>Project type</span>
                    <select name="projectType" defaultValue="" required>
                      <option value="" disabled>Select one</option>
                      <option>Attraction</option>
                      <option>Exhibit</option>
                      <option>Set Build</option>
                      <option>Brand Activation</option>
                      <option>Mural</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    <span>Budget</span>
                    <select name="budget" defaultValue="" required>
                      <option value="" disabled>Select one</option>
                      <option>Under $50k</option>
                      <option>$50k-$250k</option>
                      <option>$250k-$1M</option>
                      <option>$1M+</option>
                    </select>
                  </label>
                  <label>
                    <span>Timeline <small>Optional</small></span>
                    <input name="timeline" type="text" placeholder="Opening date or window" />
                  </label>
                </div>

                <label className="holding-form__brief">
                  <span>Tell us about it</span>
                  <textarea
                    name="brief"
                    rows={4}
                    placeholder="The place, the audience, and the hard deadline."
                    required
                  />
                </label>

                <label className="holding-form__honeypot" aria-hidden="true">
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>

                <div className="holding-form__footer">
                  <button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending…" : "Send the brief"}
                  </button>
                  <p
                    className={`holding-form__status holding-form__status--${status}`}
                    role={status === "error" ? "alert" : "status"}
                    aria-live="polite"
                  >
                    {message}
                  </p>
                </div>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
