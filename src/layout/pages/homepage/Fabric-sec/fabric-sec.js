import React from "react";
import "./fabric-sec.css";

export default function FabricSec() {
  return (
    <div className="fabric-sec">
      <div className="containers">
        <img
          src="https://cdn.shopify.com/s/files/1/0005/7750/3289/files/1CloudPant_Obsidian-E_150x.jpg?v=1639082255"
          alt=""
        />
        <div className="details">
          <h2>Cloud Fabric</h2>
          <p>
            Buttery soft, sweat-wicking brushed fabric with a second-skin feel,
            designed to be worn anywhere, anytime.
          </p>
          <a href="#">Shop Now</a>
        </div>
      </div>
      <div className="containers">
        <img
          src="https://cdn.shopify.com/s/files/1/0005/7750/3289/files/3StormPant_Habitat-C_150x.jpg?v=1639082256"
          alt=""
        />
        <div className="details">
          <h2>Storm Fabric</h2>
          <p>
            Engineered for increased performance and durability through
            movement. Featuring a smooth, compressive feel plus a silky
            performance-style finish.
          </p>
          <a href="#">Shop Now</a>
        </div>
      </div>
      <div className="containers">
        <img
          src="https://cdn.shopify.com/s/files/1/0005/7750/3289/files/2AscendPant_KingCheetahMidnight-A_150x.jpg?v=1639082256"
          alt=""
        />
        <div className="details">
          <h2>Ascend Fabric</h2>
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
