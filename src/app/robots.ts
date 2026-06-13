import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: "https://rulersbasketballacademy.com/sitemap.xml",
    host: "https://rulersbasketballacademy.com",
  };
}
