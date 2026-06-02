"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { AddToCartButton } from "@/components/elements/shared/addToCartButton";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  // Deriving values from stable items reference to avoid SSR / useSyncExternalStore reference loops
  const cartItems = Object.values(items);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const grossAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => {
    const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);
  const totalDiscount = grossAmount - totalAmount;

  if (cartItems.length === 0) {
    return (
      <div className="app_cart_page_wrapper">
        <div className="app_cart_empty_state">
          <div style={{ fontSize: "56px", margin: "0 0 10px 0" }}>🛒</div>
          <h2>Your Cart is Empty!</h2>
          <p>Add items to it now to build your dream PC setup.</p>
          <Link href="/" className="shop_now_btn">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app_cart_page_wrapper">
      <h1 className="app_cart_title">Shopping Cart ({totalItemsCount} Items)</h1>
      <div className="app_cart_grid">
        
        {/* Left items column */}
        <div className="app_cart_left_panel">
          <div className="app_cart_items_container">
            {cartItems.map((item) => {
              const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
              
              return (
                <div className="app_cart_item_card" key={item.name}>
                  <div className="cart_item_image_frame">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="120px"
                    />
                  </div>
                  <div className="cart_item_details">
                    <div>
                      <h3>{item.name}</h3>
                      <p style={{ fontStyle: "italic", fontSize: "12px", color: "#718096", margin: "4px 0 0 0" }}>
                        Seller: Velocity Retail
                      </p>
                    </div>
                    
                    <div className="cart_item_meta_row">
                      <div className="cart_item_price_block">
                        <span className="discount_price">
                          ₹{discountedPrice.toLocaleString("en-IN")}/-
                        </span>
                        {item.discount > 0 && (
                          <>
                            <span className="original_price">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            <span className="discount_pct">
                              ({item.discount}% OFF)
                            </span>
                          </>
                        )}
                      </div>
                      
                      <div className="cart_item_actions">
                        <AddToCartButton
                          productName={item.name}
                          price={item.price}
                          discount={item.discount}
                          image={item.image}
                        />
                        <button
                          type="button"
                          className="remove_btn"
                          onClick={() => removeItem(item.name)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right price summary block */}
        <div className="app_price_details_sidebar">
          <h2>PRICE DETAILS</h2>
          <ul className="price_breakdown_list">
            <li>
              <span>Price ({totalItemsCount} items)</span>
              <span>₹{grossAmount.toLocaleString("en-IN")}</span>
            </li>
            {totalDiscount > 0 && (
              <li>
                <span>Discount</span>
                <span className="green_text">- ₹{totalDiscount.toLocaleString("en-IN")}</span>
              </li>
            )}
            <li>
              <span>Delivery Charges</span>
              <span className="green_text">FREE</span>
            </li>
          </ul>
          
          <div className="total_amount_row">
            <span>Total Payable</span>
            <span>₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
          
          {totalDiscount > 0 && (
            <p className="green_savings_msg">
              ✓ You will save ₹{totalDiscount.toLocaleString("en-IN")} on this order
            </p>
          )}

          <Link href="/checkout" className="place_order_btn">
            PLACE ORDER
          </Link>
        </div>
      </div>
    </div>
  );
}
