"use client";

import Image from "next/image";
import { Price } from "./price";
import { truncateText } from "@/components/utils";
import star from "../../../public/star.svg"
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "@/components/icons";

export const ProductCard = ({
  id,
  slug,
  name,
  image,
  price,
  rating,
  reviewsCount,
  discount,
}) => {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(name));

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id, slug, name, image, price, discount });
  };

  return (
    <Link
      href={`${slug}/${id}`}
      passHref
      className="app_item_product_card"
    >
      <article style={{ position: "relative" }}>
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.2s"
          }}
          className="wishlist_heart_btn"
        >
          <Heart
            style={{
              width: "16px",
              height: "16px",
              fill: isWishlisted ? "#fb641b" : "none",
              stroke: isWishlisted ? "#fb641b" : "#718096",
              strokeWidth: "2.5px"
            }}
            aria-hidden="true"
            focusable="false"
          />
        </button>
        <figure>
          <Image
            src={image}
            alt={`Photo of ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </figure>
        <div className="product_card_details">
          <h3>{truncateText(name, 40)}</h3>
          {discount !== 0 && (
            <span className="app_discount_price">
              <span className="sr-only">Discount: </span>
              {discount}% OFF
            </span>
          )}
          <div className="ratingComments">
            <div className="rating_app">
              <Image
                src={star}
                alt=""
                aria-hidden="true"
                fill
                style={{ objectFit: "contain" }}
              />
              <span className="sr-only">Rated </span>
              {rating}
              <span className="sr-only"> out of 5 stars</span>
            </div>
            <p className="user_comm">
              <span className="sr-only">based on </span>
              ({reviewsCount})
              <span className="sr-only"> reviews</span>
            </p>
          </div>
          <div className="app_price_and_btn">
            <Price price={price} discount={discount} />
          </div>
        </div>
      </article>
    </Link>
  );
};
