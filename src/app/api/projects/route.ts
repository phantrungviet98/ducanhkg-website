import { NextResponse } from "next/server";
import { getPublicProjects } from "@/lib/projects";

export async function GET() {
  const projects = await getPublicProjects();
  return NextResponse.json(projects, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

