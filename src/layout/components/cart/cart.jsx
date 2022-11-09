import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import "./cart.css";
import CartCard from "../cartCard/cartCard";
import { useAuth } from "../../hooks/useAuth";
import { onSnapshot, doc, getFirestore, updateDoc } from "firebase/firestore";
import { setPersistence } from "firebase/auth";
function Cart({ open, handleCart }) {
  const [cart, setcart] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [loading, setloading] = useState(true);
  const [price, setprice] = useState(0);

  const user = useAuth();
  useEffect(() => {
    console.log(user);
    const docref = doc(getFirestore(), "users", user?.id);
    onSnapshot(docref, (doc) => {
      // setcart(doc.data().cart);
      console.log(doc.data());
    });
    setloading(false);
    // if (cart?.length > 0) func(user);
  }, [user || cart]);

  // const func = (user) => {
  //   console.log(user);
  //   if (cart.length > 0) {
  //     var arr = [];
  //     cart.forEach((item) => {
  //       onSnapshot(doc(getFirestore(), "products", item), (doc) => {
  //         var ob = doc.data();
  //         arr.push(ob);
  //       });
  //       setcartItems(arr);
  //       console.log(cartItems);
  //     });
  //   }
  // };
  // // console.log(cart);
  var arr = [];
  const getProduct = (product) => {
    console.log(product);
    arr.push(product);
    setcartItems(arr);
  };
  useEffect(() => {
    var price = 0;
    cartItems.forEach((item) => {
      price = price + item.price;
    });
    setprice(price);
  }, [cartItems]);
  const handleDelete = (id) => {
    console.log(id);
    const docref = doc(getFirestore(), "users", user.id);
    var updatedCart = user.cart.filter((item) => item !== id);
    console.log(updatedCart);
    updateDoc(docref, {
      cart: updatedCart,
    });
  };
  console.log(cartItems);
  return (
    <>
      {loading ? (
        "loading..."
      ) : (
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
                {cart?.map((product, id) => (
                  <CartCard
                    product={product}
                    key={id}
                    sendProduct={getProduct}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
            <div className="total">
              <p>SUB TOTAL</p>
              <p>{price}</p>
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
      )}
    </>
  );
}

export default Cart;
