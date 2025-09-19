// app/product/[id]/page.tsx
import React from "react";
import Image from "next/image";
import styles from "./ProductDetails.module.scss";

// Product Details
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  description: string;
  specifications: Record<string, string>;
}

const products: Product[] = [
  {
    id: 1,
    name: "AMD Ryzen 7 5800X Processor",
    image: "/p1.jpg",
    price: 41650,
    discount: 4,
    rating: 4.5,
    reviewsCount: 1523,
    stock: 12,
    description:
      "The AMD Ryzen 7 5800X is a high-performance 8-core processor ideal for gaming and productivity.",
    specifications: {
      "Cores/Threads": "8/16",
      "Base Clock": "3.8GHz",
      "Max Boost Clock": "4.7GHz",
      Socket: "AM4",
      TDP: "105W",
      Cache: "36MB",
      Architecture: "Zen 3",
    },
  },
];

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetails({ params }: ProductPageProps) {
  const productId = Number(params.id);
  const product = products.find((p) => p.id == productId);
  console.log(product, "product");
  if (!product) {
    return <div>Product not found.</div>;
  }
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className={styles.product_details_container}>
      <div className={styles.product_image_container}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
        />
      </div>

      <div className={styles.product_info_container}>
        <h1>{product.name}</h1>

        {/* Rating & Reviews */}
        <div className={styles.rating}>
          ⭐ {product.rating} / 5 ({product.reviewsCount} reviews)
        </div>

        {/* Price */}
        <div className={styles.price_block}>
          <p className={styles.price}>Rs. {discountedPrice.toFixed(2)}</p>
          {product.discount > 0 && (
            <p className={styles.original_price}>
              MRP: <s>Rs. {product.price.toFixed(2)}</s> ({product.discount}%
              OFF)
            </p>
          )}
        </div>

        {/* Stock Info */}
        <p
          className={product.stock > 0 ? styles.in_stock : styles.out_of_stock}
        >
          {product.stock > 0
            ? `In Stock (${product.stock} left)`
            : "Out of Stock"}
        </p>

        {/* Add to Cart */}
        {product.stock > 0 && (
          <button className={styles.cart_button}>Add to Cart</button>
        )}

        {/* Description */}
        <div className={styles.description}>
          <h3>Product Description</h3>
          <p>{product.description}</p>
        </div>

        {/* Specifications */}
        <div className={styles.specifications}>
          <h3>Specifications</h3>
          <ul>
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
