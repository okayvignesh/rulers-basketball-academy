import { NextResponse } from "next/server";
import { readManifest } from "@/lib/gallery-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await readManifest();
    return NextResponse.json({ items });
  } catch (err) {
    console.error("Failed to load gallery manifest:", err);
    // Fail soft so the homepage gallery still renders its static items.
    return NextResponse.json({ items: [] });
  }
}
