import React, { useState, useEffect } from "react";
import "./cartCard.css";
import image from "../../../assets/Black-tee.jpg";
import { getDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useProducts } from "../../hooks/useProducts";
function CartCard({ product, setPrice, handleDelete }) {
  const [card, setcard] = useState();

  const products = useProducts().products;
  const cart_product = products.find((p) => p.id === product);
  useEffect(() => {
    if (!cart_product.sold) {
      setPrice((prev) => prev + parseInt(cart_product.price));
      return () => {
        setPrice((prev) => prev - cart_product.price);
      };
    }
  }, []);

  return (
    <div className="CartCard">
      {cart_product?.sold && <span className="sold">Sold</span>}
      {cart_product?.sold && <div className="layer"></div>}
      <img src={cart_product?.images[0]?.image} alt="" />
      <div className="details">
        <div>
          <a href={`/product/${cart_product?.id}`}>{cart_product?.name}</a>
          <p>${cart_product?.price}</p>
        </div>
        <p>
          {cart_product?.highlights[0].key} :{" "}
          {cart_product?.highlights[0].value}
        </p>
        <p>
          {cart_product?.highlights[1].key} :{" "}
          {cart_product?.highlights[1].value}
        </p>

        <div className="counterDiv">
          <div className="counter"></div>
          <p onClick={handleDelete}>Remove</p>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
