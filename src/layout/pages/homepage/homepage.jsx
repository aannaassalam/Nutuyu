import React, { useState, useEffect } from "react";
import "./homepage.css";
import TopSection from "./topSection/topSection";
import DoubleImageText from "../homepage/doubleImageText/doubleImageText";
import Slider from "../homepage/slider/slider";
import CategorySec from "./category-sec/category-sec";
import FabricSec from "./Fabric-sec/fabric-sec";
import Toaster from "../../components/toaster/toaster";
import about from "../../../assets/about.png";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import AnimatedSlider from "./animatedSlider/animatedSlider";
function Homepage() {
  const [banner, setBanner] = useState(null);
  const [sliders, setSliders] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    onSnapshot(collection(db, "settings"), (snapshot) => {
      setSliders((prev) => [
        snapshot.docs[0].data().slider1,
        snapshot.docs[0].data().slider2,
        snapshot.docs[0].data().slider3,
        snapshot.docs[0].data().slider4,
      ]);
      setBanner(snapshot.docs[0].data().banner);
    });
  }, []);

  return (
    <div className="Homepage">
      {/* <Toaster message="hii" positive={true} /> */}
      <AnimatedSlider />
      <Slider slider={sliders[0]} />
      <TopSection about={about} />
      <CategorySec />
      <Slider slider={sliders[1]} />
      <Slider slider={sliders[2]} />
      <FabricSec />
      <Slider slider={sliders[3]} />
      {/* <DoubleImageText /> */}
    </div>
  );
}

export default Homepage;
