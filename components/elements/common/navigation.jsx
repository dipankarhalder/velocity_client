import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Darrow,
  Percent,
  Processor,
  Motherboard,
  Memory,
  Monitor,
  Mobiles,
  Keyboard,
  Cabinate,
  Headphone,
  Consoles,
} from "@/components/icons";

const categories = [
  { icon: Processor, label: "Processor", path: "processor", },
  { icon: Motherboard, label: "Motherboard", path: "motherboard", },
  { icon: Memory, label: "Memory", path: "memory" },
  { icon: Monitor, label: "Monitor", path: "monitor", },
  { icon: Mobiles, label: "Mobile", path: "mobile" },
  { icon: Keyboard, label: "Keyboard", path: "keyboard" },
  { icon: Cabinate, label: "Cabinate", path: "cabinate" },
  { icon: Headphone, label: "Headphone", path: "headphone" },
  { icon: Consoles, label: "Console", path: "console" },
];

const categoryGaming = [
  {
    id: 1,
    path: "keyboard",
    name: "Gaming Keyboard",
    image: "/keyboard.png",
  },
  {
    id: 2,
    path: "ram",
    name: "Gaming Mouse",
    image: "/gamingmouse.png",
  },
  {
    id: 7,
    path: "headphone",
    name: "Gaming Headset",
    image: "/headphone.png",
  },
  {
    id: 3,
    path: "graphics",
    name: "Gaming Mousepad",
    image: "/gamingpad.png",
  },
  {
    id: 11,
    path: "harddisk",
    name: "Gaming Chair",
    image: "/gamingchair.png",
  },
  {
    id: 6,
    path: "monitor",
    name: "Gaming Console",
    image: "/gamingconsole.png",
  },
  {
    id: 8,
    path: "mobile",
    name: "Racing Wheel",
    image: "/gamingwheel.png",
  },
];

export const Navigation = () => {
  return (
    <nav className="app_nav_wrapper" aria-label="Main navigation">
      <div className="app_nav_items">
        <div className="app_categry_navigation">
          <button
            className="app_nav_category"
            type="button"
            aria-label="Browse categories"
            aria-haspopup="true"
            aria-expanded="false"
            tabIndex={0}
          >
            <Menu aria-hidden="true" focusable="false" />
            <p>Categories</p>
          </button>
          <div
            className="app_nav_child_section"
            role="menu"
            aria-label="Categories"
          >
            <ul>
              {categories.map(({ icon: Icon, path, label }) => (
                <li key={label}>
                  <Link href={path} aria-label={label}>
                    <Icon aria-hidden="true" focusable="false" />
                    <p>{label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="app_nav_links">
          <li>
            <button
              type="button"
              className="app_nav_gaming"
              aria-haspopup="true"
              aria-expanded="false"
              aria-label="Gaming menu"
            >
              <span>Gaming</span>
              <Darrow aria-hidden="true" focusable="false" />
            </button>
            <div className="app_dropdown_menu">
              <ul>
                {categoryGaming.map((item) => (
                  <li key={item.id}>
                    <Link href="/">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "contain" }}
                      />
                      <p>{item.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <Link href="/laptop" className="app_nav_gaming">
              <span>Laptops</span>
            </Link>
          </li>
          <li>
            <Link href="/mobile" className="app_nav_gaming">
              <span>Mobiles</span>
            </Link>
          </li>
          <li>
            <Link href="/brands" className="app_nav_gaming">
              <span>Brands</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="app_nav_gaming"
              aria-haspopup="true"
              aria-expanded="false"
              aria-label="Accessories menu"
            >
              <span>Accessories</span>
              <Darrow aria-hidden="true" focusable="false" />
            </button>
          </li>
        </ul>
      </div>
      <div className="app_nav_offers">
        <Link href="/" aria-label="View special offers">
          <Percent aria-hidden="true" focusable="false" />
          <p>Special Offers</p>
        </Link>
      </div>
    </nav>
  );
};
