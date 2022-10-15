import React from "react";
import "./doubleImageText.css";
import footer_girl1 from "../../../../assets/footer_girl1.jpg";
import footer_girl2 from "../../../../assets/footer_girl2.jpg";

export default function DoubleImageText() {
  return (
    <div className="double-image">
      <div className="left">
        <img src={footer_girl1} alt="Pic 1" />
        <div className="text-absolute">
          <h2>Why Vitality</h2>
          <a href="#">About us</a>
        </div>
      </div>
      <div className="right">
        <img src={footer_girl2} alt="Pic 2" />
        <div className="text-absolute">
          <h2>₹42,114,300.00+ in donations</h2>
          <a href="#">Together we give back</a>
        </div>
      </div>
    </div>
  );
}
