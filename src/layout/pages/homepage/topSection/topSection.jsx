import React, { useState } from "react";
import "./topSection.css";
import slider1 from "../../../../assets/slider1.png";
import slider2 from "../../../../assets/slider2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";
// import "swiper/css";
import "swiper/swiper.min.css"; // core Swiper
// import "swiper/css/navigation"; // Navigation module
// import "swiper/modules/pagination/pagination.scss";
// import "swiper/swiper.min.css";
// import "swiper/modules/pagination/pagination.min.css";

function TopSection({ banner }) {
  const [data, setdata] = useState([
    {
      name: "NuTuYu72",
      image: slider2,
      background: "#f7f553",
      content: (
        <>
          <span>
            Hello Everyone... our Site is proud to offer to you a variety
            pre-loved, and gently used items.
          </span>
          <br />
          <span>
            Pre-loved by us... but New To You. We have clothing, Shoes, Sandals
            for Women, Men and Children, One-Of-A-Kind Jewelry pieces, Evening
            Dresses, Fashion Accessories, and unique Home Accessories.
          </span>
          <br />
          <span>
            Yes, Most of the items are one of a kind, and when purchased they
            are gone!. You can purchase a variety of different items in any
            category. Each item will have a description to aid you in your
            purchase so that what you buy is exactly what you want. Enjoy!
          </span>
        </>
      ),
    },
  ]);
  return (
    <div className="TopSection">
      {data.map((item, index) => (
        <div className="slide" style={{ backgroundColor: item.background }}>
          <div className="content">
            <h1>{item.name}</h1>
            <p>{item.content}</p>
            <button>Shop Now</button>
          </div>
          <img src={banner} alt="" />
        </div>
      ))}
    </div>
  );
}

export default TopSection;
