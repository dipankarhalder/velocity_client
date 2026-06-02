"use client";

import { useCartStore } from "@/store/useCartStore";

export const AddToCartButton = ({
  productName,
  price = 0,
  discount = 0,
  image = "",
}) => {
  const quantity = useCartStore((state) => state.items[productName]?.quantity || 0);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleAdd = () => {
    addItem(productName, price, discount, image);
  };

  const increase = () => {
    updateQuantity(productName, quantity + 1);
  };

  const decrease = () => {
    updateQuantity(productName, quantity - 1);
  };

  return (
    <div className="app_btn_add" aria-label={`Cart actions for ${productName}`}>
      {quantity === 0 ? (
        <button onClick={handleAdd} aria-label={`Add ${productName} to cart`}>
          Add to Cart
        </button>
      ) : (
        <div
          className="app_btn_quantity"
          role="group"
          aria-label={`Quantity selector for ${productName}`}
        >
          <button
            onClick={decrease}
            aria-label={`Decrease quantity of ${productName}`}
          >
            -
          </button>
          <span aria-live="polite" aria-atomic="true">
            {quantity}
          </span>
          <button
            onClick={increase}
            aria-label={`Increase quantity of ${productName}`}
            disabled={quantity >= 6}
            title={
              quantity >= 6
                ? "Maximum limit reached"
                : `Increase ${productName}`
            }
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
