"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type Props = {
  source: string;
  title?: string;
};

export function ContactForm({ source, title = "Request a consultation" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source,
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        message: formData.get("message")
      })
    });

    if (response.ok) {
      form.reset();
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <h2>{title}</h2>
      <label>
        Full name
        <input name="name" required placeholder="Your name" />
      </label>
      <label>
        Phone
        <input name="phone" required placeholder="+84..." />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@example.com" />
      </label>
      <label>
        Project notes
        <textarea name="message" rows={5} placeholder="Tell us about the location, size, timeline, or service you need." />
      </label>
      <button className="button primary" disabled={status === "sending"}>
        <Send size={17} />
        {status === "sending" ? "Sending..." : "Send request"}
      </button>
      {status === "sent" ? <p className="form-status">Request received. We will contact you shortly.</p> : null}
      {status === "error" ? <p className="form-status error">The request could not be sent. Check Supabase environment variables.</p> : null}
    </form>
  );
}
