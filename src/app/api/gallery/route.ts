import { NextResponse } from "next/server";
import { readManifest } from "@/lib/gallery-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const items = await readManifest();
  return NextResponse.json({ items });
}
