import products from "@/data/products.json";
import processInfo from "@/data/processor.json";
import motherboardInfo from "@/data/motherboard.json";
import { ProductCard } from "@/components/elements/shared/productCard";

const PRODUCT_CONFIG = {
  processor: { title: "Processors", data: processInfo },
  motherboard: { title: "Motherboards", data: motherboardInfo },
  memory: { title: "Memories" },
  gpu: { title: "Graphics" },
  monitor: { title: "Monitors" },
  mobile: { title: "Mobiles" },
  laptop: { title: "Laptops" },
  keyboard: { title: "Keyboards" },
  cabinate: { title: "Cabinates" },
  headphone: { title: "Headphones" },
  console: { title: "Consoles" },
  default: { title: "Best Selling Products", data: products },
};

export default function Products({ slug }) {
  const { title, data = [] } = PRODUCT_CONFIG[slug] ?? PRODUCT_CONFIG.default;

  return (
    <div className="app_main_product_list_container">
      <h2 id="bestsellers-heading" className="app_heading_info">
        {title}
      </h2>
      <div className="app_product_list_wrapper">
        {data.length > 0 ? (
          data.map((item) => <ProductCard key={item.id} {...item} />)
        ) : (
          <p className="app_empty_state">
            No products are available in this category.
          </p>
        )}
      </div>
    </div>
  );
}
