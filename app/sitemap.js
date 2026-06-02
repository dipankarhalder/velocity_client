import products from "@/data/products.json";
import processInfo from "@/data/processor.json";
import motherboardInfo from "@/data/motherboard.json";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://velocity-store.com";

export default function sitemap() {
  // 1. Static Routes
  const staticRoutes = [
    "",
    "/search",
    "/cart",
    "/checkout",
    "/brands",
    "/build-pc",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Categories and Product Pages
  const categories = [
    { slug: "processor", data: processInfo },
    { slug: "motherboard", data: motherboardInfo },
    { slug: "product", data: products },
  ];

  const productRoutes = [];

  categories.forEach(({ slug, data }) => {
    if (Array.isArray(data)) {
      data.forEach((product) => {
        productRoutes.push({
          url: `${BASE_URL}/${slug}/${product.id}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      });
    }
  });

  return [...staticRoutes, ...productRoutes];
}
