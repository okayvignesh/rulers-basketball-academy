"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GalleryItem } from "@/lib/gallery-storage";

type Props = { initialItems: GalleryItem[] };

export default function DashboardClient({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [caption, setCaption] = useState("");
  const [alt, setAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function onUpload(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!file) {
      setError("Please choose a file.");
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("caption", caption);
      form.append("alt", alt);
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setItems((prev) => [data.item as GalleryItem, ...prev]);
      setCaption("");
      setAlt("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess("Uploaded successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this item from the gallery?")) return;
    try {
      const res = await fetch(`/api/admin/uploads?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Delete failed");
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-secondary text-white">
        <div className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-[2px]">
              Gallery Admin
            </h1>
            <p className="text-white/60 text-sm">
              Upload images or videos that appear in the public gallery.
            </p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-[family-name:var(--font-oswald)] tracking-[1px] uppercase transition"
          >
            <i className="fas fa-sign-out-alt mr-2" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-10 grid gap-10 lg:grid-cols-[400px_1fr]">
        {/* Upload form */}
        <section className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-xl text-secondary tracking-[1.5px] mb-4">
            Upload New Media
          </h2>
          <form onSubmit={onUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File (image or video)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
                className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary-dark"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max 50 MB. JPEG, PNG, WebP, GIF, MP4, WebM, MOV.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={100}
                placeholder="e.g. Game Day Highlights"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt text (optional, for accessibility)
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                maxLength={200}
                placeholder="Describe the image/video"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm" role="alert">
                {error}
              </p>
            )}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-primary text-white rounded-lg py-2.5 font-[family-name:var(--font-oswald)] tracking-[1px] uppercase hover:bg-primary-dark transition disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </section>

        {/* Gallery list */}
        <section>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-xl text-secondary tracking-[1.5px] mb-4">
            Uploaded Items ({items.length})
          </h2>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm bg-white rounded-2xl shadow p-6">
              Nothing uploaded yet. Use the form to add the first item.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-xl shadow overflow-hidden"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {item.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={item.src}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {item.caption}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {item.type} · {new Date(item.uploadedAt).toLocaleString()}
                    </p>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="w-full text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-md py-1.5 transition"
                    >
                      <i className="fas fa-trash mr-2" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
