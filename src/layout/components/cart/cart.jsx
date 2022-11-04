import React from "react";
import { X } from "react-feather";
import "./cart.css";
import CartCard from "../cartCard/cartCard";
function Cart({ open, handleCart }) {
  return (
    <div className={open ? "Cart" : "Cart close"}>
      <div className={open ? "cartDiv" : "cartDiv close"}>
        <div className="top">
          <h1>
            Shopping Cart
            <span onClick={() => handleCart()}>
              <X />
            </span>
          </h1>
          <p>Free shipping on all domestic orders over ₹‌14,100.00</p>
          <div className="cartCards">
            <CartCard />
          </div>
        </div>
        <div className="total">
          <p>SUB TOTAL</p>
          <p>₹‌3,800.00</p>
        </div>
        <p>Taxes and shipping calculated at checkout</p>
        <p>
          <span>Earn $24.00 credit</span> by paying with{" "}
          <strong>CATCH ⓘ</strong>
        </p>
        <button>go to cart</button>
        <button
          className="lastButton"
          onClick={() => (window.location.href = "/checkout")}
        >
          checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
