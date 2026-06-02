import { CartDetails } from "@/components/elements/cart/cartDetails";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://velocity-store.com";

export const metadata = {
  title: "Shopping Cart - Velocity",
  description: "Review and manage the products in your shopping cart on Velocity.",
  alternates: {
    canonical: `${BASE_URL}/cart`,
  },
};

export default function CartPage() {
  return <CartDetails />;
}
