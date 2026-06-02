"use client";

import { useEffect } from "react";

export function Providers({ children }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log = () => {};
      console.debug = () => {};
      console.info = () => {};
      console.warn = () => {};
    }
  }, []);

  return <>{children}</>;
}
