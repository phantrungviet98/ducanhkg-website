"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type Props = {
  source: string;
  title?: string;
};

export function ContactForm({ source, title = "Đăng ký tư vấn" }: Props) {
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
        Họ và tên
        <input name="name" required placeholder="Tên của bạn" />
      </label>
      <label>
        Số điện thoại
        <input name="phone" required placeholder="091..." />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="email@example.com" />
      </label>
      <label>
        Nội dung cần tư vấn
        <textarea name="message" rows={5} placeholder="Cho chúng tôi biết địa điểm, quy mô, thời gian hoặc dịch vụ bạn cần." />
      </label>
      <button className="button primary" disabled={status === "sending"}>
        <Send size={17} />
        {status === "sending" ? "Đang gửi..." : "Gửi yêu cầu"}
      </button>
      {status === "sent" ? <p className="form-status">Đã nhận thông tin. Chúng tôi sẽ liên hệ lại sớm.</p> : null}
      {status === "error" ? <p className="form-status error">Chưa gửi được yêu cầu. Kiểm tra cấu hình Supabase.</p> : null}
    </form>
  );
}
