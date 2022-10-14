import React from "react";
import ProductCard from "../../components/productCard/productCard";
import "./homepage.css";
import TopSection from "./topSection/topSection";
import DoubleImageText from "../homepage/doubleImageText/doubleImageText";
import Slider from "../homepage/slider/slider";
function Homepage() {
  return (
    <div className="Homepage">
      <TopSection />
      <Slider heading="NEW ARRIVALS" />
      <Slider heading="Top wear" />
      <Slider heading="best sellers" />
      <Slider heading="bottoms" />
      <Slider heading="trending" />

      <DoubleImageText />
    </div>
  );
}

export default Homepage;
