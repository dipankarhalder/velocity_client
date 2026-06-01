"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
import { Larrow, Rarrow } from "@/components/icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import mainImg1 from "@/public/main_banner_1.jpg";
import mainImg2 from "@/public/main_banner_2.jpg";
import mainImg3 from "@/public/main_banner_3.jpg";
import mainImg4 from "@/public/main_banner_4.jpg";
import Image from "next/image";

export const MainSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="app_main_slider_banner">
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        className="app_main_prev"
        aria-label="Previous slide"
      >
        <Rarrow aria-hidden="true" focusable="false" />
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="app_main_next"
        aria-label="Next slide"
      >
        <Larrow aria-hidden="true" focusable="false" />
      </button>
      <Swiper
        modules={[Navigation, A11y, Autoplay, Pagination]}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        aria-roledescription="carousel"
      >
        <SwiperSlide>
          <div className="app_main_slider_banner">
            <Image src={mainImg1} alt="Main promotional banner" priority />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="app_main_slider_banner">
            <Image src={mainImg2} alt="Main promotional banner" priority />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="app_main_slider_banner">
            <Image src={mainImg3} alt="Main promotional banner" priority />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="app_main_slider_banner">
            <Image src={mainImg4} alt="Main promotional banner" priority />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
