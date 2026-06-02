"use client";

import Link from "next/link";
import { Logo } from "@/components/elements/common/logo";
import { SearchForm } from "@/components/elements/common/searchForm";
import { LoginButton } from "@/components/elements/common/loginButton";
import { Shoping, Heart } from "@/components/icons";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";

export const MainHeader = () => {
  const cartCount = useCartStore((state) => state.getTotalItemsCount());
  const wishlistCount = useWishlistStore((state) => Object.keys(state.items).length);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="app_main_header" role="banner">
      <div className="app_container">
        <div className="app_inside_main_header">
          <div className="app_main_header_left">
            <Link href="/" aria-label="Homepage">
              <Logo />
            </Link>
            <SearchForm />
          </div>
          <nav className="app_main_header_right" aria-label="User navigation">
            <div className="app_build_pc_btn">
              <Link href="/build-pc" aria-label="Build your custom PC">
                Build Your PC
              </Link>
            </div>
            <div className="app_main_header_spcl_btns">
              <ul role="list">
                <li className="app_login_btn" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <LoginButton />
                  {user && (
                    <button
                      type="button"
                      onClick={logout}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#dc181f",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        padding: "4px 8px"
                      }}
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  )}
                </li>
                <li style={{ position: "relative" }}>
                  <Link href="/cart" aria-label="View shopping cart">
                    <Shoping aria-hidden="true" focusable="false" />
                    {cartCount > 0 && (
                      <span
                        className="header_badge_count"
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          background: "#ff9f00",
                          color: "#ffffff",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          fontSize: "11px",
                          fontWeight: "800",
                          lineHeight: "1",
                          textAlign: "center"
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li style={{ position: "relative" }}>
                  <Link href="#" aria-label="View wishlist">
                    <Heart aria-hidden="true" focusable="false" />
                    {wishlistCount > 0 && (
                      <span
                        className="header_badge_count"
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          background: "#fb641b",
                          color: "#ffffff",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          fontSize: "11px",
                          fontWeight: "800",
                          lineHeight: "1",
                          textAlign: "center"
                        }}
                      >
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
