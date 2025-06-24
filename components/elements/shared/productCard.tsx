import Image from "next/image";
import { Price } from "./price";
import { AddToCartButton } from "./addToCartButton";
import { truncateText } from "@/components/utils";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  discount,
}) => {
  return (
    <article
      className="app_item_product_card"
      role="group"
      aria-label={`${name}, ${discount}% off`}
    >
      <figure>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </figure>
      <h3>{truncateText(name, 40)}</h3>
      {discount !== 0 && (
        <span className="app_discount_price">{discount}% OFF</span>
      )}
      <div className="app_price_and_btn">
        <Price price={price} discount={discount} />
        <AddToCartButton productName={name} />
      </div>
    </article>
  );
};
