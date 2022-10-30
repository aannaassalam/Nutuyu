import React from "react";
import "./orderDetail.css";
import bag from "../../../assets/bag.png";
import image from "../../../assets/Black-tee.jpg";
import { Button } from "@mui/material";
function OrderDetail() {
  return (
    <div className="OrderDetail">
      <div className="orderCard">
        <h3>
          <img src={bag} alt="" />
          Confirmed
        </h3>
        <div className="details">
          <img src={image} alt="" />
          <div>
            {" "}
            <p>
              <span>DENNISLINGO PREMIUM ATTIRE - Striped Slim Shirt </span>
              <Button>Cancel Item</Button>
            </p>
            <strong>$899.00</strong>
            <p>
              size <strong>XL</strong>
            </p>
            <p>Estimated Delivery : 02 November</p>
          </div>
        </div>
      </div>
      <div className="priceDetails">
        <div>
          <div className="top">
            <p>
              Order# FJS545KLDG54654 <span>(1 item)</span>
            </p>
            <p>Order Placed On 26th October 2022</p>
            <p>Paid by cash on deivery</p>
          </div>
          <div className="bottom">
            <h3>
              Total Price <span>$800.99</span>
            </h3>
            <p>
              bag total <span>$99</span>
            </p>
            <p>
              bag discount <span>$99</span>
            </p>
            <p>
              convinience fee<span>$99</span>
            </p>
          </div>
        </div>
        <div className="addressInfo">
          <span>Deliver to</span>
          <h3>John Doe</h3>
          <p>98/8 Timtoun street </p>
          <p>south 24 parganas, West Bengal</p>
          <p>India - 700039</p>
          <p>
            phone : <strong>8335974849</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
