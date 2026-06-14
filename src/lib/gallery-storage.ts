const BASE_URL = process.env.UPLOAD_SERVICE_BASE_URL;
const API_TOKEN = process.env.UPLOAD_SERVICE_API_TOKEN;
const ADMIN_USER = process.env.UPLOAD_SERVICE_ADMIN_USER;
const ADMIN_PASS = process.env.UPLOAD_SERVICE_ADMIN_PASS;
const PROJECT =
  process.env.UPLOAD_SERVICE_PROJECT ?? "rulers-basketball-academy-gallery";

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

const META_DELIM = "__";

export type GalleryMediaType = "image" | "video";

export type GalleryItem = {
  id: string;
  filename: string;
  src: string;
  type: GalleryMediaType;
  caption: string;
  alt: string;
  uploadedAt: string;
};

type ListedFile = {
  name: string;
  size: number;
  lastModified: string;
  publicUrl: string;
};

function requireEnv(): void {
  const missing: string[] = [];
  if (!BASE_URL) missing.push("UPLOAD_SERVICE_BASE_URL");
  if (!API_TOKEN) missing.push("UPLOAD_SERVICE_API_TOKEN");
  if (!ADMIN_USER) missing.push("UPLOAD_SERVICE_ADMIN_USER");
  if (!ADMIN_PASS) missing.push("UPLOAD_SERVICE_ADMIN_PASS");
  if (missing.length > 0) {
    throw new Error(`Missing upload-service env vars: ${missing.join(", ")}`);
  }
}

let cachedCookie: string | null = null;

async function login(): Promise<string> {
  requireEnv();
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: ADMIN_USER, password: ADMIN_PASS }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Upload service login failed (${res.status})`);
  }
  const raw =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : [res.headers.get("set-cookie")];
  const cookies = raw
    .filter((c): c is string => Boolean(c))
    .map((c) => c.split(";")[0].trim())
    .filter((c) => c.length > 0);
  if (cookies.length === 0) {
    throw new Error("Upload service login returned no session cookie");
  }
  const cookieHeader = cookies.join("; ");
  cachedCookie = cookieHeader;
  return cookieHeader;
}

async function getCookie(): Promise<string> {
  return cachedCookie ?? login();
}

async function sessionFetch(
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const cookie = await getCookie();
  const headers = new Headers(init.headers);
  headers.set("Cookie", cookie);
  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  if (res.status !== 401) return res;

  // Cookie likely expired — re-login once and retry
  cachedCookie = null;
  const fresh = await login();
  const retryHeaders = new Headers(init.headers);
  retryHeaders.set("Cookie", fresh);
  return fetch(url, { ...init, headers: retryHeaders, cache: "no-store" });
}

function encodeMeta(
  caption: string,
  alt: string,
  type: GalleryMediaType
): string {
  const json = JSON.stringify({ c: caption, a: alt, t: type });
  return Buffer.from(json, "utf-8").toString("base64url");
}

function decodeMeta(
  encoded: string
): { caption: string; alt: string; type: GalleryMediaType } | null {
  try {
    const json = Buffer.from(encoded, "base64url").toString("utf-8");
    const parsed = JSON.parse(json) as Partial<{
      c: string;
      a: string;
      t: string;
    }>;
    if (typeof parsed.c !== "string" || typeof parsed.t !== "string") {
      return null;
    }
    return {
      caption: parsed.c,
      alt: typeof parsed.a === "string" ? parsed.a : parsed.c,
      type: parsed.t === "video" ? "video" : "image",
    };
  } catch {
    return null;
  }
}

// Stored filename format: <uuid>-<base64url>__media.<ext>
// Extract the base64url segment between the last "-" before "__" and "__".
function extractMetaFromFilename(
  filename: string
): { caption: string; alt: string; type: GalleryMediaType } | null {
  const delimIdx = filename.indexOf(META_DELIM);
  if (delimIdx === -1) return null;
  const beforeDelim = filename.substring(0, delimIdx);
  const lastDash = beforeDelim.lastIndexOf("-");
  if (lastDash === -1) return null;
  const candidate = beforeDelim.substring(lastDash + 1);
  if (candidate.length === 0) return null;
  return decodeMeta(candidate);
}

function typeFromContentType(mime: string): GalleryMediaType | null {
  if (ALLOWED_IMAGE_TYPES.has(mime)) return "image";
  if (ALLOWED_VIDEO_TYPES.has(mime)) return "video";
  return null;
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

export async function readManifest(): Promise<GalleryItem[]> {
  requireEnv();
  const res = await sessionFetch(
    `${BASE_URL}/api/projects/${encodeURIComponent(PROJECT)}/files`
  );
  if (res.status === 404) {
    // Project not created yet — first upload will create it.
    return [];
  }
  if (!res.ok) {
    throw new Error(`Listing gallery files failed (${res.status})`);
  }
  const data = (await res.json()) as { files?: ListedFile[] };
  const files = Array.isArray(data.files) ? data.files : [];
  const items: GalleryItem[] = [];
  for (const f of files) {
    const meta = extractMetaFromFilename(f.name);
    if (!meta) continue; // skip files that weren't uploaded through this admin
    items.push({
      id: f.name,
      filename: f.name,
      src: f.publicUrl,
      type: meta.type,
      caption: meta.caption || "Academy Moment",
      alt:
        meta.alt ||
        meta.caption ||
        "Rulers Basketball Academy gallery media",
      uploadedAt: f.lastModified || new Date().toISOString(),
    });
  }
  items.sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
  return items;
}

export async function addItem(opts: {
  file: File;
  caption: string;
  alt?: string;
}): Promise<GalleryItem> {
  requireEnv();
  const { file, caption, alt } = opts;
  const mime = file.type;
  const type = typeFromContentType(mime);
  if (!type) {
    throw new Error(
      "Unsupported file type. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM, MOV."
    );
  }
  if (file.size === 0) throw new Error("Empty file");
  if (file.size > MAX_BYTES) throw new Error("File too large (max 50 MB)");

  const trimmedCaption = caption.trim().slice(0, 100);
  const trimmedAlt = (alt ?? "").trim().slice(0, 200);
  const encoded = encodeMeta(
    trimmedCaption || "Academy Moment",
    trimmedAlt || trimmedCaption || "Rulers Basketball Academy gallery media",
    type
  );
  const ext = extFromMime(mime);
  const uploadName = `${encoded}${META_DELIM}media${ext}`;

  const formData = new FormData();
  formData.append("file", file, uploadName);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "X-Project-Name": PROJECT,
    },
    body: formData,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Upload failed (${res.status})${text ? `: ${text.slice(0, 200)}` : ""}`
    );
  }
  const data = (await res.json()) as {
    file?: { name?: string; publicUrl?: string };
  };
  const stored = data.file;
  if (!stored?.name || !stored?.publicUrl) {
    throw new Error("Upload service returned an invalid response");
  }
  return {
    id: stored.name,
    filename: stored.name,
    src: stored.publicUrl,
    type,
    caption: trimmedCaption || "Academy Moment",
    alt:
      trimmedAlt ||
      trimmedCaption ||
      "Rulers Basketball Academy gallery media",
    uploadedAt: new Date().toISOString(),
  };
}

export async function deleteItem(id: string): Promise<boolean> {
  requireEnv();
  const res = await sessionFetch(
    `${BASE_URL}/api/projects/${encodeURIComponent(
      PROJECT
    )}/files/${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );
  if (res.status === 404) return false;
  if (!res.ok) {
    throw new Error(`Delete failed (${res.status})`);
  }
  return true;
}
