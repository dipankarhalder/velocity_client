import Image from "next/image";
import {
  Home,
  Larrow,
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
import insideBanner from "../../../public/banner.avif";

const categories = [
  {
    icon: Processor,
    label: "Processor",
  },
  {
    icon: Motherboard,
    label: "Motherboard",
  },
  {
    icon: Memory,
    label: "Memory",
  },
  {
    icon: Monitor,
    label: "Monitor",
  },
  {
    icon: Storage,
    label: "Storage",
  },
  {
    icon: Keyboard,
    label: "Keyboard",
  },
  {
    icon: Cabinate,
    label: "Cabinate",
  },
  {
    icon: Headphone,
    label: "Headphone",
  },
  {
    icon: Consoles,
    label: "Console",
  },
];

export default function BuildPC() {
  return (
    <>
      <div className="app_inside_banner">
        <Image
          src={insideBanner}
          alt="inside banner"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="app_bradecumb">
        <ul>
          <li>
            <Home className="app_brd_home" />
            <Larrow className="app_brd_arrow" />
          </li>
          <li>Build Your PC</li>
        </ul>
      </div>
      <div className="app_category_build_item">
        <ul>
          {categories.map(({ icon: Icon, label }) => (
            <li key={label} role="listitem" aria-label={label}>
              <Icon aria-hidden="true" focusable="false" />
              <h6>{label}</h6>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
