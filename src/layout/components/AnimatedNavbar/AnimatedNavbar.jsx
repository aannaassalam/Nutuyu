import React from "react";
import "./AnimatedNavbar.css";

export default function AnimatedNavbar() {
  return (
    <div className="animatedNavbar">
      <div className="rightBox">
        <a href="/login">
          <i className="fa-solid fa-user"></i>Login
        </a>
        <a href="">
          <i className="fa-brands fa-opencart"></i>Cart
        </a>
      </div>
    </div>
  );
}
