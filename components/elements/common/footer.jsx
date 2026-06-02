"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Newsletter Subscribe Email:", email);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="app_main_footer" role="contentinfo" aria-label="Site Footer">
      {/* Top Value Propositions */}
      <section className="footer_propositions" aria-label="Our Commitments">
        <div className="app_container">
          <div className="propositions_wrapper">
            <div className="prop_item">
              <span className="prop_icon">⚡</span>
              <div className="prop_text">
                <h3>Fast & Free Delivery</h3>
                <p>Free delivery on all orders above ₹9,999</p>
              </div>
            </div>
            <div className="prop_item">
              <span className="prop_icon">🔄</span>
              <div className="prop_text">
                <h3>7-Day Easy Returns</h3>
                <p>No questions asked return and replacement policy</p>
              </div>
            </div>
            <div className="prop_item">
              <span className="prop_icon">🛡️</span>
              <div className="prop_text">
                <h3>100% Secure Payments</h3>
                <p>All major cards, UPI, and Netbanking supported</p>
              </div>
            </div>
            <div className="prop_item">
              <span className="prop_icon">📞</span>
              <div className="prop_text">
                <h3>24/7 Dedicated Support</h3>
                <p>Get instant assistance from our technical experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      <section className="footer_main_content" aria-label="Footer Directory">
        <div className="app_container">
          <div className="footer_grid">
            {/* Column 1: Brand Info */}
            <div className="footer_column brand_info">
              <Link href="/" aria-label="Velocity Homepage" className="footer_logo_link">
                <Logo />
              </Link>
              <p className="brand_desc">
                Velocity is your ultimate destination for high-performance custom PC parts, gaming accessories, and enthusiast rigs. Built by builders, for builders.
              </p>
            </div>

            {/* Column 2: Shop Categories */}
            <nav className="footer_column" aria-label="Shop Navigation">
              <h2>Shop Categories</h2>
              <ul role="list">
                <li>
                  <Link href="/processor">Processors</Link>
                </li>
                <li>
                  <Link href="/motherboard">Motherboards</Link>
                </li>
                <li>
                  <Link href="/build-pc">Custom PC Builder</Link>
                </li>
                <li>
                  <Link href="/">Best Selling Products</Link>
                </li>
                <li>
                  <Link href="/brands">Browse Brands</Link>
                </li>
              </ul>
            </nav>

            {/* Column 3: Customer Support */}
            <nav className="footer_column" aria-label="Support Navigation">
              <h2>Customer Support</h2>
              <ul role="list">
                <li>
                  <Link href="/cart">My Shopping Cart</Link>
                </li>
                <li>
                  <Link href="/checkout">Track Your Order</Link>
                </li>
                <li>
                  <Link href="#" onClick={(e) => e.preventDefault()}>Shipping & Handling</Link>
                </li>
                <li>
                  <Link href="#" onClick={(e) => e.preventDefault()}>Returns & Exchange Policy</Link>
                </li>
                <li>
                  <Link href="#" onClick={(e) => e.preventDefault()}>FAQs & Help Center</Link>
                </li>
              </ul>
            </nav>

            {/* Column 4: Newsletter */}
            <div className="footer_column newsletter_col">
              <h2>Stay Connected</h2>
              <p className="newsletter_desc">
                Subscribe to our newsletter to receive the latest updates, exclusive deals, and expert custom build tips.
              </p>
              <form onSubmit={handleSubscribe} className="newsletter_form">
                <div className="newsletter_input_wrapper">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    aria-label="Email address for newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <button type="submit" aria-label="Subscribe">
                    Subscribe
                  </button>
                </div>
                {subscribed && (
                  <p className="newsletter_success" role="alert">
                    🎉 Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Copyright & Payments */}
      <section className="footer_bottom" aria-label="Copyright and Legal">
        <div className="app_container">
          <div className="footer_bottom_wrapper">
            <p className="copyright_text">
              &copy; {new Date().getFullYear()} Velocity Inc. All rights reserved. Built with flat premium aesthetics.
            </p>
            <div className="payment_methods" aria-label="Accepted Payment Methods">
              {/* VISA */}
              <svg viewBox="0 0 48 32" width="40" height="26" aria-hidden="true" className="payment_icon">
                <rect width="48" height="32" fill="#1e2640" rx="4" />
                <path d="M10 10l3.5 12h2.5L13 10h-3zM28 10h-2.5l-3 8.5-1.5-7.5c-.2-.8-1-1-1.7-1H15v1l3 1.5 2.5 9h2.5l4-11h.5zM38 10h-2.2c-.7 0-1.2.4-1.5 1L30 22h2.5l.5-1.5h3l.3 1.5h2.2L38 10zm-4.3 8.5c.2-.7 1-3.5 1-3.5s.2-1 .3-1.5h.1s.1.5.2 1c.2.6.8 4 .8 4h-2.4z" fill="#ffffff" />
              </svg>
              {/* Mastercard */}
              <svg viewBox="0 0 48 32" width="40" height="26" aria-hidden="true" className="payment_icon">
                <rect width="48" height="32" fill="#1e2640" rx="4" />
                <circle cx="20" cy="16" r="8" fill="#eb001b" />
                <circle cx="28" cy="16" r="8" fill="#ff5f00" opacity="0.85" />
              </svg>
              {/* Rupay */}
              <svg viewBox="0 0 48 32" width="40" height="26" aria-hidden="true" className="payment_icon">
                <rect width="48" height="32" fill="#1e2640" rx="4" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="10" fontFamily="sans-serif">RuPay</text>
              </svg>
              {/* UPI */}
              <svg viewBox="0 0 48 32" width="40" height="26" aria-hidden="true" className="payment_icon">
                <rect width="48" height="32" fill="#1e2640" rx="4" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="11" fontFamily="sans-serif">UPI</text>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
