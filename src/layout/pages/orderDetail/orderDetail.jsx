import React, { useEffect, useState } from "react";
import "./orderDetail.css";
import bag from "../../../assets/bag.png";
import image from "../../../assets/Black-tee.jpg";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import moment from "moment";
function OrderDetail() {
  const [order, setorder] = useState({});
  const [loading, setloading] = useState(true);
  const params = useParams();
  useEffect(() => {
    onSnapshot(doc(getFirestore(), "orders", params.id), (doc) => {
      setorder(doc.data());
      setloading(false);
    });
  }, []);
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
              <div className="details">
                <img src={item.images[0].image} alt="" />
                <div>
                  {" "}
                  <p>
                    <span className="changeFont">{item.name} </span>
                  </p>
                  <strong className="changeFont">
                    ${item.price.toFixed(2)}
                  </strong>
                  <p className="changeFont">
                    {item.highlights[0].key}{" "}
                    <strong>{item.highlights[0].value}</strong>
                  </p>
                  <p className="changeFont">Estimated Delivery : 02 November</p>
                </div>
              </div>
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
                  {moment(order.date.toDate()).format("MMM Do YY")}
                </p>
                <p>Paid by Card via PayPal</p>
              </div>
              <div className="bottom">
                <h3>
                  Total Price <span>${order.total.toFixed(2)}</span>
                </h3>
                <p>
                  bag total <span>${order.total.toFixed(2)}</span>
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
