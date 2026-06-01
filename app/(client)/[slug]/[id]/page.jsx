"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import products from "@/data/products.json";
import processInfo from "@/data/processor.json";
import motherboardInfo from "@/data/motherboard.json";

const PRODUCT_CONFIG = {
  processor: { title: "Processors", data: processInfo },
  motherboard: { title: "Motherboards", data: motherboardInfo },
  memory: { title: "Memories", data: [] },
  gpu: { title: "Graphics", data: [] },
  monitor: { title: "Monitors", data: [] },
  mobile: { title: "Mobiles", data: [] },
  laptop: { title: "Laptops", data: [] },
  keyboard: { title: "Keyboards", data: [] },
  cabinate: { title: "Cabinates", data: [] },
  headphone: { title: "Headphones", data: [] },
  console: { title: "Consoles", data: [] },
  default: { title: "Best Selling Products", data: products },
};

export default function ProductDetails() {
  const { slug, id } = useParams();
  const productId = Number(id);

  const { data: productList = [] } =
    PRODUCT_CONFIG[slug] ?? PRODUCT_CONFIG.default;

  const product = productList.find((item) => item.id === productId);
  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="product_details_container">
      <div className="product_image_container">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="product_info_container">
        <h1>{product.name}</h1>
        <div className="rating">
          <span role="img" aria-label="Rating: ">⭐</span> 
          {product.rating}
          <span className="sr-only"> out of 5 stars</span> 
          <span> ({product.reviewsCount} reviews)</span>
        </div>
        <div className="price_block">
          <p className="price">
            <span className="sr-only">Selling Price: </span>
            Rs. {discountedPrice.toFixed(2)}
          </p>
          {product.discount > 0 && (
            <p className="original_price">
              <span className="sr-only">Original Price: </span>
              <s>Rs. {product.price.toFixed(2)}</s> 
              <span className="sr-only">, with a discount of </span>
              ({product.discount}% OFF)
            </p>
          )}
        </div>

        <p className={product.stock > 0 ? "in_stock" : "out_of_stock"}>
          {product.stock > 0
            ? `In Stock (${product.stock} left)`
            : "Out of Stock"}
        </p>
        {product.stock > 0 && (
          <button type="button" className="cart_button">Add to Cart</button>
        )}
        <div className="description">
          <h3>Product Description</h3>
          <p>{product.description}</p>
        </div>
        <div className="specifications">
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
