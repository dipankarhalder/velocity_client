import "../styles/global.scss";
import { Nunito_Sans } from "next/font/google";
import { Providers } from "./providers";

const fontSans = Nunito_Sans({
  variable: "--font",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Velocity",
  description: "A e-commerce platform and website for computer peripherals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
