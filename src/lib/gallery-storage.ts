import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");
const MANIFEST_PATH = path.join(UPLOAD_DIR, "manifest.json");
const PUBLIC_URL_PREFIX = "/uploads/gallery";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);
const MAX_BYTES = 50 * 1024 * 1024; // 50 MB

export type GalleryMediaType = "image" | "video";

export type GalleryItem = {
  id: string;
  src: string;
  filename: string;
  type: GalleryMediaType;
  caption: string;
  alt: string;
  uploadedAt: string;
};

export async function readManifest(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as GalleryItem[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeManifest(items: GalleryItem[]): Promise<void> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function addItem(opts: {
  file: File;
  caption: string;
  alt?: string;
}): Promise<GalleryItem> {
  const { file, caption, alt } = opts;
  const mime = file.type;
  const isImage = ALLOWED_IMAGE_TYPES.has(mime);
  const isVideo = ALLOWED_VIDEO_TYPES.has(mime);
  if (!isImage && !isVideo) {
    throw new Error(
      "Unsupported file type. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM, MOV."
    );
  }
  if (file.size === 0) throw new Error("Empty file");
  if (file.size > MAX_BYTES) throw new Error("File too large (max 50 MB)");

  const type: GalleryMediaType = isImage ? "image" : "video";
  const ext = extFromMime(mime) || sanitizeExt(file.name);
  const id = randomUUID();
  const filename = `${id}${ext}`;

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const trimmedCaption = caption.trim().slice(0, 100);
  const trimmedAlt = (alt ?? "").trim().slice(0, 200);
  const item: GalleryItem = {
    id,
    filename,
    src: `${PUBLIC_URL_PREFIX}/${filename}`,
    type,
    caption: trimmedCaption || "Academy Moment",
    alt: trimmedAlt || trimmedCaption || "Rulers Basketball Academy gallery media",
    uploadedAt: new Date().toISOString(),
  };

  const items = await readManifest();
  items.unshift(item);
  await writeManifest(items);
  return item;
}

export async function deleteItem(id: string): Promise<boolean> {
  const items = await readManifest();
  const idx = items.findIndex((i) => i.id === id);
  if (idx < 0) return false;
  const [removed] = items.splice(idx, 1);
  try {
    await fs.unlink(path.join(UPLOAD_DIR, removed.filename));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }
  await writeManifest(items);
  return true;
}

function extFromMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    case "video/mp4":
      return ".mp4";
    case "video/webm":
      return ".webm";
    case "video/quicktime":
      return ".mov";
    default:
      return "";
  }
}

function sanitizeExt(name: string): string {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return "";
  const ext = name.slice(dot).toLowerCase().replace(/[^a-z0-9.]/g, "");
  return ext.length > 1 && ext.length <= 6 ? ext : "";
}
