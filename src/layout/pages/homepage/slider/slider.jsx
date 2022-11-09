import React, { useState, useEffect } from "react";
import "./slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/productCard/productCard";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

function Slider({ slider, heading, products }) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (slider.subcategory === undefined) {
      const p = products.filter(
        (product) => product.category === slider.category
      );
      setdata(p);
    } else {
      const p = products
        ?.filter((product) => product.category === slider.category)
        .filter((product) => product.subcategory.name === slider.subcategory);
      setdata(p);
    }
  }, []);
  console.log(data);

  return (
    <>
      {data?.length > 0 ? (
        <div className="Slider">
          <h1>{heading}</h1>
          <Swiper
            className="slider"
            // loop={true}
            navigation
            modules={[Autoplay, Navigation]}
            spaceBetween={0}
            slidesPerView={4}
            // autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
              },
              480: {
                slidesPerView: 2.5,
              },
              670: {
                slidesPerView: 3,
              },
              1080: {
                slidesPerView: 4,
              },
            }}
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {slider.subcategory ? (
            <button
              onClick={() => {
                window.location.pathname = `/products/${slider.category}/${slider.subcategory}`;
              }}
            >
              View All {heading}
            </button>
          ) : (
            <button
              onClick={() => {
                window.location.pathname = `/products/${slider.category}`;
              }}
            >
              View All {heading}
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Slider;
