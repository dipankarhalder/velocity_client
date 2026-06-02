"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const LoginPopup = dynamic(
  () => import("@/components/elements/common/loginPopup").then((mod) => mod.LoginPopup),
  { ssr: false }
);

export function Providers({ children }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log = () => {};
      console.debug = () => {};
      console.info = () => {};
      console.warn = () => {};
    }
  }, []);

  return (
    <>
      {children}
      <LoginPopup />
    </>
  );
}
