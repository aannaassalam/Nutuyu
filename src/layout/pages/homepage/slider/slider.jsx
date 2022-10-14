import React, { useState } from "react";
import "./slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/productCard/productCard";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";
function Slider({ heading }) {
  const [data, setdata] = useState([1, 2, 3, 4, 4, 4, 4]);
  return (
    <div className="Slider">
      <h1>{heading}</h1>
      <Swiper
        className="slider"
        loop={true}
        navigation
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard a={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button>View All {heading}</button>
    </div>
  );
}

export default Slider;
