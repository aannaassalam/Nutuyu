import React, { useState, useEffect } from "react";
import "./cartCard.css";
import image from "../../../assets/Black-tee.jpg";
import { getDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useProducts } from "../../hooks/useProducts";
function CartCard({ product, setPrice, handleDelete }) {
  const products = useProducts().products;
  const cart_product = product;

  const variant = products
    .find((p) => p.id === cart_product.productId)
    .variances?.find((v) => v.id === cart_product.variance.id);
  // .sizes?.find((s) => s.name === cart_product.size).quantity;
  const quantity = variant?.sizes?.find(
    (s) => s.name === cart_product.size
  ).quantity;
  console.log(quantity);
  const [sold, setSold] = useState(quantity > 0 ? false : true);
  useEffect(() => {
    if (sold) {
      setPrice(
        (prev) =>
          prev + cart_product.variance.sellingPrice * cart_product.quantity
      );
      return () => {
        setPrice(
          (prev) =>
            prev - cart_product.variance.sellingPrice * cart_product.quantity
        );
      };
    }
  }, []);

  return (
    <div className="CartCard">
      {cart_product?.sold && <span className="sold">Sold</span>}
      {cart_product?.sold && <div className="layer"></div>}
      <img src={cart_product?.variance?.images[0]?.image} alt="" />
      <div className="details">
        <div>
          <a href={`/product/${cart_product?.productId}`}>
            {cart_product?.name}
          </a>
          <p>${cart_product?.variance.sellingPrice}</p>
        </div>
        <p>Quantity : {cart_product?.quantity}</p>
        <p>Size: {cart_product?.size}</p>

        <div className="counterDiv">
          <div className="counter"></div>
          <p onClick={handleDelete}>Remove</p>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
