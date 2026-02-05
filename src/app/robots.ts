import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://agrilearnnexus.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",      // Keep admin private
        "/api/",        // Keep API private
        "/dashboard/",  // Keep user dashboard private
        "/private/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, // This URL is still correct
  };
}