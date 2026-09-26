import { NextResponse } from "next/server";
import { getPublicCostRateSettings } from "@/lib/cost-rate-settings";

export async function GET() {
  return NextResponse.json(await getPublicCostRateSettings(), {
    headers: { "Cache-Control": "no-store" },
  });
}
