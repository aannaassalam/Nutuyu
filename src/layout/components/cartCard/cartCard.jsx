import React from "react";
import "./cartCard.css";
import image from "../../../assets/Black-tee.jpg";
function CartCard() {
  return (
    <div className="CartCard">
      <img src={image} alt="" />
      <div className="details">
        <div>
          <a href="">THE PRIME SHORT 6" - MIDNIGHT</a>
          <p>₹‌3,800.00</p>
        </div>
        <p>Style : Lined</p>
        <p>Size : XXS</p>
        <div className="counterDiv">
          <div className="counter">
            <span>-</span>
            <span>5</span>
            <span>+</span>
          </div>
          <p>Remove</p>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
