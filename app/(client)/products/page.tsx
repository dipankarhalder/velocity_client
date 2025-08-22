import React from "react";
import { ProductCard } from "@/components/elements/shared/productCard";

// Product Details
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "AMD Ryzen 7 5800X Processor",
    image: "/p1.jpg",
    price: 41650,
    discount: 4,
  },
  {
    id: 2,
    name: "Crucial P3 Plus 1TB NVMe Gen4 Internal SSD",
    image: "/p2.jpg",
    price: 14900,
    discount: 7,
  },
  {
    id: 3,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: "/p3.jpg",
    price: 81250,
    discount: 22,
  },
  {
    id: 4,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: "/p4.jpg",
    price: 141650,
    discount: 20,
  },
  {
    id: 5,
    name: "CyberPower UT2200E 2200VA UPS",
    image: "/p5.jpg",
    price: 49990,
    discount: 18,
  },
  {
    id: 6,
    name: "ZOTAC RTX 5060 Solo 8GB GDDR7 Graphics Card",
    image: "/p6.jpg",
    price: 38999,
    discount: 30,
  },
  {
    id: 7,
    name: "MSI RTX 5060 Inspire 2X OC 8GB GDDR7 Graphics Card",
    image: "/p7.jpg",
    price: 41650,
    discount: 19,
  },
  {
    id: 8,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: "/p3.jpg",
    price: 9540,
    discount: 9,
  },
  {
    id: 9,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: "/p4.jpg",
    price: 19790,
    discount: 17,
  },
];

// End Products

export default function Products() {
  return (
    <div className="app_main_product_list_container">
      <h2 id="bestsellers-heading" className="app_heading_info">
        Best Selling Products
      </h2>
      <div className="app_product_list_wrapper">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
