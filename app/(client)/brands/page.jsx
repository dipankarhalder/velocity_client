"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "@/components/icons";

const brandData = [
  {
    id: 1,
    name: "Intel",
    image: "/cl1.jpg",
    category: "Processors",
    description: "World leader in silicon manufacturing, powering next-generation computing with Core and Xeon series processors."
  },
  {
    id: 2,
    name: "AMD",
    image: "/cl2.jpg",
    category: "Processors",
    description: "Pioneering Ryzen and Radeon chip architecture, delivering incredible multi-threaded performance for gamers and creators."
  },
  {
    id: 3,
    name: "ASUS",
    image: "/cl3.jpg",
    category: "Motherboards",
    description: "Industry titan in computer hardware, globally recognized for premium ROG gaming motherboards, monitors, and laptops."
  },
  {
    id: 4,
    name: "Gigabyte",
    image: "/cl4.jpg",
    category: "Motherboards",
    description: "Innovative manufacturer of AORUS gaming motherboards, graphics cards, and high-performance hardware peripherals."
  },
  {
    id: 5,
    name: "MSI",
    image: "/cl5.jpg",
    category: "Motherboards",
    description: "A leading brand in gaming, offering high-reliability military-grade motherboards, graphics cards, and cooling."
  },
  {
    id: 6,
    name: "Corsair",
    image: "/cl6.jpg",
    category: "Peripherals",
    description: "Premium builder of gaming keyboards, gaming mice, PC cases, high-speed RAM, and ultra-quiet power supplies."
  },
  {
    id: 7,
    name: "Razer",
    image: "/cl7.jpg",
    category: "Peripherals",
    description: "The premier lifestyle brand for gamers, renowned for ergonomic mice, Chroma mechanical keyboards, and audio."
  },
  {
    id: 8,
    name: "Kingston",
    image: "/cl8.jpg",
    category: "Peripherals",
    description: "The global leader in memory products, manufacturing high-performance HyperX/FURY RAM and ultra-durable SSD storage."
  },
  {
    id: 9,
    name: "NVIDIA",
    image: "/cl9.jpg",
    category: "Processors",
    description: "The pioneer of GPU computing, defining the future of gaming, rendering, and AI with GeForce RTX graphics processors."
  },
  {
    id: 10,
    name: "Logitech",
    image: "/cl10.jpg",
    category: "Peripherals",
    description: "Global manufacturer of high-precision mice, ergonomic keyboards, and premium workspace gear for professionals and gamers."
  }
];

const categories = ["All", "Processors", "Motherboards", "Peripherals"];

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBrands = brandData.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExploreBrand = (brandName) => {
    alert(`Exploring products for ${brandName}! Our team is currently preparing a custom product directory for this brand.`);
  };

  return (
    <div className="app_brands_page_container">
      <div className="app_brands_banner">
        <h1>Explore Our Brands</h1>
        <p>
          Discover top-tier computer hardware, state-of-the-art processors, gaming motherboards, 
          and professional peripherals from the world's most trusted manufacturers.
        </p>
      </div>

      <div className="app_brands_controls">
        <div className="app_brands_search_wrapper">
          <input
            type="text"
            placeholder="Search brands (e.g. Intel, ASUS, Corsair...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search brands"
          />
          <div className="app_search_icon_btn">
            <Search aria-hidden="true" focusable="false" />
          </div>
        </div>

        <div className="app_brands_filter_tabs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredBrands.length > 0 ? (
        <div className="app_brands_grid">
          {filteredBrands.map((brand) => (
            <article className="app_brands_card" key={brand.id}>
              <div className="app_brand_logo_area">
                <Image
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="app_brand_details_area">
                <h3>{brand.name}</h3>
                <span className="sr-only">Product Type: {brand.category}</span>
                <p>{brand.description}</p>
                <button
                  type="button"
                  className="app_brand_explore_btn"
                  onClick={() => handleExploreBrand(brand.name)}
                  aria-label={`Explore products from ${brand.name}`}
                >
                  Explore Products
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="app_brands_empty">
          <p>No brands found matching your search or category selection.</p>
        </div>
      )}
    </div>
  );
}
