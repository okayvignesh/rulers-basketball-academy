import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readManifest, type GalleryItem } from "@/lib/gallery-storage";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) redirect("/admin");

  let items: GalleryItem[] = [];
  let loadError: string | null = null;
  try {
    items = await readManifest();
  } catch (err) {
    loadError =
      err instanceof Error
        ? err.message
        : "Could not load gallery items from the upload service.";
  }

  return <DashboardClient initialItems={items} loadError={loadError} />;
}
