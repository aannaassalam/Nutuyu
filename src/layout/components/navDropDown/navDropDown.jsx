import React, { useState } from "react";
import "./navDropDown.css";
import image from "../../../assets/navDropDownImage.png";
function NavDropDown({ open }) {
  const [dropDown, setdropDown] = useState(false);

  return (
    <div
      className={open || dropDown ? "NavDropDown open" : "NavDropDown"}
      onMouseOver={() => setdropDown(true)}
      onMouseLeave={() => setdropDown(false)}
    >
      <div className="productList">
        <h4>Products</h4>
        <div>
          <a href="">All Cothing</a>
          <a href="">Coats</a>
          <a href="">Dresses</a>
          <a href="">Jeans</a>
          <a href="">Jackets</a>
          <a href="">Hoodies</a>
          <a href="">Shirts</a>
          <a href="">Tracks</a>
          <a href="">T-Shirts</a>
        </div>
      </div>
      <div className="imageSide">
        <img src={image} alt="" />
        <p>ANNA'S TOP SHOES</p>
        <p>SLF Fasta Chelsea Boot in Black</p>
        <p>£145.00 Sold Out</p>
      </div>
    </div>
  );
}

export default NavDropDown;
