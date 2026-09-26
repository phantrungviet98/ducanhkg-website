import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type LeadPayload = {
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const source = typeof payload.source === "string" ? payload.source.trim() : "website";

  if (!name || !phone || name.length > 150 || phone.length > 40 || email.length > 254 || message.length > 10000 || source.length > 120) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  // Secret keys bypass RLS and must remain in server-only environment variables.
  const supabase = createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase.from("leads").insert({
    source: source || "website",
    name,
    phone,
    email: email || null,
    message: message || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
