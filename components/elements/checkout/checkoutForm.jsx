"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  // Deriving values from stable items reference to avoid SSR / useSyncExternalStore reference loops
  const cartItems = Object.values(items);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => {
    const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);
  
  const user = useAuthStore((state) => state.user);

  // States
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    locality: "",
    city: "",
    state: "",
    type: "home",
  });

  // Pre-fill user name once mounted and user is loaded
  useEffect(() => {
    if (isMounted && user) {
      setAddress((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
      }));
    }
  }, [isMounted, user]);

  const grossAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = grossAmount - totalAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (isProcessing) return;
    if (!address.fullName.trim() || !address.phone.trim() || !address.addressLine.trim() || !address.city.trim()) {
      alert("Please fill in all required delivery details!");
      return;
    }

    // Trigger premium transaction processing loader
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push("/order-success");
    }, 1500);
  };

  if (!isMounted) {
    return (
      <div className="app_checkout_page_wrapper">
        <div className="app_cart_empty_state">
          <h2>Loading Checkout...</h2>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="app_checkout_page_wrapper">
        <div className="app_cart_empty_state">
          <div style={{ fontSize: "56px", margin: "0 0 10px 0" }}>⚡</div>
          <h2>Your Cart is Empty!</h2>
          <p>Please add products to your cart before proceeding to checkout.</p>
          <Link href="/" className="shop_now_btn">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app_checkout_page_wrapper">
      
      {/* Transaction Loader Overlay */}
      {isProcessing && (
        <div className="app_checkout_loader_overlay" role="alert" aria-busy="true">
          <div className="spinner"></div>
          <h2>Processing Secure Payment...</h2>
          <p>Please do not close or refresh this page.</p>
        </div>
      )}

      <h1 className="app_checkout_title">Secure Checkout</h1>
      <div className="app_checkout_grid">
        
        {/* Left input columns */}
        <form onSubmit={handleConfirmOrder} className="app_checkout_left_panel">
          
          {/* Step 1: Login State Check */}
          <div className="app_checkout_step_card">
            <h2><span className="step_num">1</span> Login Details</h2>
            <div className="checkout_logged_in_user">
              <span>
                {user ? (
                  <>Logged in as: <strong>{user.name}</strong> ({user.email})</>
                ) : (
                  <>Checkout as: <strong>Guest</strong></>
                )}
              </span>
              {!user && (
                <span style={{ fontSize: "13px", color: "#ff9f00", fontWeight: "700" }}>
                  Sign in for a faster checkout
                </span>
              )}
            </div>
          </div>

          {/* Step 2: Shipping details */}
          <div className="app_checkout_step_card">
            <h2><span className="step_num">2</span> Delivery Address</h2>
            <div className="address_form_fields">
              <div className="form_group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={address.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={address.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label htmlFor="pincode">Pin Code *</label>
                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  placeholder="6-digit pincode"
                  value={address.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label htmlFor="locality">Locality *</label>
                <input
                  id="locality"
                  type="text"
                  name="locality"
                  placeholder="Locality/Sector"
                  value={address.locality}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group span_2">
                <label htmlFor="addressLine">Address (Area and Street) *</label>
                <textarea
                  id="addressLine"
                  name="addressLine"
                  placeholder="Flat/House No., Building, Street Name"
                  value={address.addressLine}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form_group">
                <label htmlFor="city">City/District *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label htmlFor="state">State *</label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form_group span_2">
                <label>Address Type</label>
                <div className="address_type_radio_group">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="home"
                      checked={address.type === "home"}
                      onChange={handleInputChange}
                    />
                    <span>🏠 Home (All day delivery)</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="work"
                      checked={address.type === "work"}
                      onChange={handleInputChange}
                    />
                    <span>💼 Work (10 AM - 5 PM delivery)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Payment details */}
          <div className="app_checkout_step_card">
            <h2><span className="step_num">3</span> Payment Options</h2>
            <div className="payment_options_list">
              <label className="payment_option_card">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => handlePaymentChange("upi")}
                />
                <div className="payment_details_label">
                  <span className="title">UPI (Google Pay / PhonePe / Paytm)</span>
                  <span className="desc">Instant secured digital payment via scanner</span>
                </div>
              </label>
              <label className="payment_option_card">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => handlePaymentChange("card")}
                />
                <div className="payment_details_label">
                  <span className="title">Credit / Debit / ATM Card</span>
                  <span className="desc">Secure payment with Visa, Mastercard, RuPay</span>
                </div>
              </label>
              <label className="payment_option_card">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => handlePaymentChange("cod")}
                />
                <div className="payment_details_label">
                  <span className="title">Cash on Delivery (COD)</span>
                  <span className="desc">Pay with cash or digital UPI upon receipt of package</span>
                </div>
              </label>
            </div>
          </div>
        </form>

        {/* Right order list & price details summary */}
        <div className="app_price_details_sidebar">
          <h2>ORDER SUMMARY ({totalItemsCount} Items)</h2>
          
          {/* Scrollable products overview */}
          <div className="checkout_sidebar_products_list">
            {cartItems.map((item) => {
              const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
              return (
                <div className="checkout_sidebar_product_item" key={item.name}>
                  <div className="product_img_frame">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="50px"
                    />
                  </div>
                  <div className="product_desc">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity} × ₹{discountedPrice.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 style={{ marginTop: "10px", borderTop: "none" }}>PRICE DETAILS</h2>
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

          <button type="submit" onClick={handleConfirmOrder} className="confirm_order_btn">
            CONFIRM ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
