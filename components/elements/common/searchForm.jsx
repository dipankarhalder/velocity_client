"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search } from "@/components/icons";
import products from "@/data/products.json";
import processor from "@/data/processor.json";
import motherboard from "@/data/motherboard.json";

const allProducts = [
  ...products.map((p) => ({ ...p, source: "products", customSlug: "product" })),
  ...processor.map((p) => ({ ...p, source: "processor", customSlug: "processor" })),
  ...motherboard.map((p) => ({ ...p, source: "motherboard", customSlug: "motherboard" })),
];

export const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

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
    setResults(filtered.slice(0, 6));
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleResultClick = () => {
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div className="app_top_search_container" ref={dropdownRef} style={{ position: "relative" }}>
      <form
        className="app_top_search"
        role="search"
        aria-label="Site Search"
        onSubmit={handleSubmit}
      >
        <div className="app_main_search_input">
          <span>
            <Search aria-hidden="true" focusable="false" />
          </span>
          <input
            type="text"
            name="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search your favorite products, brands ..."
            aria-label="Search"
            autoComplete="off"
          />
        </div>
      </form>

      {showDropdown && results.length > 0 && (
        <div className="app_search_dropdown">
          <ul role="list">
            {results.map((item) => {
              const itemLink = `/${item.customSlug}/${item.id}`;
              const discountedPrice = item.discount
                ? item.price - (item.price * item.discount) / 100
                : item.price;

              return (
                <li key={`${item.source}-${item.id}`}>
                  <Link href={itemLink} onClick={handleResultClick} className="search_dropdown_item">
                    <div className="search_item_image_wrapper">
                      <Image
                        src={item.image}
                        alt=""
                        width={40}
                        height={40}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="search_item_info">
                      <span className="search_item_name">{item.name}</span>
                      <span className="search_item_meta">
                        {item.brand || (item.source === "motherboard" ? "Motherboard" : "Processor")}
                      </span>
                    </div>
                    <div className="search_item_price_wrapper">
                      <span className="search_item_price">
                        ₹{discountedPrice.toLocaleString("en-IN")}
                      </span>
                      {item.discount > 0 && (
                        <span className="search_item_original_price">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
