"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Account } from "@/components/icons";

export const LoginButton = () => {
  const openLogin = useAuthStore((state) => state.openLogin);
  const user = useAuthStore((state) => state.user);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <button
      aria-label="Login to your account"
      type="button"
      onClick={openLogin}
    >
      <Account aria-hidden="true" focusable="false" />
      <div className="app_main_header_login_text">
        <p>{isMounted && user ? user.name : "Login"}</p>
        <em>Account</em>
      </div>
    </button>
  );
};
