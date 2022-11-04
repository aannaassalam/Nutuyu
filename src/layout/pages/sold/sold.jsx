import React from "react";
import ProductCard from "../../components/productCard/productCard";
import "./sold.css";

export default function Sold() {
  return (
    <div className="sold">
      <div className="breadCrumb">
        <a href="/">Home</a>
        {">"}
        <a href={`/products/sold`}>Sold</a>
      </div>
      <h1 className="displayName">Sold Products</h1>
      <div className="productListing">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16].map((item) => (
          <ProductCard key={item} even={item % 2} sold />
        ))}
      </div>
    </div>
  );
}
