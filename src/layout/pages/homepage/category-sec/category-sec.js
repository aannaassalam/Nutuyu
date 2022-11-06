import React from "react";
import "./category-sec.css";
import pink_aunt from "../../../../assets/pink-aunt.jpg";
import half_sleeve from "../../../../assets/half-sleeve-male.jpg";
import hoodie from "../../../../assets/hoodie.jpg";

export default function CategorySec() {
  return (
    <div className="category-sec">
      <div>
        <img src={pink_aunt} alt="" />
        <h2>
          Shop
          <br /> Women's
        </h2>
      </div>
      <div>
        <img src={half_sleeve} alt="" />
        <h2>
          Shop <br /> Men's
        </h2>
      </div>
      <div>
        <img src={hoodie} alt="" />
        <h2>
          Shop
          <br />
          All
        </h2>
      </div>
    </div>
  );
}
