"use client";

import { useState, type FormEvent } from "react";
import { Send } from "./icons";

/**
 * Hands the message to the visitor's email app with everything filled in,
 * so it works without a backend or an email service account.
 */
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\n${name}\n${from}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form-row">
        <label className="contact-field">
          Name
          <input className="field" name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="contact-field">
          Email
          <input
            className="field"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="contact-field">
        Message
        <textarea
          className="field"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project, opportunity, or just say hello…"
        />
      </label>

      <button type="submit" className="btn btn-primary w-full">
        <Send size={17} /> Send Message
      </button>

      <p className="contact-note" aria-live="polite">
        {sent ? (
          <>
            Your email app should open with your message ready to send. Nothing happened? Email me at{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </>
        ) : null}
      </p>
    </form>
  );
}
