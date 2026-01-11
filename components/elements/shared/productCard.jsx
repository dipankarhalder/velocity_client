import Image from "next/image";
import { Price } from "./price";
import { truncateText } from "@/components/utils";
import star from "../../../public/star.svg"
import Link from "next/link";

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
  return (
    <Link
      href={`${slug}/${id}`}
      passHref
      className="app_item_product_card"
      role="group"
      aria-label={`${name}, ${discount}% off`}
    >
      <article>
        <figure>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </figure>
        <div className="product_card_details">
          <h3>{truncateText(name, 40)}</h3>
          {discount !== 0 && (
            <span className="app_discount_price">{discount}% OFF</span>
          )}
          <div className="ratingComments">
            <p className="rating_app">
              <Image
                src={star}
                alt={name}
                fill
                style={{ objectFit: "contain" }}
              />
              {rating}</p>
            <p className="user_comm">({reviewsCount})</p>
          </div>
          <div className="app_price_and_btn">
            <Price price={price} discount={discount} />
          </div>
        </div>
      </article>
    </Link>
  );
};
