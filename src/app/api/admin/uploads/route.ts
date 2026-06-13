import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addItem, deleteItem, readManifest } from "@/lib/gallery-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAuth() {
  if (await isAuthenticated()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;
  return NextResponse.json({ items: await readManifest() });
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  const form = await req.formData();
  const file = form.get("file");
  const caption = (form.get("caption") as string | null) ?? "";
  const alt = (form.get("alt") as string | null) ?? "";

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const item = await addItem({ file, caption, alt });
    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const ok = await deleteItem(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
