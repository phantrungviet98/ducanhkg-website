import { NextResponse } from "next/server";
import { getPublicArticles } from "@/lib/articles";

export async function GET() {
  return NextResponse.json(await getPublicArticles(), {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
