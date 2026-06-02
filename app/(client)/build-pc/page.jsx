"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/elements/shared/addToCartButton";
import { truncateText } from "@/components/utils";
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
  Headphn,
  Mouse,
  Cooling,
  Print,
  Prints,
  Download,
  Pads,
  Plus,
  Edit,
  Delete,
  PowerSupply,
} from "@/components/icons";
import { Price } from "@/components/elements/shared/price";
import processInfo from "@/data/processor.json";
import motherboardInfo from "@/data/motherboard.json";
import { useBuildPcStore } from "@/store/useBuildPcStore";
import { useWishlistStore } from "@/store/useWishlistStore";

import insideBanner from "../../../public/banner1.jpg";
import mb1 from "../../../public/mbs1.jpg";
import mb2 from "../../../public/mb2.jpg";
import mb3 from "../../../public/mb3.jpg";
import mb4 from "../../../public/mb4.jpeg";
import mb5 from "../../../public/mb5.jpeg";
import mb6 from "../../../public/mb6.jpg";
import mb7 from "../../../public/mb7.jpg";
import mb8 from "../../../public/mb8.jpg";
import mb9 from "../../../public/mb9.jpeg";
import mb10 from "../../../public/mb10.jpg";
import mb11 from "../../../public/mb11.jpg";

const mainComponents = [
  {
    icon: Processor,
    label: "Processor",
    status: false,
  },
  {
    icon: Motherboard,
    label: "Motherboard",
    status: true,
  },
  {
    icon: Memory,
    label: "Memory",
    status: false,
  },
  {
    icon: Storage,
    label: "Storage",
    status: false,
  },
  {
    icon: Ssd,
    label: "SSD",
    status: false,
  },
  {
    icon: Storage,
    label: "Graphics Card",
    status: false,
  },
  {
    icon: Monitor,
    label: "Monitor",
    status: true,
  },
  {
    icon: Keyboard,
    label: "Keyboard",
    status: false,
  },
  {
    icon: Mouse,
    label: "Mouse",
    status: false,
  },
  {
    icon: Cooling,
    label: "Cooling System",
    status: false,
  },
  {
    icon: PowerSupply,
    label: "Power Supply",
    status: false,
  },
  {
    icon: Cabinate,
    label: "Cabinate",
    status: false,
  },
  {
    icon: Headphone,
    label: "Earphone",
    status: false,
  },
  {
    icon: Headphn,
    label: "Headphone",
    status: false,
  },
  {
    icon: Pads,
    label: "Mouse Pad",
    status: false,
  },
  {
    icon: Consoles,
    label: "Game Console",
    status: false,
  },
  {
    icon: Print,
    label: "Printer",
    status: false,
  },
];

const monitors = [
  {
    id: 1,
    name: "AMD Ryzen 7 5800X Processor",
    image: mb1,
    price: 41650,
    discount: 4,
  },
  {
    id: 2,
    name: "Crucial P3 Plus 1TB NVMe Gen4 Internal SSD",
    image: mb2,
    price: 14900,
    discount: 7,
  },
  {
    id: 3,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: mb3,
    price: 81250,
    discount: 22,
  },
  {
    id: 4,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb4,
    price: 141650,
    discount: 20,
  },
  {
    id: 5,
    name: "CyberPower UT2200E 2200VA UPS",
    image: mb5,
    price: 49990,
    discount: 18,
  },
  {
    id: 6,
    name: "ZOTAC RTX 5060 Solo 8GB GDDR7 Graphics Card",
    image: mb6,
    price: 38999,
    discount: 30,
  },
  {
    id: 7,
    name: "MSI RTX 5060 Inspire 2X OC 8GB GDDR7 Graphics Card",
    image: mb7,
    price: 41650,
    discount: 19,
    selected: true,
  },
  {
    id: 8,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: mb8,
    price: 9540,
    discount: 9,
  },
  {
    id: 9,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb9,
    price: 19790,
    discount: 17,
  },
  {
    id: 10,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb10,
    price: 19790,
    discount: 17,
  },
  {
    id: 11,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb11,
    price: 19790,
    discount: 17,
  },
];

const componentDataMap = {
  Processor: processInfo,
  Motherboard: motherboardInfo,
  Monitor: monitors,
};

const getDiscountedPrice = (price, discount = 0) => {
  return Math.round(price - (price * discount) / 100);
};

const formatPrice = (value) =>
  value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function BuildPC() {
  const [openPopBuild, setOpenPopBuild] = useState(null);
  
  const selectedComponents = useBuildPcStore((state) => state.selectedComponents);
  const selectComponent = useBuildPcStore((state) => state.selectComponent);
  const removeComponent = useBuildPcStore((state) => state.removeComponent);
  const totalPrice = useBuildPcStore((state) => state.getTotalPrice());

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);

  const buildPopupRef = useRef(null);

  useEffect(() => {
    if (!openPopBuild) return;

    const previousActiveElement = document.activeElement;

    // Focus the first select button when popup opens
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const timer = setTimeout(() => {
      const focusableElements = buildPopupRef.current?.querySelectorAll(focusableSelector);
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenPopBuild(null);
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = buildPopupRef.current?.querySelectorAll(focusableSelector);
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [openPopBuild]);

  const handleSelectItem = (item) => {
    selectComponent(openPopBuild, item);
    setOpenPopBuild(null);
  };

  const handleEdit = (label) => {
    setOpenPopBuild(label);
  };

  const handleDelete = (label) => {
    removeComponent(label);
    if (openPopBuild === label) {
      setOpenPopBuild(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!Object.keys(selectedComponents).length) return;

    let content = "PC Build Summary\n\n";
    Object.entries(selectedComponents).forEach(([label, item]) => {
      const discount = item.discount || 0;
      const finalPrice =
        discount > 0 ? item.price * (1 - discount / 100) : item.price;
      content += `${label}:\n`;
      content += `  ${item.name}\n`;
      content += `  Price: ₹ ${Math.round(finalPrice).toLocaleString()}\n\n`;
    });
    content += `Total Amount: ₹ ${totalPrice.toLocaleString()}\n`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pc-build-summary.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSendWhatsApp = () => {
    if (totalPrice <= 0) return;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Hello")}`;
    window.open(whatsappUrl, "_blank");
  };

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
      <nav className="app_bradecumb" aria-label="Breadcrumb">
        <ul>
          <li>
            <Link href="/" aria-label="Home">
              <Home className="app_brd_home" />
            </Link>
            <Larrow className="app_brd_arrow" aria-hidden="true" focusable="false" />
          </li>
          <li>Build Your PC</li>
        </ul>
      </nav>
      <div className="app_build_main_content_list">
        <div className="app_build_mian_area">
          <div className="app_category_build_item">
            <h5>Main Components</h5>
            <ul>
              {mainComponents.map(({ icon: Icon, label }) => {
                const selectedItem = selectedComponents[label];

                return (
                  <li key={label} role="listitem" aria-label={label}>
                    <div className="app_row_btns_itm">
                      <div className="app_left_side_build">
                        <Icon aria-hidden="true" focusable="false" />
                        <h6>{label}</h6>
                      </div>
                      {!selectedItem && (
                        <button
                          type="button"
                          className="app_open_pop"
                          onClick={() => setOpenPopBuild(label)}
                          aria-label={`Select ${label}`}
                        >
                          <Plus aria-hidden="true" focusable="false" />
                        </button>
                      )}
                    </div>
                    {selectedItem && (
                      <div className="app_selected_item">
                        <article>
                          <figure>
                            <Image
                              src={selectedItem.image}
                              alt={`Photo of ${selectedItem.name}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              style={{ objectFit: "contain" }}
                            />
                          </figure>
                          <div className="product_card_details">
                            <div className="product_card_left">
                              <h3>{truncateText(selectedItem.name, 40)}</h3>
                              <div className="app_price_and_btn">
                                <Price
                                  price={selectedItem.price}
                                  discount={selectedItem.discount}
                                />
                              </div>
                              <AddToCartButton
                                productName={selectedItem.name}
                                price={selectedItem.price}
                                discount={selectedItem.discount}
                                image={selectedItem.image}
                              />
                            </div>
                            <div className="app_action_btns" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <button
                                type="button"
                                className="wishlist_toggle_btn"
                                onClick={() => toggleWishlist({
                                  id: selectedItem.id,
                                  name: selectedItem.name,
                                  price: selectedItem.price,
                                  discount: selectedItem.discount,
                                  image: selectedItem.image,
                                  slug: selectedItem.slug || "processor"
                                })}
                                aria-label={isWishlisted(selectedItem.name) ? `Remove ${selectedItem.name} from wishlist` : `Add ${selectedItem.name} to wishlist`}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: "4px"
                                }}
                              >
                                <Heart
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    fill: isWishlisted(selectedItem.name) ? "#fb641b" : "none",
                                    stroke: isWishlisted(selectedItem.name) ? "#fb641b" : "#718096",
                                    strokeWidth: "2px",
                                    transition: "all 0.2s"
                                  }}
                                  aria-hidden="true"
                                  focusable="false"
                                />
                              </button>
                              <button
                                type="button"
                                className="edit_btn"
                                onClick={() => handleEdit(label)}
                                aria-label={`Edit ${label}`}
                              >
                                <Edit aria-hidden="true" focusable="false" />
                              </button>
                              <button
                                type="button"
                                className="delete_btn"
                                onClick={() => handleDelete(label)}
                                aria-label={`Delete ${label}`}
                              >
                                <Delete aria-hidden="true" focusable="false" />
                              </button>
                            </div>
                          </div>
                        </article>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="app_price_calculation">
          <div className="app_inside_cal">
            <div className="app_right_side_price">
              <h6>Selected Items Price</h6>
              {Object.entries(selectedComponents).length > 0 ? (
                <ul>
                  {Object.entries(selectedComponents).map(([label, item]) => {
                    const hasDiscount = item.discount > 0;
                    const finalPrice = hasDiscount
                      ? item.price * (1 - item.discount / 100)
                      : item.price;

                    return (
                      <li key={label}>
                        <p>{label}</p>
                        <p className="app_price_col_data">
                          {formatPrice(finalPrice)}/-
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span className="no_select">No item select</span>
              )}
            </div>
            <div className="app_total_price">
              <h3>Total Amount :</h3>
              <p className="total_price">
                ₹ {totalPrice && totalPrice > 0 && totalPrice.toLocaleString()}
                /-
              </p>
            </div>
          </div>
          <div className="download_print">
            <button
              className="download_btn"
              onClick={handleDownload}
              disabled={totalPrice <= 0}
            >
              <Download />
              Download
            </button>
            <button
              className="print_btn"
              onClick={handlePrint}
              disabled={totalPrice <= 0}
            >
              <Prints />
              Print
            </button>
            <button
              className="whatsapp_btn"
              onClick={handleSendWhatsApp}
              disabled={totalPrice <= 0}
            >
              Send WhatsApp
            </button>
          </div>
        </div>
      </div>
      {openPopBuild && (
        <div
          className="app_build_pc_popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="build-pop-title"
          ref={buildPopupRef}
        >
          <span
            className="app_span_overlay"
            onClick={() => setOpenPopBuild(null)}
            tabIndex={-1}
            aria-hidden="true"
          ></span>
          <div className="app_pop_build_inside">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h5 id="build-pop-title" style={{ margin: 0 }}>
                {openPopBuild} Items
              </h5>
              <button
                type="button"
                onClick={() => setOpenPopBuild(null)}
                aria-label={`Close ${openPopBuild} Dialog`}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "0 10px",
                }}
              >
                &times;
              </button>
            </div>
            <div className="app_list_items_pop">
              {componentDataMap[openPopBuild]?.length ? (
                <ul>
                  {componentDataMap[openPopBuild]?.map((item) => (
                    <li className="app_item_product_card" key={item.id}>
                      <article>
                        <figure>
                          <Image
                            src={item.image}
                            alt={`Photo of ${item.name}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </figure>
                        <div className="product_card_details">
                          <div className="product_card_left">
                            <h3>{truncateText(item.name, 40)}</h3>
                            <div className="app_price_and_btn">
                              <Price
                                price={item.price}
                                discount={item.discount}
                              />
                            </div>
                          </div>
                          <div className="product_card_btn">
                            <div className="product_stock">
                              <span>Status:</span>
                              <p>In Stock</p>
                            </div>
                            <button
                              type="button"
                              className={`products_select_btn ${
                                selectedComponents[openPopBuild]?.id === item.id
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSelectItem(item)}
                              aria-label={
                                selectedComponents[openPopBuild]?.id === item.id
                                  ? `Selected ${item.name}`
                                  : `Select ${item.name}`
                              }
                            >
                              <span>
                                {selectedComponents[openPopBuild]?.id ===
                                item.id
                                  ? "Selected"
                                  : "Select"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no_items_avl">
                  No products are available in this categories.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
