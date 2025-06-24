import Link from "next/link";
import { Menu, Darrow, Percent } from "@/components/icons";

const navItems = [
  { label: "Gaming", hasSubmenu: true },
  { label: "Components", hasSubmenu: true },
  { label: "Brands", hasSubmenu: true },
  { label: "Accessories", hasSubmenu: true },
  { label: "Monitors", hasSubmenu: true },
  { label: "Merchandise", hasSubmenu: false },
];

export const Navigation = () => {
  return (
    <div className="app_nav_wrapper">
      <div className="app_nav_items">
        <button
          className="app_nav_category"
          type="button"
          aria-label="Browse categories"
        >
          <Menu aria-hidden="true" focusable="false" />
          <p>Find Categories</p>
        </button>
        <ul className="app_nav_links">
          {navItems.map(({ label, hasSubmenu }) => (
            <li key={label}>
              <button
                type="button"
                aria-label={hasSubmenu ? `${label} submenu` : label}
                {...(hasSubmenu && {
                  "aria-haspopup": "true",
                  "aria-expanded": "false",
                })}
              >
                <span>{label}</span>
                {hasSubmenu && <Darrow aria-hidden="true" focusable="false" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="app_nav_offers">
        <Link href="/" aria-label="View special offers">
          <Percent aria-hidden="true" focusable="false" />
          <p>Special Offers</p>
        </Link>
      </div>
    </div>
  );
};
