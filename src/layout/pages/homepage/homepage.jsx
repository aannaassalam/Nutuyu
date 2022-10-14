import React from "react";
import ProductCard from "../../components/productCard/productCard";
import "./homepage.css";
import TopSection from "./topSection/topSection";
import DoubleImageText from "../homepage/doubleImageText/doubleImageText";
import Slider from "../homepage/slider/slider";
import Footer from "../../components/footer/footer";
import CategorySec from "./category-sec/category-sec";
import FabricSec from "./Fabric-sec/fabric-sec";
function Homepage() {
  return (
    <div className="Homepage">
      <TopSection />
      <Slider heading="NEW ARRIVALS" />
      <CategorySec />
      <Slider heading="Top wear" />
      <Slider heading="best sellers" />
      <FabricSec />
      <Slider heading="bottoms" />
      <Slider heading="trending" />
      <DoubleImageText />
    </div>
  );
}

export default Homepage;
