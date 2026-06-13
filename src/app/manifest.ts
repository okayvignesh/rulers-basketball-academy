import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rulers Basketball Academy",
    short_name: "Rulers BBA",
    description:
      "Top basketball academy in Hyderabad — professional coaching for kids, teens and adults.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f1a",
    theme_color: "#f97316",
    orientation: "portrait",
    icons: [
      {
        src: "/images/Asset 1.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/images/Asset 1.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/Asset 1.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
