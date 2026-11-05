"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Close, Send } from "./icons";

/**
 * "Send Message" opens a small form that hands off to the visitor's email app,
 * so it works without a backend or an email service account.
 */
export function ContactDialog({ email }: { email: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);

  const close = () => {
    dialogRef.current?.close();
    setSent(false);
  };

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
    <>
      <button
        type="button"
        className="btn btn-primary w-full sm:w-auto"
        data-magnetic
        onClick={() => dialogRef.current?.showModal()}
      >
        <Send size={17} /> Send Message <ArrowRight size={17} />
      </button>

      <dialog
        ref={dialogRef}
        className="dialog"
        aria-labelledby="contact-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        onClose={() => setSent(false)}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="contact-title" className="text-2xl font-semibold tracking-tight">
              {sent ? "Almost there" : "Send a message"}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {sent
                ? "Your email app should have opened with your message ready to send."
                : "This opens your email app with everything filled in."}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="grid size-10 flex-none place-items-center rounded-full bg-[var(--surface-2)]"
            onClick={close}
          >
            <Close size={18} />
          </button>
        </div>

        {sent ? (
          <div className="mt-6">
            <p className="text-sm text-muted">
              Nothing happened? Email me directly at{" "}
              <a className="font-medium text-accent-ink underline underline-offset-4" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </p>
            <button type="button" className="btn btn-ghost mt-6 w-full" onClick={close}>
              Done
            </button>
          </div>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            <label className="grid gap-1.5 text-sm font-medium">
              Your name
              <input className="field font-normal" name="name" required autoComplete="name" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Your email
              <input className="field font-normal" name="email" type="email" required autoComplete="email" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Message
              <textarea className="field min-h-32 resize-y font-normal" name="message" required rows={4} />
            </label>
            <button type="submit" className="btn btn-primary mt-1 w-full">
              Continue in email app <ArrowRight size={17} />
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
