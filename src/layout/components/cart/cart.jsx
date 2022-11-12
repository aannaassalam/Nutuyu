import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import "./cart.css";
import CartCard from "../cartCard/cartCard";
import { useAuth } from "../../hooks/useAuth";
import { onSnapshot, doc, getFirestore, updateDoc } from "firebase/firestore";
import { setPersistence } from "firebase/auth";
import Lottie from "react-lottie";
import empty from "../../../assets/629-empty-box.json";
function Cart({ open, handleCart }) {
  const [cart, setcart] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [sold, setsold] = useState(false);
  const [price, setPrice] = useState(0);
  const user = useAuth().user;
  const handleDelete = (id) => {
    const docref = doc(getFirestore(), "users", user.id);
    var updatedCart = user.cart.filter((item) => item !== id);
    updateDoc(docref, {
      cart: updatedCart,
    });
  };
  const goCheckout = () => {
    if (sold) {
      console.error("Your bag contains items which are sold");
    } else window.location.href = "/checkout";
  };
  return (
    <>
      {/* {loading ? (
        "loading..."
      ) : ( */}
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
          </div>

          {user?.cart?.length > 0 ? (
            <>
              <div className="cartCards">
                {user?.cart?.map((product) => (
                  <CartCard
                    product={product}
                    key={product}
                    setPrice={setPrice}
                    handleDelete={() => handleDelete(product)}
                    setsold={setsold}
                  />
                ))}
              </div>
              <div className="bottom">
                <div className="total">
                  <p>SUB TOTAL</p>
                  <p>${price}</p>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button className="lastButton" onClick={() => goCheckout()}>
                  checkout
                </button>
              </div>
            </>
          ) : (
            <div className="emptyCart">
              <Lottie
                options={{
                  animationData: empty,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
              <h3>Your Bag Is Empty</h3>
              <button onClick={() => (window.location.pathname = "/")}>
                Go Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Cart;
