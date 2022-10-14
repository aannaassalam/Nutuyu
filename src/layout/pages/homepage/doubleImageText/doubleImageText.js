import React from "react";
import "./doubleImageText.css";

export default function DoubleImageText() {
  return (
    <div className="double-image">
      <div className="left">
        <img
          src="https://cdn.shopify.com/s/files/1/0005/7750/3289/files/DSC09315-h_900x.jpg?v=1648788184"
          alt=""
        />
        <div className="text-absolute">
          <h2>Why Vitality</h2>
          <a href="#">About us</a>
        </div>
      </div>
      <div className="right">
        <img
          src="https://cdn.shopify.com/s/files/1/0005/7750/3289/files/Abby-NeutraDSC07898-Edit_900x.jpg?v=1650431282"
          alt=""
        />
        <div className="text-absolute">
          <h2>₹42,114,300.00+ in donations</h2>
          <a href="#">Together we give back</a>
        </div>
      </div>
    </div>
  );
}
