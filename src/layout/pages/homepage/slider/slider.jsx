import React, { useState } from "react";
import "./slider.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";
function Slider() {
  const [data, setdata] = useState([]);
  return (
    <div className="Slider">
      <Swiper
        className="slider"
        effect="fade"
        loop={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="slide" style={{ backgroundColor: item.background }}>
              <div className="content">
                <p>{item.name}</p>
                <h1>{item.name}</h1>
                <p>{item.content}</p>
                <button>Shop Now</button>
              </div>
              <img src={item.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
