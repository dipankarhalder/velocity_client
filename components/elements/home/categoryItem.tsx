import Link from "next/link";

import {
  Processor,
  Motherboard,
  Memory,
  Monitor,
  Storage,
  Keyboard,
  Cabinate,
  Headphone,
  Consoles,
} from "@/components/icons";

const categories = [
  { icon: Processor, label: "Processor", discount: "up to 30% off" },
  { icon: Motherboard, label: "Motherboard", discount: "up to 32% off" },
  { icon: Memory, label: "Memory", discount: "up to 23% off" },
  { icon: Monitor, label: "Monitor", discount: "up to 45% off" },
  { icon: Storage, label: "Storage", discount: "up to 31% off" },
  { icon: Keyboard, label: "Keyboard", discount: "up to 16% off" },
  { icon: Cabinate, label: "Cabinate", discount: "up to 22% off" },
  { icon: Headphone, label: "Headphone", discount: "up to 28% off" },
  { icon: Consoles, label: "Console", discount: "up to 38% off" },
];

export const CategoryItem = () => {
  return (
    <div className="app_categories_items">
      <ul>
        {categories.map(({ icon: Icon, label }) => (
          <li key={label} role="listitem" aria-label={label}>
            <Link href="/">
              <Icon aria-hidden="true" focusable="false" />
              <div className="app_category_text">
                <h6>{label}</h6>
                <p>up to 30% off</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
