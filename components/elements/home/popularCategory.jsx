import Image from "next/image";
import Link from "next/link";

const categoryItems = [
  {
    id: 1,
    path: "processor",
    name: "Processor",
    image: "/processor.png",
  },
  {
    id: 2,
    path: "ram",
    name: "RAM",
    image: "/ram.png",
  },
  {
    id: 7,
    path: "motherboard",
    name: "Motherboard",
    image: "/motherboard.png",
  },
  {
    id: 3,
    path: "graphics",
    name: "Graphics",
    image: "/graphics.png",
  },
  {
    id: 11,
    path: "harddisk",
    name: "Storage",
    image: "/harddisk.png",
  },
  {
    id: 9,
    path: "ssd",
    name: "SSD",
    image: "/ssd.png",
  },
  {
    id: 6,
    path: "monitor",
    name: "Monitor",
    image: "/monitor.png",
  },
  {
    id: 8,
    path: "mobile",
    name: "Mobile",
    image: "/mobile.png",
  },
  {
    id: 12,
    path: "laptop",
    name: "Laptop",
    image: "/laptop.png",
  },
  {
    id: 4,
    path: "cabinate",
    name: "Cabinate",
    image: "/cabinate.png",
  },
  {
    id: 5,
    path: "ups",
    name: "UPS",
    image: "/power.png",
  },
  {
    id: 10,
    path: "keyboard",
    name: "Keyboard",
    image: "/keyboard.png",
  },
  {
    id: 13,
    path: "headphone",
    name: "Headphone",
    image: "/headphone.png",
  },
];

export const PopularCategory = () => {
  return (
    <div className="app_categories_cover">
      <h3>Popular Categories</h3>
      <div className="app_category_list_items">
        <ul>
          {categoryItems.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <figure>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                  />
                </figure>
                <h4>{item.name}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
