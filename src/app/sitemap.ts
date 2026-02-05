import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXTAUTH_URL || "https://agrilearnnexus.com";

  // 1. Core Static Routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/magazine",
    "/events",
    "/contact",
    "/register",
    "/privacy-policy",
    "/terms",
  ];

  // 2. Hardcoded Services (Based on your Navbar)
  // Since these aren't in your DB, we list them manually
  const serviceRoutes = [
    "/services/farmer-training",
    "/services/workshops",
    "/services/research",
    "/services/consultancy",
    "/services/publications",
    "/services/digital-learning",
  ];

  // 3. Generate entries
  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceEntries = serviceRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...serviceEntries];
}
