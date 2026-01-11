import Image from "next/image";

export const BrandCard = ({ id, image }) => {
  return (
    <article className="app_item_brand_card" role="group">
      <figure>
        <Image
          src={image}
          alt={`image-${id}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </figure>
    </article>
  );
};
