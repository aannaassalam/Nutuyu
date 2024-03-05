import React from "react";
import "./animatedHeroSection.css";
import AnimatedNavbar from "../../../components/AnimatedNavbar/AnimatedNavbar";

export default function AnimatedHeroSection() {
  return (
    <div className="animatedHero">
      <h1>
        <span>A</span>
        <span>lisha</span>
        <br />
        Fabrics
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, velit?
      </p>
      <div className="searchBox">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="ball top-right"></div>
      <div className="ball bottom-right"></div>
      <div className="ball top-left"></div>
      <div className="ball bottom-left"></div>
    </div>
  );
}
