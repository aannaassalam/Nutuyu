import React, { useState, useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
import "./homepage.css";
import TopSection from "./topSection/topSection";
import DoubleImageText from "../homepage/doubleImageText/doubleImageText";
import Slider from "../homepage/slider/slider";
import Footer from "../../components/footer/footer";
import CategorySec from "./category-sec/category-sec";
import FabricSec from "./Fabric-sec/fabric-sec";
import { useProducts } from "../../hooks/useProducts";
// import {   } from "modern-toaster"

import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
function Homepage() {
  const [banner, setBanner] = useState(null);
  const [sliders, setSliders] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    // const collec = collection(db, "settings");
    // onSnapshot(collec, (snapshot) => {
    //   var obj1 = snapshot.docs[0].data().slider1;
    //   var obj2 = snapshot.docs[0].data().slider2;
    //   var obj3 = snapshot.docs[0].data().slider3;
    //   var obj4 = snapshot.docs[0].data().slider4;
    //   setbanner(snapshot.docs[0].data().banner);
    //   setslider1({ ...slider1, ...obj1 });
    //   setslider2({ ...slider2, ...obj2 });
    //   setslider3({ ...slider3, ...obj3 });
    //   setslider4({ ...slider4, ...obj4 });
    //   if (!loading) setproducts(p.products);
    //   setloading(false);
    // });
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
      {/* <Toaster */}
      <TopSection banner={banner} />
      <Slider slider={sliders[0]} />
      <CategorySec />
      <Slider slider={sliders[1]} />
      <Slider slider={sliders[2]} />
      <FabricSec />
      <Slider slider={sliders[3]} />
      <DoubleImageText />
    </div>
  );
}

export default Homepage;
