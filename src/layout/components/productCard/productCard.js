import React from "react";
import "./productCard.css";
import StyledRating from "../utility/Rating";
import blacktee from "../../../assets/Black-tee.jpg";
import blacktee2 from "../../../assets/black-tee2.jpg";
import whitetee from "../../../assets/white-tee.jpg";
import whitetee2 from "../../../assets/white-tee2.jpg";
import { ShoppingBag } from "react-feather";

export default function ProductCard({ product, sold }) {
  // Just testing comments for firebase
  return (
    <a href={`/product/${product.id}`} className="product-card">
      {sold && <span className="sold">Sold</span>}
      <img src={product.images[0].image} alt="" className="main-img" />
      <img src={product.images[1].image} alt="" className="hover-img" />
      {/* <div className="data-sec"> */}
      <div className="data-sec">
        {!sold && (
          <div className="quick-add">
            <ShoppingBag size={20} />
            <strong>Add to Shopping Cart</strong>
          </div>
        )}
        <div className="title">
          <p>{product.name}</p>
        </div>
        <div className="pricing">
          <p className="selling-price">${product.price}</p>
          {/* <p className="marked-price">₹8,0000</p> */}
        </div>
      </div>
      {/* <div className="ratings">
        <StyledRating value={4} precision={0.5} readOnly size="small" />
        <span className="reviews">231 Reviews</span>
      </div> */}
      {/* </div> */}
    </a>
  );
}
