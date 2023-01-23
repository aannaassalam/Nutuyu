import React, { useEffect, useState } from "react";
import "./orderDetail.css";
import bag from "../../../assets/bag.png";
import image from "../../../assets/Black-tee.jpg";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import moment from "moment/moment";
import { Camera, Eye } from "react-feather";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
function OrderDetail() {
  const [order, setorder] = useState({});
  const user = useAuth().user;

  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({
    images: [],
    msg: [],
    preview: [],
  });
  const collec = collection(getFirestore(), "#nutuyu");

  const params = useParams();
  useEffect(() => {
    onSnapshot(doc(getFirestore(), "orders", params.id), (doc) => {
      setorder(doc.data());
      setloading(false);
    });
    init();
  }, [loading]);
  const init = () => {
    let ldata = { images: [], msg: [] };
    order?.items?.forEach((_, id) => {
      if (order.items[id].imageId) {
        ldata.images.push({ id: id, img: _.imageId });
        ldata.msg.push({ id: id, msg: "" });
      } else {
        ldata.images.push({ id: id, img: null });
        ldata.msg.push({ id: id, msg: "" });
      }
    });

    console.log(ldata);
    setdata(ldata);
  };
  const upload = async (id, index) => {
    const name = `${id}${moment(new Date()).format("x")}`;
    const url = await ImageUploader(id, index, name);
    addDoc(collec, {
      comments: [],
      date: new Date(),
      image: url,
      uniqueid: name,
      name: user.full_name,
    }).then((doc2) => {
      console.log(doc2.id);
      let obj = order;
      obj.items[index].imageId = url;
      obj.items[index].linkId = doc2.id;
      setDoc(doc(getFirestore(), "orders", params.id), {
        ...obj,
      }).then(() => {
        updateDoc(doc(getFirestore(), "#nutuyu", doc2.id), {
          uniqueid: doc2.id,
        }).then(() => {
          init();
          console.log("added");
        });
      });
    });
  };
  const ImageUploader = async (id, index, name) => {
    const imageRef = ref(getStorage(), `/#nutuyu/${name}.jpg`);
    const snapshot = await uploadBytes(imageRef, data.images[index].img);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
  const deleteImage = (id, index) => {
    deleteDoc(doc(getFirestore(), "#nutuyu", id)).then(() => {
      let obj = order;
      obj.items[index].imageId = "";
      obj.items[index].linkId = "";
      setDoc(doc(getFirestore(), "orders", params.id), {
        ...obj,
      }).then(() => {
        init();
        console.log("deleted");
      });
    });
  };
  // console.log(user && user);
  return (
    <>
      {loading ? null : (
        <div className="OrderDetail">
          <div className="orderCards">
            <h3>
              <img src={bag} alt="" />
              Confirmed
            </h3>
            {order?.items?.map((item, id) => (
              <>
                <div className="details">
                  <div className="orderCardWrapper">
                    <img src={item.images[0].image} alt="" />
                    <div>
                      {" "}
                      <p>
                        <span className="changeFont">{item.name} </span>
                      </p>
                      <strong className="changeFont">
                        ${Number(item.price).toFixed(2)}
                      </strong>
                      <p className="changeFont">
                        {item.highlights[0].key}{" "}
                        <strong>{item.highlights[0].value}</strong>
                      </p>
                      <p className="changeFont">
                        Estimated Delivery : 02 November
                      </p>
                    </div>
                  </div>
                  <div className="imageUpload">
                    {typeof data?.images[id]?.img !== "string" &&
                    data?.images[id]?.img ? (
                      <img
                        src={URL.createObjectURL(data?.images[id]?.img)}
                        alt="pic"
                      ></img>
                    ) : null}
                    {typeof data?.images[id]?.img !== "string" &&
                    data?.images[id]?.img ? (
                      <div className="actionButtons">
                        <Button
                          style={{ marginLeft: 0 }}
                          onClick={() => upload(item.id, id)}
                        >
                          Upload
                        </Button>
                        <Button
                          style={{ marginLeft: 0, background: "red" }}
                          onClick={() => {
                            let limages = data.images;
                            limages[id].img = null;
                            setdata({ ...data, images: limages });
                          }}
                        >
                          Discard{" "}
                        </Button>
                      </div>
                    ) : typeof data?.images[id]?.img === "string" ? (
                      <div className="actionButtons">
                        <a href={`/nutuyu?id=${item.linkId}`}>
                          <Button
                            style={{
                              alignSelf: "flex-start",
                              margin: "20px 0 10px",
                            }}
                            // onClick={() =>
                            //   (window.location.pathname = `/nutuyu?id=${item.linkId}`)
                            // }
                          >
                            <Eye />
                            Preview
                          </Button>
                        </a>

                        <Button
                          style={{
                            margin: "20px 10px 10px",
                            background: "red",
                          }}
                          onClick={() => {
                            deleteImage(item.linkId, id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <label className="add-image">
                        <input
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files[0].size > 300000) {
                              let limages = data.images;
                              limages[id].img = null;
                              let lmsg = data.msg;
                              lmsg[id].msg = "Image should not exceed 300kb";
                              setdata({
                                images: limages,
                                msg: lmsg,
                              });
                            } else {
                              let limages = data.images;
                              console.log(limages);
                              limages[id].img = e.target.files[0];
                              let lmsg = data.msg;
                              lmsg[id].msg = "";
                              setdata({
                                images: limages,
                                msg: lmsg,
                              });
                            }
                          }}
                        />
                        <Camera />
                        Upload Image
                      </label>
                    )}

                    {data?.msg[id]?.msg ? (
                      <span style={{ margin: "auto 20px", color: "red" }}>
                        {data?.msg[id]?.msg}
                      </span>
                    ) : null}
                  </div>
                </div>
              </>
            ))}
            <Button>Cancel order</Button>
          </div>
          <div className="priceDetails">
            <div>
              <div className="top">
                <p>
                  Order# {params.id} <span>({order.items.length} items)</span>
                </p>
                <p>
                  Order Placed On{" "}
                  {moment(order.date.toDate()).format("MMM Do YYYY")}
                </p>
                <p>Paid by Card via PayPal</p>
              </div>
              <div className="bottom">
                <h3>
                  Total Price <span>${Number(order.total).toFixed(2)}</span>
                </h3>
                <p>
                  bag total <span>${Number(order.total).toFixed(2)}</span>
                </p>
                <p>
                  bag discount <span>$0.00</span>
                </p>
                <p>
                  convinience fee<span>$0.00</span>
                </p>
              </div>
            </div>
            <div className="addressInfo">
              <span>Shipping to</span>
              <h3>{order.shipping_address.name}</h3>
              <p>{order.shipping_address.address1}</p>
              <p>
                {order.shipping_address.city} , {order.shipping_address.state}
              </p>
              <p>USA - {order.shipping_address.zipcode}</p>
              <p>
                phone : <strong>{order.user.user_phone}</strong>
              </p>
            </div>
            <div className="addressInfo">
              <span>Billing to</span>
              <h3>{order.billing_address.name}</h3>
              <p>{order.billing_address.address1}</p>
              <p>
                {order.billing_address.city} , {order.billing_address.state}
              </p>
              <p>USA - {order.billing_address.zipcode}</p>
              <p>
                phone : <strong>{order.user.user_phone}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDetail;
