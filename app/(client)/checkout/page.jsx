import CheckoutForm from "@/components/elements/checkout/checkoutForm";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://velocity-store.com";

export const metadata = {
  title: "Secure Checkout | Velocity Store",
  description: "Complete your purchase securely. Fill in your delivery details and choose your preferred payment option.",
  alternates: {
    canonical: `${BASE_URL}/checkout`,
  },
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
