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
  const payload = (await request.json()) as LeadPayload;

  if (!payload.name || !payload.phone) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { error } = await supabase.from("leads").insert({
    source: payload.source ?? "website",
    name: payload.name,
    phone: payload.phone,
    email: payload.email || null,
    message: payload.message || null
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
