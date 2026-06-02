"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    // Generate secure mock order reference
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`VEL-${randomNum}-2026`);

    // Calculate delivery date (4 days from current local time)
    const date = new Date();
    date.setDate(date.getDate() + 4);
    const dateOptions = { weekday: "long", day: "numeric", month: "long" };
    setDeliveryDate(date.toLocaleDateString("en-IN", dateOptions));
  }, []);

  return (
    <div className="app_success_page_wrapper">
      <div className="app_success_card">
        
        {/* Animated Green Confirmation circle */}
        <div className="success_badge_anim" role="presentation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1>Order Placed Successfully!</h1>
        <p className="success_thankyou_msg">
          Thank you for choosing Velocity. Your order has been registered securely. A confirmation email with receipt and shipment details will be sent to your registered address shortly.
        </p>

        {/* Invoice information overview box */}
        <div className="order_reference_info_box">
          <div className="info_row">
            <span>Order Reference ID:</span>
            <strong>{orderId}</strong>
          </div>
          <div className="info_row">
            <span>Estimated Delivery:</span>
            <strong>{deliveryDate}</strong>
          </div>
          <div className="info_row">
            <span>Shipping Courier:</span>
            <strong>Velocity Express Premium</strong>
          </div>
          <div className="info_row">
            <span>Transaction Status:</span>
            <strong style={{ color: "#388e3c" }}>PAID / SECURED</strong>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="success_action_btns_group">
          <Link href="/" className="continue_btn">
            🛒 Continue Shopping
          </Link>
          <button type="button" onClick={() => window.print()} className="print_btn">
            🖨️ Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
