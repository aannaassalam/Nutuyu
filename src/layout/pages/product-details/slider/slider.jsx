import React, { useState, useEffect } from "react";
import "./slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/productCard/productCard";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useProducts } from "../../../hooks/useProducts";

function Slider({ product }) {
  console.log(product);
  const [data, setdata] = useState([]);
  const products = useProducts().products;
  let exist = null;
  // if (slider.subcategory)
  //   exist = products.find(
  //     (prod) => prod.subcategory.name === slider.subcategory
  //   );
  // else exist = products.find((prod) => prod.category === slider.category);
  // console.log(
  //   products.filter(
  //     (prod) =>
  //       prod?.subcategory?.type === product.subcategory.type &&
  //       prod?.subcategory?.name === product.subcategory.name
  //   )
  // );
  return (
    <div className="Slider">
      <h1>You May Also Like</h1>
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
        {product.subcategory?.type
          ? products
              .filter(
                (prod) =>
                  prod.subcategory?.type === product.subcategory?.type &&
                  prod.subcategory?.name === product.subcategory?.name
              )
              .slice(0, 10)
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={item} />
                </SwiperSlide>
              ))
          : products
              .filter(
                (prod) => prod.subcategory?.name === product.subcategory?.name
              )
              .slice(0, 10)
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={item} />
                </SwiperSlide>
              ))}
      </Swiper>
    </div>
  );
}

export default Slider;
