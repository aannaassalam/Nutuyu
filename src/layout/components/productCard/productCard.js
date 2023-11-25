import React, { useEffect, useState } from "react";
import "./productCard.css";
import StyledRating from "../utility/Rating";
import blacktee from "../../../assets/Black-tee.jpg";
import blacktee2 from "../../../assets/black-tee2.jpg";
import whitetee from "../../../assets/white-tee.jpg";
import whitetee2 from "../../../assets/white-tee2.jpg";
import { ShoppingBag } from "react-feather";
import { useAuth } from "../../hooks/useAuth";
import { useProducts } from "../../hooks/useProducts";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
export default function ProductCard({ product, sold }) {
  const user = useAuth().user;
  const products = useProducts().products;
  // Just testing comments for firebase
  const [Found, setFound] = useState(false);
  useEffect(() => {
    if (user && user.cart.includes(product.id)) {
      setFound(true);
    } else {
      setFound(false);
    }
  }, [user]);
  const handleCart = (type) => {
    if (type === "add") {
      const docref = doc(getFirestore(), "users", user.id);
      updateDoc(docref, {
        cart: [...user.cart, product.id],
      }).then(() => {
        setFound(true);
        console.log("added");
      });
    } else {
      const docref = doc(getFirestore(), "users", user.id);
      var updatedCart = user.cart.filter((item) => item !== product.id);
      updateDoc(docref, {
        cart: updatedCart,
      });
    }
  };
  const discount = () => {
    return 100 - (product.sellingPrice * 100) / product.markedPrice;
  };
  const ratingValue = () => {
    let totalValue = 0;
    product?.ratings?.forEach((item) => (totalValue += item.rateValue));
    return parseInt(totalValue / product?.ratings?.length);
  };
  return (
    <a href={`/product/${product.id}`} className="product-card">
      {sold && <span className="sold">Sold</span>}
      <img src={product?.images[0]?.image} alt="" className="main-img" />
      <img
        src={
          product?.images[1]
            ? product?.images[1]?.image
            : product?.images[0]?.image
        }
        alt=""
        className="hover-img"
      />
      {/* <div className="data-sec"> */}
      <div className="data-sec">
        {/* {!sold && (
          <div className="quick-add">
            <ShoppingBag size={20} />
            {Found ? (
              <strong
                onClick={(e) => {
                  e.preventDefault();
                  handleCart("remove");
                }}
              >
                Remove From Shopping Cart
              </strong>
            ) : (
              <strong
                onClick={(e) => {
                  e.preventDefault();

                  handleCart("add");
                }}
              >
                Add to Shopping Cart
              </strong>
            )}
          </div>
        )} */}
        <div className="title">
          <p>{product.name}</p>
        </div>
        <div className="pricing">
          <p className="selling-price">${product.sellingPrice}</p>
          <p className="marked-price"> ${product.markedPrice}</p>
        </div>
      </div>
      <div className="ratings">
        <StyledRating
          value={ratingValue()}
          precision={1}
          readOnly
          size="small"
        />
        <span className="reviews">{product?.ratings?.length || 0} reviews</span>
        <p className="discount">{discount()}% Off</p>
      </div>
      {/* </div> */}
    </a>
  );
}
