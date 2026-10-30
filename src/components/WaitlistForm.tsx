import { useState } from "react";

export function WaitlistForm({ id = "waitlist" }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("bot-field") ?? "").trim()) {
      setStatus("done");
      return;
    }
    const body = new URLSearchParams();
    body.set("form-name", "waitlist");
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") body.set(key, value);
    }
    setStatus("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Waitlist request failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      id={id}
      name="waitlist"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
    >
      <input type="hidden" name="form-name" value="waitlist" />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re a person
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="mono grid gap-1 normal-case">
        Name
        <input className="field" name="name" type="text" autoComplete="name" maxLength={80} placeholder="What should we call you?" />
      </label>
      <label className="mono grid gap-1 normal-case">
        Email
        <input className="field" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn self-end"
      >
        {status === "sending" ? "Sending…" : "Tell Amy"}
      </button>
      <div className="sm:col-span-3">
        {status === "done" ? (
          <p className="text-sm">You're on the list. We'll write when Amy is actually here.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm">
            The list posts on the live site. Your birth details were not included.
          </p>
        ) : null}
        <p className="mono mt-2 normal-case">
          Email only. No birthday, no Wildsign. Amy introduces you to your people later.
        </p>
      </div>
    </form>
  );
}
