import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readManifest } from "@/lib/gallery-storage";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) redirect("/admin");
  const items = await readManifest();
  return <DashboardClient initialItems={items} />;
}
