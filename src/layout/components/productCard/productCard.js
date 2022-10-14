import React from "react";
import "./productCard.css";
import StyledRating from "../utility/Rating";

export default function ProductCard({ a }) {
  return (
    <a href="/" className="product-card">
      <img
        src="https://cdn.shopify.com/s/files/1/0005/7750/3289/products/the-cloud-pant-midnight-382578_150x.jpg?v=1661366167"
        alt=""
        className="main-img"
      />
      <img
        src="https://cdn.shopify.com/s/files/1/0005/7750/3289/products/the-cloud-pant-midnight-728872_150x.jpg?v=1665177743"
        alt=""
        className="hover-img"
      />
      {/* <div className="data-sec"> */}
      <div className="data-sec">
        <div className="quick-add">
          <p>
            <strong>Quick Add +</strong>
          </p>
          <ul className="sizes">
            <li>XXS</li>
            <li>XS</li>
            <li>S</li>
            <li>M</li>
            <li>L</li>
            <li>XL</li>
            <li>XXL</li>
            <li>XXXL</li>
            <li>XXXXL</li>
          </ul>
        </div>
        <div className="title">
          <p>The Day Dream Pant - Midnight</p>
        </div>
        <div className="pricing">
          <p className="selling-price">₹8,000</p>
          <p className="marked-price">₹8,0000</p>
        </div>
      </div>
      <div className="ratings">
        <StyledRating value={4} precision={0.5} readOnly size="small" />
        <span className="reviews">231 Reviews</span>
      </div>
      {/* </div> */}
    </a>
  );
}
