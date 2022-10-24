import React, { useEffect, useState } from "react";
import "./product-details.css";
import girl1 from "../../../assets/girl1.jpg";
import girl2 from "../../../assets/girl2.jpg";
import girl3 from "../../../assets/girl3.jpg";
import girl4 from "../../../assets/girl4.jpg";
import girl5 from "../../../assets/girl5.jpg";

export default function ProductDetails() {
  const [details, setDetails] = useState([]);
  const [previewImage, setPreviewImage] = useState(0);
  const [imageChange, setImageChange] = useState(false);
  const images = [girl1, girl2, girl3, girl4, girl5];

  useEffect(() => {
    if (imageChange) {
      setTimeout(() => {
        setImageChange(false);
      }, 50);
    }
  }, [imageChange]);

  return (
    <div className="product-details">
      <div className="left">
        <div className="thumbnail-images">
          {images.map((image, idx) => (
            <img
              src={image}
              alt="girl"
              className={previewImage === idx && "active"}
              onClick={() => {
                setPreviewImage(idx);
                setImageChange(true);
              }}
              key={idx}
            />
          ))}
        </div>
        <img
          src={!imageChange && images[previewImage]}
          alt=""
          className={imageChange ? "preview-image fade" : "preview-image"}
        />
      </div>
      <div className="right">
        <h3>The Day Dream Pant - Midnight</h3>
        <h3>$1300</h3>
        <button>Buy Now</button>
        <button>Add to Bag</button>

        <div className="description">
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
        <div
          className={details.includes(1) ? "details open" : "details"}
          onClick={() =>
            setDetails((prev) =>
              prev.includes(1) ? prev.filter((p) => p !== 1) : [...prev, 1]
            )
          }
        >
          <div className="details-header">
            <h5>Details</h5>
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="details-body">
            <div className="detail-row">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
