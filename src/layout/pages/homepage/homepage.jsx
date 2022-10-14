import React from "react";
import ProductCard from "../../components/productCard/productCard";
import "./homepage.css";
function Homepage() {
  return (
    <div className="Homepage">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default Homepage;
