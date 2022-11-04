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

function TopSection() {
  const [data, setdata] = useState([
    // {
    //   name: "Anna's Picks",
    //   image: slider1,
    //   background: "#a0b997",
    //   content:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, obcaecati perferendis assumenda dignissimos dolor saepe quam tempora distinctio eaque corrupti beatae, aliquam eligendi accusamus dicta.",
    // },
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
    // {
    //   name: "Rino Choices",
    //   image: slider1,
    //   background: "#f7f",
    //   content:
    //     "Embrace the energizing new shades of autumn with Leon & Harper's new collection, explore this Parisian label’s timeless and effortlessly cool silhouettes.",
    // },
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
        allowTouchMove={false}
        // autoplay={{ delay: 3000 }}
        // pagination={{ clickable: true }}
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
