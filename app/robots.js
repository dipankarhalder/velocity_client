const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://velocity-store.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/order-success"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
