import Link from "next/link";
import { Location, Call, File, Map, Affiliate } from "@/components/icons";

export const TopHeader = () => {
  return (
    <div
      className="app_outside_content ap_full_bg"
      role="complementary"
      aria-label="Top information bar"
    >
      <div className="app_container">
        <div className="app_inside_content topheader_divide">
          <address
            className="app_top_header_left"
            aria-label="Company contact information"
          >
            <ul>
              <li>
                <Location aria-hidden="true" focusable="false" />
                <p>124/A, R. S. Mallick Road, Jadavpur, Kolkata - 700084</p>
              </li>
              <li>
                <em>Call us:</em>
                <a href="tel:03345600550">033-4560-0550</a>
              </li>
              <li>
                <em>Email:</em>
                <a href="mailto:information@velocity.com">
                  information@velocity.com
                </a>
              </li>
            </ul>
          </address>
          <nav
            className="app_top_header_right"
            aria-label="Top header navigation"
          >
            <ul>
              <li>
                <Link href="/">
                  <File aria-hidden="true" focusable="false" />
                  <em>Blogs</em>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Call aria-hidden="true" focusable="false" />
                  <em>Contact Us</em>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Map aria-hidden="true" focusable="false" />
                  <em>Store Locator</em>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Affiliate aria-hidden="true" focusable="false" />
                  <em>Affiliate</em>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
