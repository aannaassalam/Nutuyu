import React from "react";
import "./productCard.css";
import StyledRating from "../utility/Rating";

export default function ProductCard() {
  return (
    <div className="product-card">
      <img
        src="https://cdn.shopify.com/s/files/1/0005/7750/3289/products/the-cloud-pant-midnight-382578_150x.jpg?v=1661366167"
        alt=""
      />
      {/* <div className="data-sec"> */}
      <div className="data-sec">
        <div className="title">
          <p>The Day Dream Pant - Midnight</p>
        </div>
        <div className="pricing">
          <p className="selling-price">₹8,000</p>
          <p className="marked-price">₹11,000</p>
        </div>
      </div>
      <div className="ratings">
        <StyledRating value={4} precision={0.5} readOnly size="small" />
        <span className="reviews">231 Reviews</span>
      </div>
      {/* </div> */}
    </div>
  );
}
