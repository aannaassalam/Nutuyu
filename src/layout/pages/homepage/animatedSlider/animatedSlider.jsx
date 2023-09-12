import React, { useState } from "react";
import "./animatedSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/swiper.min.css"; // core Swiper
import "swiper/css/navigation"; // Navigation module
import "swiper/swiper.min.css";
// import "swiper/modules/pagination/pagination.scss";
// import "swiper/modules/pagination/pagination.min.css";
import image1 from "../../../../assets/Black-tee.png";
import image2 from "../../../../assets/black-tee2.png";
import image3 from "../../../../assets/half-sleeve-male-.png";
import elipse from "../../../../assets/Ellipse 1.png";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
function AnimatedSlider() {
  const [data, setdata] = useState([
    {
      name: "Nike Air Max System",
      image: image1,
      background: "#96B6C5",
      content:
        "Looks Max, feels Max. The Air Max SYSTM brings back everything you love about your favourite '80s vibes (without the parachute trousers.",
    },
    {
      name: "Puma Sleeve Tshirt",
      image: image2,
      background: "#dbebfa",
      content:
        "Looks Max, feels Max. The Air Max SYSTM brings back everything you love about your favourite '80s vibes (without the parachute trousers.",
    },
    {
      name: "Nike Shorts For Men",
      image: image3,
      background: "#a7b3b7",
      content:
        "Looks Max, feels Max. The Air Max SYSTM brings back everything you love about your favourite '80s vibes (without the parachute trousers.",
    },
  ]);

  return (
    <div className="AnimatedSlider">
      <Swiper
        className="slider"
        effect="fade"
        loop={true}
        modules={[EffectFade, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        allowTouchMove={false}
        autoplay={{ delay: 8500 }}
        // pagination={{ clickable: true }}
      >
        {/* <Slider {...settings}> */}
        {data.map((item, index) => (
          <SwiperSlide>
            <div className="slide" style={{ backgroundColor: item.background }}>
              <div className="content">
                <h1>{item.name}</h1>
                <p>{item.content}</p>
                <button>Shop Now</button>
              </div>
              <img className="bannerImage" src={item.image} alt="" />
              {/* <img src={elipse} className="elipse" alt="" /> */}
              <div className="elipse"></div>
            </div>
          </SwiperSlide>
        ))}
        {/* </Slider> */}
      </Swiper>
    </div>
  );
}

export default AnimatedSlider;
