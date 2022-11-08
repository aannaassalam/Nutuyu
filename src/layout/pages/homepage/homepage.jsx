import React, { useState, useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";
import "./homepage.css";
import TopSection from "./topSection/topSection";
import DoubleImageText from "../homepage/doubleImageText/doubleImageText";
import Slider from "../homepage/slider/slider";
import Footer from "../../components/footer/footer";
import CategorySec from "./category-sec/category-sec";
import FabricSec from "./Fabric-sec/fabric-sec";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
function Homepage() {
  const [banner, setbanner] = useState(null);
  const [slider1, setslider1] = useState({ products: [] });
  const [slider2, setslider2] = useState({ products: [] });
  const [slider3, setslider3] = useState({ products: [] });
  const [slider4, setslider4] = useState({ products: [] });

  const [state, setstate] = useState({
    loading: true,
    products: [],
  });

  const db = getFirestore();
  useEffect(() => {
    const collec = collection(db, "settings");
    onSnapshot(collec, (snapshot) => {
      // console.log(snapshot.docs[0].data());
      var obj1 = snapshot.docs[0].data().slider1;
      var obj2 = snapshot.docs[0].data().slider2;
      var obj3 = snapshot.docs[0].data().slider3;
      var obj4 = snapshot.docs[0].data().slider4;
      setbanner(snapshot.docs[0].data().banner);
      setslider1({ ...slider1, ...obj1 });
      setslider2({ ...slider2, ...obj2 });
      setslider3({ ...slider3, ...obj3 });
      setslider4({ ...slider4, ...obj4 });
    });
    const prod = collection(db, "products");
    onSnapshot(prod, (snap) => {
      var arr = [];
      snap.docs.forEach((doc) => {
        arr.push(doc.data());
      });
      setstate({ ...state, products: arr, loading: false });
    });
  }, [state.loading]);

  return (
    <>
      {state.loading ? null : (
        <div className="Homepage">
          <TopSection banner={banner} />
          <Slider
            heading={slider1.name}
            products={state.products}
            slider={slider1}
          />
          <CategorySec />
          <Slider
            heading={slider2.name}
            products={state.products}
            slider={slider2}
          />{" "}
          <Slider
            heading={slider3.name}
            products={state.products}
            slider={slider3}
          />{" "}
          <Slider
            heading={slider4.name}
            products={state.products}
            slider={slider4}
          />
          <FabricSec />
          <DoubleImageText />
        </div>
      )}
    </>
  );
}

export default Homepage;
