export const Price = ({ price, discount }) => {
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  const formatPrice = (value) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <div
      aria-label={hasDiscount ? "Price with discount" : "Price"}
      className="app_product_price_sec"
    >
      <p className="discount_prc">
        <strong>{formatPrice(finalPrice)}</strong>
      </p>
      {hasDiscount && (
        <p>
          <s aria-hidden="true">{formatPrice(price)}</s>
        </p>
      )}
    </div>
  );
};
