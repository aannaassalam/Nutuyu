import React, { useState } from "react";
import "./topSection.css";
import Slider from "react-slick";
import slider1 from "../../../../assets/slider1.png";
import slider2 from "../../../../assets/slider2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";
function TopSection() {
  const [data, setdata] = useState([
    {
      name: "Anna's Picks",
      image: slider1,
      background: "#a0b997",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, obcaecati perferendis assumenda dignissimos dolor saepe quam tempora distinctio eaque corrupti beatae, aliquam eligendi accusamus dicta.",
    },
    {
      name: "Rino And Pelle",
      image: slider2,
      background: "#f7f553",
      content:
        "Embrace the energizing new shades of autumn with Leon & Harper's new collection, explore this Parisian label’s timeless and effortlessly cool silhouettes.",
    },
    {
      name: "Rino Choices",
      image: slider1,
      background: "#f7f",
      content:
        "Embrace the energizing new shades of autumn with Leon & Harper's new collection, explore this Parisian label’s timeless and effortlessly cool silhouettes.",
    },
  ]);
  return (
    <div className="TopSection">
      <Swiper
        className="slider"
        effect="fade"
        loop={true}
        modules={[EffectFade, Autoplay]}
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

export default TopSection;
