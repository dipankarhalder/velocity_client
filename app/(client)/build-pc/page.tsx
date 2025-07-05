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
  Ssd,
  Consoles,
  SuccssTick,
  Headphn,
  Mouse,
  Cooling,
  Print,
  Pads,
  PowerSupply,
} from "@/components/icons";
import insideBanner from "../../../public/banner1.jpg";

const mainComponents = [
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
    icon: Storage,
    label: "Storage",
  },
  {
    icon: Ssd,
    label: "SSD",
  },
  {
    icon: Storage,
    label: "Graphics Card",
  },
  {
    icon: PowerSupply,
    label: "Power Supply",
  },
  {
    icon: Cabinate,
    label: "Cabinate",
  },
];

const displayComponents = [
  {
    icon: Monitor,
    label: "Monitor",
  },
  {
    icon: Keyboard,
    label: "Keyboard",
  },
  {
    icon: Mouse,
    label: "Mouse",
  },
  {
    icon: Cooling,
    label: "Cooling System",
  },
];

const accessoriesComponents = [
  {
    icon: Headphone,
    label: "Earphone",
  },
  {
    icon: Headphn,
    label: "Headphone",
  },
  {
    icon: Pads,
    label: "Mouse Pad",
  },
  {
    icon: Consoles,
    label: "Game Console",
  },
  {
    icon: Print,
    label: "Printer",
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
        <h5>Main Components</h5>
        <ul>
          {mainComponents.map(({ icon: Icon, label }) => (
            <li key={label} role="listitem" aria-label={label}>
              <Icon aria-hidden="true" focusable="false" />
              <h6>{label}</h6>
              <div className="app_status_update">
                <SuccssTick />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="app_category_build_item">
        <h5>Other Components</h5>
        <ul>
          {displayComponents.map(({ icon: Icon, label }) => (
            <li key={label} role="listitem" aria-label={label}>
              <Icon aria-hidden="true" focusable="false" />
              <h6>{label}</h6>
              <div className="app_status_update">
                <SuccssTick />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="app_category_build_item">
        <h5>Accessories</h5>
        <ul>
          {accessoriesComponents.map(({ icon: Icon, label }) => (
            <li key={label} role="listitem" aria-label={label}>
              <Icon aria-hidden="true" focusable="false" />
              <h6>{label}</h6>
              <div className="app_status_update">
                <SuccssTick />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
