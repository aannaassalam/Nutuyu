import React, { useState } from "react";
import "./topSection.css";
import slider1 from "../../../../assets/slider1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/swiper.min.css";
function TopSection({ about }) {
  const [data, setdata] = useState([
    {
      name: "NuTuYu72",
      image: about,
      background: "#a6c8c7",
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
            <h1>About Nutuyu !</h1>
            <p>{item.content}</p>
            <button>Explore</button>
          </div>
          <img src={about} alt="" />
        </div>
      ))}
    </div>
  );
}

export default TopSection;
