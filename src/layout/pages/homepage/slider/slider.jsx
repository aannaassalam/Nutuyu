import React, { useState, useEffect } from "react";
import "./slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/productCard/productCard";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useProducts } from "../../../hooks/useProducts";

function Slider({ slider = { name: "", category: "" } }) {
  console.log(slider);
  const [data, setdata] = useState([]);
  const products = useProducts().products;
  let exist = null;
  if (slider.subcategory)
    exist = products.find(
      (prod) => prod.subcategory.name === slider.subcategory
    );
  else exist = products.find((prod) => prod.category === slider.category);

  return (
    <>
      {exist ? (
        <div className="Slider">
          <h1>{slider.name}</h1>
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
            {slider.subcategory
              ? products
                  .filter(
                    (product) =>
                      product.category === slider.category &&
                      product.subcategory.name === slider.subcategory
                  )
                  .map((item, index) => (
                    <SwiperSlide key={index}>
                      <ProductCard product={item} />
                    </SwiperSlide>
                  ))
              : products
                  .filter((product) => product.category === slider.category)
                  .map((item, index) => (
                    <SwiperSlide key={index}>
                      <ProductCard product={item} />
                    </SwiperSlide>
                  ))}
          </Swiper>
          <button
            onClick={() => {
              window.location.pathname = slider.subcategory
                ? `/products/${slider.category}/${slider.subcategory}`
                : `/products/${slider.category}`;
            }}
          >
            View All {slider.name}
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Slider;
