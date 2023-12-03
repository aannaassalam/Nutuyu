import React, { useEffect, useState } from "react";
import "./product-details.css";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProducts } from "../../hooks/useProducts";
import Slider from "./slider/slider";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Loader from "../../components/loader/loader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Rating from "./rating/rating";

export default function ProductDetails() {
  const [details, setDetails] = useState(false);
  const [previewImage, setPreviewImage] = useState(1);
  const [imageChange, setImageChange] = useState(false);
  const [product, setProduct] = useState({});
  const [found, setFound] = useState(false);
  const [variance, setVariance] = useState({});
  const [selectedSize, setSelectedSize] = useState();
  const [loading, setloading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const user = useAuth().user;
  const [products, setProducts] = useState({});

  useEffect(() => {
    if (imageChange) {
      setTimeout(() => {
        setImageChange(false);
      }, 50);
    }
  }, [imageChange]);

  useEffect(() => {
    getDoc(doc(getFirestore(), "products", params.id))
      .then((doc) => {
        setProduct({
          ...doc.data(),
          id: doc.id,
          variances: [
            {
              markedPrice: doc.data().markedPrice,
              sellingPrice: doc.data().sellingPrice,
              images: doc.data().images,
              skuId: doc.data().skuId,
              sizes: doc.data().sizes,
            },
            ...doc.data().variances,
          ],
        });
        setloading(false);
        setVariance({
          markedPrice: doc.data().markedPrice,
          sellingPrice: doc.data().sellingPrice,
          images: doc.data().images,
          skuId: doc.data().skuId,
          sizes: doc.data().sizes,
        });
        setSelectedSize(doc.data().sizes[0].name);
      })
      .catch((err) => console.log(err));
    // setProduct(local_product);
  }, []);
  useEffect(() => {
    if (
      user &&
      user.cart.find(
        (item) =>
          item.variance.skuId == variance.skuId &&
          item.size == selectedSize &&
          params.id === item.productId
      )
    ) {
      setFound(true);
    } else {
      // console.log(user.cart.find((item) => console.log(variance.skuId)));
      setFound(false);
    }
  }, [variance, selectedSize, product, user]);

  const addToCart = async () => {
    if (user) {
      if (
        !user.cart.find(
          (item) =>
            item.variance.skuId == variance.skuId &&
            item.size == selectedSize &&
            params.id === item.productId
        )
      ) {
        const docref = doc(getFirestore(), "users", user.id);
        updateDoc(docref, {
          cart: [
            ...user.cart,
            {
              productId: params.id,
              variance,
              name: product.name,
              size: selectedSize,
              quantity,
              id: uuid(),
            },
          ],
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
  const discount = () => {
    return parseInt(100 - (variance.sellingPrice * 100) / variance.markedPrice);
  };
  let quantiyOptions = [];
  let quan = parseInt(
    variance?.sizes?.find((item) => item.name === selectedSize)?.quantity
  );
  for (let i = 1; i <= quan; i++) {
    quantiyOptions[i] = i;
  }
  console.log(user?.cart);
  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="product-details">
          <div className="left">
            <div className="thumbnail-images">
              {variance.images?.map((image, idx) => (
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
              src={
                variance.images?.find((image) => image.id === previewImage)
                  .image
              }
              alt=""
              className={imageChange ? "preview-image fade" : "preview-image"}
            />
          </div>
          <div className="right">
            <h3>{product.name}</h3>
            <h2>Special Price:</h2>
            <div className="pricing">
              <div>
                <h3>
                  <span></span>${variance.markedPrice}
                </h3>
                <p>M.R.P</p>
              </div>
              <div>
                <h3>
                  <span></span>${variance.sellingPrice}
                </h3>
                <p style={{ textAlign: "center" }}>NUTUYU PRICE</p>
              </div>
              <div>
                <h3>
                  <span></span>
                  {discount()}%off
                </h3>
                <p>DISCOUNT</p>
              </div>
            </div>
            <div className="variances">
              <h2>Variances:</h2>
              <div>
                {product?.variances?.map((item, id) => (
                  <img
                    className={
                      item.images[0].image === variance.images[0].image
                        ? "active-variance"
                        : ""
                    }
                    src={item?.images[0]?.image}
                    alt=""
                    key={item}
                    onClick={() => {
                      setVariance(item);
                      setPreviewImage(1);
                      setSelectedSize(item.sizes[0].name);
                      setQuantity(1);
                    }}
                  />
                ))}
              </div>
            </div>
            {variance.sizes.length > 0 && (
              <div className="sizes">
                <h2>Sizes:</h2>
                <div>
                  {variance.sizes.map((item) => (
                    <div
                      className={
                        selectedSize === item.name ? "size selected" : "size"
                      }
                      onClick={() => {
                        setSelectedSize(item.name);
                        setQuantity(1);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {parseInt(
              variance?.sizes?.find((item) => item.name === selectedSize)
                ?.quantity
            ) > 1 ? (
              <div
                style={{
                  display: found ? "none" : "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "40px 0 0",
                }}
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  className="quantity"
                >
                  <InputLabel id="demo-select-small-label">Quantity</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={quantity}
                    label="Quantity"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  >
                    {quantiyOptions.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <i
                  class="fa-solid fa-share-nodes"
                  style={{ fontSize: 25, cursor: "pointer" }}
                ></i>
              </div>
            ) : (
              <h2 style={{ color: "red", margin: "20px 0 0" }}>
                Not Available
              </h2>
            )}
            {parseInt(
              variance?.sizes?.find((item) => item.name === selectedSize)
                ?.quantity
            ) > 1 && (
              <>
                {product.sold ? (
                  <h1 style={{ color: "red", textAlign: "center" }}>
                    Sold Out
                  </h1>
                ) : (
                  <>
                    <button>
                      <Link
                        style={{ textDecoration: "none", color: "#fff" }}
                        to={{
                          pathname: user
                            ? `/checkout/${btoa(params.id)}`
                            : "/login",
                        }}
                        state={{
                          name: product.name,
                          variance: variance,
                          size: selectedSize,
                          quantity,
                        }}
                      >
                        Buy Now
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        user
                          ? addToCart()
                          : (window.location.pathname = "./login");
                      }}
                    >
                      {found ? "Go To Bag" : "Add to Bag"}{" "}
                    </button>
                  </>
                )}
              </>
            )}

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
                <i
                  className={`fa-solid ${details ? "fa-minus" : "fa-plus"}`}
                ></i>
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
              </div>
            </div>
          </div>
        </div>
      )}

      <Slider product={product} />
      {product.ratings && <Rating data={product.ratings} />}
    </>
  );
}
