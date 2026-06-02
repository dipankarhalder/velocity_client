"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import products from "@/data/products.json";
import processor from "@/data/processor.json";
import motherboard from "@/data/motherboard.json";
import { ProductCard } from "@/components/elements/shared/productCard";

const allProducts = [
  ...products.map((p) => ({ ...p, source: "products", customSlug: "product" })),
  ...processor.map((p) => ({ ...p, source: "processor", customSlug: "processor" })),
  ...motherboard.map((p) => ({ ...p, source: "motherboard", customSlug: "motherboard" })),
];

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    document.title = query
      ? `Search Results for "${query}" - Velocity`
      : "Search Products - Velocity";
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        (p.brand && p.brand.toLowerCase().includes(lowerQuery))
    );
    setResults(filtered);
  }, [query]);

  return (
    <section className="search_results_section" aria-label="Search Results">
      <header className="search_results_header">
        <h1>
          Search Results for &ldquo;<span>{query}</span>&rdquo;
        </h1>
        <p className="search_results_count">
          Found {results.length} {results.length === 1 ? "product" : "products"}
        </p>
      </header>

      {results.length > 0 ? (
        <div className="search_results_grid">
          {results.map((product) => (
            <ProductCard
              key={`${product.source}-${product.id}`}
              id={product.id}
              slug={product.customSlug}
              name={product.name}
              image={product.image}
              price={product.price}
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              discount={product.discount}
            />
          ))}
        </div>
      ) : (
        <div className="search_no_results">
          <div className="search_no_results_icon">🔍</div>
          <h2>No results found</h2>
          <p>We couldn't find anything matching &ldquo;{query}&rdquo;.</p>
          <p>Try checking your spelling or searching for another keyword.</p>
          <Link href="/" id="search-continue-shopping" className="search_continue_shopping_btn">
            Continue Shopping
          </Link>
        </div>
      )}
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search_loading">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
