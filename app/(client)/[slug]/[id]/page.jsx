"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import products from "@/data/products.json";
import processInfo from "@/data/processor.json";
import motherboardInfo from "@/data/motherboard.json";
import { ProductCard } from "@/components/elements/shared/productCard";
import { Price } from "@/components/elements/shared/price";
import { AddToCartButton } from "@/components/elements/shared/addToCartButton";

import "swiper/css";
import "swiper/css/navigation";

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

const defaultReviews = [
  {
    id: 1,
    author: "Alex Mercer",
    rating: 5,
    date: "May 12, 2026",
    text: "Absolutely phenomenal product! The build quality is top-notch and it exceeds all performance benchmarks. Highly recommended for premium custom builds."
  },
  {
    id: 2,
    author: "Sarah Connor",
    rating: 4,
    date: "April 28, 2026",
    text: "Great performance and very stable under heavy loads. The installation was simple. Thermals are very decent."
  },
  {
    id: 3,
    author: "Bruce Wayne",
    rating: 5,
    date: "March 15, 2026",
    text: "Unbeatable specs for the price. Works flawlessly in my high-end workstation. Solid 5/5 stars."
  }
];

export default function ProductDetails() {
  const { slug, id } = useParams();
  const productId = Number(id);

  const { data: productList = [] } =
    PRODUCT_CONFIG[slug] ?? PRODUCT_CONFIG.default;

  const product = productList.find((item) => item.id === productId);

  // States
  const [activeImage, setActiveImage] = useState("");
  const [reviewsList, setReviewsList] = useState(defaultReviews);
  const [writeRating, setWriteRating] = useState(5);
  const [writeAuthor, setWriteAuthor] = useState("");
  const [writeText, setWriteText] = useState("");

  // Sync active image with product change
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  // Alternate images gallery
  const gallery = [product.image, "/dg1.jpg", "/dg2.jpg", "/dg3.jpg"];

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  // Rating Distribution Calculation
  const totalReviews = reviewsList.length;
  const avgRating = (
    reviewsList.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviewsList.forEach((r) => {
    ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!writeAuthor.trim() || !writeText.trim()) return;

    const newReview = {
      id: Date.now(),
      author: writeAuthor,
      rating: writeRating,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      text: writeText,
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setWriteAuthor("");
    setWriteText("");
    setWriteRating(5);
  };

  // Filter out the active product for related carousel
  const relatedProducts = productList.filter((item) => item.id !== productId);

  return (
    <div className="app_details_page_wrapper">
      <div className="product_details_container">
        
        {/* Gallery Slider Column (Sticky Flipkart-Style) */}
        <div className="product_image_gallery_column">
          <div className="sticky_gallery_wrapper">
            <div className="product_gallery_core">
              <div className="product_gallery_thumbnails">
                {gallery.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`product_thumbnail_btn ${
                      activeImage === imgUrl ? "active" : ""
                    }`}
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
              <div className="product_main_image_frame">
                <Image
                  src={activeImage || product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
            <div className="product_buy_actions">
              {product.stock > 0 ? (
                <>
                  <div className="cart_btn_wrapper">
                    <AddToCartButton
                      productName={product.name}
                      price={product.price}
                      discount={product.discount}
                      image={product.image}
                    />
                  </div>
                  <button
                    type="button"
                    className="buy_now_btn"
                    onClick={() => alert(`Proceeding to checkout with Buy Now for ${product.name}!`)}
                    aria-label={`Buy ${product.name} now`}
                  >
                    ⚡ Buy Now
                  </button>
                </>
              ) : (
                <div className="out_of_stock_banner">Currently Unavailable</div>
              )}
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="product_info_container">
          <h1>{product.name}</h1>
          <div className="rating">
            <span role="img" aria-label="Rating: ">⭐</span> 
            <span className="rating_num">{avgRating}</span>
            <span className="reviews_count">({totalReviews} Reviews)</span>
          </div>

          <div className="price_block">
            <p className="price">
              <span className="sr-only">Selling Price: </span>
              Rs. {discountedPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
            {product.discount > 0 && (
              <p className="original_price">
                <span className="sr-only">Original Price (MRP): </span>
                <s>Rs. {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</s> 
                <span className="sr-only">, with a discount of </span>
                <span className="discount_percentage">({product.discount}% OFF)</span>
              </p>
            )}
          </div>

          <p className={product.stock > 0 ? "in_stock" : "out_of_stock"}>
            {product.stock > 0
              ? `✓ In Stock (${product.stock} units available)`
              : "✗ Out of Stock"}
          </p>

          {/* Product Description Section */}
          <div className="details_section description_section">
            <h3>Product Description</h3>
            <p>{product.description}</p>
            <div className="shipping_guarantee">
              <h4>✓ 3-Year Domestic Warranty</h4>
              <h4>✓ Free Shipping in 2-3 Business Days</h4>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="details_section specifications_section">
            <h3>Specifications</h3>
            <ul>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ratings & Reviews Section */}
          <div className="details_section reviews_section">
            <h3>Ratings & Reviews</h3>
            <div className="reviews_dashboard_overview">
              <div className="overview_rating_average_card">
                <h4>{avgRating}</h4>
                <p>out of 5.0</p>
                <div className="stars">⭐⭐⭐⭐⭐</div>
              </div>
              
              <div className="overview_rating_progress_section">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingCounts[stars] || 0;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div className="progress_row" key={stars}>
                      <span>{stars} ★</span>
                      <div className="progress_bar_bg">
                        <div
                          className="progress_bar_fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="count_percentage">{Math.round(percentage)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write a Review Section */}
            <div className="write_review_form_wrapper">
              <h3>Submit Your Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="form_group star_select">
                  <label>Rating:</label>
                  <div className="star_buttons">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setWriteRating(star)}
                        className={writeRating >= star ? "star_active" : ""}
                        aria-label={`Rate ${star} star`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="review-author">Full Name</label>
                  <input
                    id="review-author"
                    type="text"
                    placeholder="Your Name"
                    value={writeAuthor}
                    onChange={(e) => setWriteAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="review-content">Comments</label>
                  <textarea
                    id="review-content"
                    placeholder="Write your product experience..."
                    value={writeText}
                    onChange={(e) => setWriteText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit_review_btn">
                  Submit Review
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="reviews_entries_list">
              <h3>Customer Feedback</h3>
              {reviewsList.map((review) => (
                <div className="review_item_card" key={review.id}>
                  <div className="review_item_header">
                    <div>
                      <h5>{review.author}</h5>
                      <span className="review_stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <span className="review_date">{review.date}</span>
                  </div>
                  <p className="review_body">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="app_related_products_carousel_section">
          <h2>Related Products</h2>
          <div className="related_products_swiper_wrapper">
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={20}
              slidesPerView={4}
              navigation
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              aria-roledescription="carousel"
            >
              {relatedProducts.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductCard {...item} slug={slug} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
