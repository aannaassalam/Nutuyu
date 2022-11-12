import React, { useEffect, useState } from "react";
import "./product-details.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProducts } from "../../hooks/useProducts";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function ProductDetails() {
  const [details, setDetails] = useState(false);
  const [previewImage, setPreviewImage] = useState(1);
  const [imageChange, setImageChange] = useState(false);
  const [product, setProduct] = useState({});
  const [found, setFound] = useState(false);
  // const [loading, setloading] = useState(true);
  const params = useParams();
  const user = useAuth().user;
  const products = useProducts().products;

  useEffect(() => {
    if (imageChange) {
      setTimeout(() => {
        setImageChange(false);
      }, 50);
    }
  }, [imageChange]);

  useEffect(() => {
    // onSnapshot(doc(getFirestore(), "products", params.id), (doc) => {
    //   setProduct({ ...doc.data(), id: doc.id });
    //   user?.cart.forEach((item) => {
    //     if (item === product.id) setFound(true);
    //   });
    // });
    const local_product = products.find((product) => product.id === params.id);
    setProduct(local_product);
    if (user && user.cart.includes(params.id)) {
      setFound(true);
    } else {
      setFound(false);
    }
  }, [user]);

  const addToCart = async () => {
    if (user) {
      if (!found) {
        const docref = doc(getFirestore(), "users", user.id);
        updateDoc(docref, {
          cart: [...user.cart, params.id],
        }).then(() => {
          setFound(true);
          console.log("added");
        });
      } else {
        console.log("go bag");
      }
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="product-details">
      <div className="left">
        <div className="thumbnail-images">
          {product.images?.map((image, idx) => (
            <img
              src={image.image}
              alt="girl"
              className={previewImage === image.id && "active"}
              onClick={() => {
                setPreviewImage(image.id);
                // setImageChange(true);
              }}
              key={idx}
            />
          ))}
        </div>
        <img
          src={product.images?.find((image) => image.id === previewImage).image}
          alt=""
          className={imageChange ? "preview-image fade" : "preview-image"}
        />
      </div>
      <div className="right">
        <h3>{product.name}</h3>
        <h3>${product.price}</h3>
        <button>Buy Now</button>
        <button
          onClick={() => {
            addToCart();
          }}
        >
          {found ? "Go To Bag" : "Add to Bag"}{" "}
        </button>

        <div className="description">
          <p>{product.description}</p>
        </div>
        {product.note?.trim().length > 0 && (
          <div className="note">
            <p>
              <strong>[NOTE: </strong>
              {product.note}]
            </p>
          </div>
        )}
        <div
          className={details ? "details open" : "details"}
          onClick={() => setDetails(!details)}
        >
          <div className="details-header">
            <h5>Details</h5>
            <i className={`fa-solid ${details ? "fa-minus" : "fa-plus"}`}></i>
          </div>
          <div className="details-body">
            {product.highlights?.map((highlight) => {
              return (
                <div className="detail-row">
                  <div className="detail-title">
                    <i className="fa-solid fa-circle"></i>
                    <p>{highlight.key}</p>
                  </div>
                  <div className="detail-text">{highlight.value}</div>
                </div>
              );
            })}
            {/* <div className="detail-row">
                <div className="detail-title">
                  <i className="fa-solid fa-circle"></i>
                  <p>Size</p>
                </div>
                <div className="detail-text">its for people of 5'11"</div>
              </div>
              <div className="detail-row">
                <div className="detail-title">
                  <i className="fa-solid fa-circle"></i>
                  <p>Size</p>
                </div>
                <div className="detail-text">its for people of 5'11"</div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
