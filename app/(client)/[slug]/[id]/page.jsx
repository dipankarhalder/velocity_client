import { Suspense } from "react";
import ProductDetailsView from "@/components/elements/products/productDetailsView";
import products from "@/data/products.json";
import processInfo from "@/data/processor.json";
import motherboardInfo from "@/data/motherboard.json";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://velocity-store.com";

const PRODUCT_CONFIG = {
  processor: { title: "Processors", data: processInfo },
  motherboard: { title: "Motherboards", data: motherboardInfo },
  default: { title: "Best Selling Products", data: products },
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, id } = resolvedParams;
  const productId = Number(id);
  
  const { data = [] } = PRODUCT_CONFIG[slug] ?? PRODUCT_CONFIG.default;
  const product = data.find((item) => item.id === productId);

  if (!product) {
    return {
      title: "Product Not Found | Velocity Store",
      description: "The requested product could not be found on Velocity Store.",
    };
  }

  return {
    title: `${product.name} | Velocity Store`,
    description: product.description || `Buy ${product.name} at Velocity Store. High performance computer hardware.`,
    alternates: {
      canonical: `${BASE_URL}/${slug}/${id}`,
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await params;
  const { slug, id } = resolvedParams;
  const productId = Number(id);

  const { data = [] } = PRODUCT_CONFIG[slug] ?? PRODUCT_CONFIG.default;
  const product = data.find((item) => item.id === productId);

  let jsonLd = null;
  if (product) {
    const discountedPrice = Math.round(product.price - (product.price * (product.discount || 0)) / 100);
    // Determine image full path
    const imageUrl = product.image.startsWith("http") 
      ? product.image 
      : `${BASE_URL}${product.image.startsWith("/") ? "" : "/"}${product.image}`;

    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": [imageUrl],
      "description": product.description || `Buy ${product.name} at Velocity Store.`,
      "sku": `VEL-${slug ? slug.toUpperCase() : "PRODUCT"}-${product.id}`,
      "brand": {
        "@type": "Brand",
        "name": product.brand || "Velocity"
      },
      "offers": {
        "@type": "Offer",
        "url": `${BASE_URL}/${slug}/${id}`,
        "priceCurrency": "INR",
        "price": discountedPrice,
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "priceValidUntil": "2027-12-31"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "3"
      }
    };
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense fallback={<div className="app_details_page_wrapper"><div className="error">Loading Product Details...</div></div>}>
        <ProductDetailsView slug={slug} id={id} />
      </Suspense>
    </>
  );
}
