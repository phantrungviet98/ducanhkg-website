"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocale } from "@/lib/locale-context";

type Props = {
  source: string;
  title?: string;
};

export function ContactForm({ source, title }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { content } = useLocale();
  const form = content.form;

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
      <h2>{title ?? form.title}</h2>
      <label>
        {form.name}
        <input name="name" required placeholder={form.namePlaceholder} />
      </label>
      <label>
        {form.phone}
        <input name="phone" required placeholder={form.phonePlaceholder} />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder={form.emailPlaceholder} />
      </label>
      <label>
        {form.message}
        <textarea name="message" rows={5} placeholder={form.messagePlaceholder} />
      </label>
      <button className="button primary" disabled={status === "sending"}>
        <Send size={17} />
        {status === "sending" ? form.sending : form.submit}
      </button>
      {status === "sent" ? <p className="form-status">{form.sent}</p> : null}
      {status === "error" ? <p className="form-status error">{form.error}</p> : null}
    </form>
  );
}
