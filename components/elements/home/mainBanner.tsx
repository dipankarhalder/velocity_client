import Image from "next/image";
import sideImg from "@/public/side_add.jpg";
import mainImg from "@/public/main_banner_1.jpg";
import rightSideImg1 from "@/public/right_side_bg_1.jpg";
import rightSideImg2 from "@/public/right_side_bg_2.jpg";

export const MainBanner = () => {
  return (
    <div
      className="app_main_banner"
      role="region"
      aria-label="Homepage promotional banners"
    >
      <aside className="app_left_side_banner">
        <Image src={sideImg} alt="Promotional offer on the left" priority />
      </aside>
      <div className="app_main_slider_banner">
        <Image src={mainImg} alt="Main promotional banner" priority />
      </div>
      <aside
        className="app_right_side_banner"
        aria-label="Additional promotions"
      >
        <div className="app_right_adv">
          <Image src={rightSideImg1} alt="Right promotional banner 1" />
        </div>
        <div className="app_right_adv">
          <Image src={rightSideImg2} alt="Right promotional banner 2" />
        </div>
      </aside>
    </div>
  );
};
