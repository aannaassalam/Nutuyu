import React from "react";
import "./homepage.css";
import TopSection from "./topSection/topSection";
import DoubleImageText from "../homepage/doubleImageText/doubleImageText";
import Slider from "../homepage/slider/slider";
function Homepage() {
  return (
    <div className="Homepage">
      <TopSection />
      <DoubleImageText />
      <Slider />
    </div>
  );
}

export default Homepage;
