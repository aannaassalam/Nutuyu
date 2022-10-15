import React from "react";
import "./fabric-sec.css";
import cloud from "../../../../assets/cloud_fabric.jpg";
import storm from "../../../../assets/storm_fabric.jpg";
import ascend from "../../../../assets/ascend_fabric.jpg";

export default function FabricSec() {
  return (
    <div className="fabric-sec">
      <div className="containers">
        <img src={cloud} alt="" />
        <div className="details">
          <h2>
            Cloud
            <br />
            Fabric
          </h2>
          <p>
            Buttery soft, sweat-wicking brushed fabric with a second-skin feel,
            designed to be worn anywhere, anytime.
          </p>
          <a href="#">Shop Now</a>
        </div>
      </div>
      <div className="containers">
        <img src={storm} alt="" />
        <div className="details">
          <h2>
            Storm
            <br />
            Fabric
          </h2>
          <p>
            Engineered for increased performance and durability through
            movement. Featuring a smooth, compressive feel plus a silky
            performance-style finish.
          </p>
          <a href="#">Shop Now</a>
        </div>
      </div>
      <div className="containers">
        <img src={ascend} alt="" />
        <div className="details">
          <h2>
            Ascend
            <br />
            Fabric
          </h2>
          <p>
            Breathable, flexible, high-performance fabric designed with light
            compression and a sweat-wicking texture for comfort and ease of
            movement.
          </p>
          <a href="#">Shop Now</a>
        </div>
      </div>
    </div>
  );
}
