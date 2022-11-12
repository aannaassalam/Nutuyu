import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import "./cart.css";
import CartCard from "../cartCard/cartCard";
import { useAuth } from "../../hooks/useAuth";
import { onSnapshot, doc, getFirestore, updateDoc } from "firebase/firestore";
import { setPersistence } from "firebase/auth";

function Cart({ open, handleCart }) {
  const [price, setPrice] = useState(0);

  const user = useAuth().user;

  const handleDelete = (id) => {
    console.log(id);
    const docref = doc(getFirestore(), "users", user.id);
    var updatedCart = user.cart.filter((item) => item !== id);
    console.log(updatedCart);
    updateDoc(docref, {
      cart: updatedCart,
    });
  };

  return (
    <div className={open ? "Cart" : "Cart close"}>
      <div className={open ? "cartDiv" : "cartDiv close"}>
        <div className="top">
          <h1>
            Shopping Cart
            <span onClick={handleCart}>
              <X />
            </span>
          </h1>
          <p>Free shipping on all domestic orders over ₹‌14,100.00</p>
          <div className="cartCards">
            {user?.cart?.map((product) => (
              <CartCard
                product={product}
                key={product}
                setPrice={setPrice}
                handleDelete={() => handleDelete(product)}
              />
            ))}
          </div>
        </div>
        <div className="total">
          <p>SUB TOTAL</p>
          <p>${price}</p>
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
