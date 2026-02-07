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
    "/credits", 
  ];

 
  const serviceRoutes = [
    "/services/farmer-training",
    "/services/workshops",
    "/services/research",
    "/services/consultancy",
    "/services/publications",
    "/services/digital-learning",
  ];


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