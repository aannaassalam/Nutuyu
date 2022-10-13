import React from "react";
import { Search, ShoppingBag, ShoppingCart, User } from "react-feather";
import "./navbar.css";
function Navbar() {
  return (
    <div className="Navbar">
      <div className="top">
        <div className="search">
          <Search />
          <input type="text" placeholder="Type here to search" />
        </div>
        <h1 className="logo">LOGO</h1>
        <div className="accCart">
          <a href="">
            <User />
            Account
          </a>
          <a href="">
            <ShoppingBag />
            Your Bag
          </a>
        </div>
      </div>
      <div className="bottom">
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
        <a href="">Menu 1</a>
      </div>
    </div>
  );
}

export default Navbar;
