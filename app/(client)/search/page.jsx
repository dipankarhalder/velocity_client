import { Suspense } from "react";
import { SearchResults } from "@/components/elements/search/searchResults";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://velocity-store.com";

export const metadata = {
  title: "Search Products - Velocity",
  description: "Search your favorite computer components, processors, motherboards and rigs on Velocity.",
  alternates: {
    canonical: `${BASE_URL}/search`,
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search_loading">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
