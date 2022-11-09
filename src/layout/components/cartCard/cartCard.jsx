import React, { useState, useEffect } from "react";
import "./cartCard.css";
import image from "../../../assets/Black-tee.jpg";
import { getDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
function CartCard({ product, sendProduct, handleDelete }) {
  const [card, setcard] = useState();
  useEffect(() => {
    onSnapshot(doc(getFirestore(), "products", product), (doc) => {
      setcard({ ...doc.data(), id: doc.id });
      sendProduct(doc.data());
    });
  }, []);

  console.log(card);
  return (
    <div className="CartCard">
      <img src={card?.images[0]?.image} alt="" />
      <div className="details">
        <div>
          <a href={`/product/${card?.id}`}>{card?.name}</a>
          <p>{card?.price}</p>
        </div>
        <p>
          {card?.highlights[0].key} : {card?.highlights[0].value}
        </p>
        <p>
          {card?.highlights[1].key} : {card?.highlights[1].value}
        </p>

        <div className="counterDiv">
          <div className="counter"></div>
          <p
            onClick={() => {
              handleDelete(card?.id);
            }}
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
