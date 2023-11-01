import React, { useEffect, useState } from "react";
import "../../pages/profile/orders/order.css";
import Black from "../../../assets/Black-tee.jpg";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import moment from "moment";
function OrderCard({ Orderid }) {
  const user = useAuth().user;
  const [orderCard, setorderCard] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    onSnapshot(doc(getFirestore(), "orders", Orderid), (doc) => {
      setorderCard(doc.data());
      setloading(false);
    });
  }, []);
  return (
    <>
      {loading ? null : (
        <a href={`/orderDetail/${Orderid}`} className="orderList">
          <div className="part1">
            <img
              src={orderCard?.items[0]?.variance.images[0]?.image}
              alt="img"
            />
            {/* <p className="deliveryState">{!orderCard?.delivered && "Cancel"}</p> */}
          </div>

          <div className="left">
            <div className="part2">
              <h4>
                {orderCard?.items.length > 1
                  ? `${orderCard?.items[0].name} & ${
                      orderCard?.items.length - 1
                    } more`
                  : orderCard?.items[0]?.name}
              </h4>
              <span className="date1">
                {moment(orderCard?.date.toDate()).format("MMM Do YY")}
              </span>
            </div>

            <div className="part3">
              <div className="order-info">
                <h4>Order ID</h4>
                <span
                  style={{
                    width: 80,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {Orderid}
                </span>
              </div>
              <div className="order-info">
                <h4>Amount</h4>
                <span>${orderCard?.total}</span>
              </div>
              <div className="order-info">
                <h4>Payment</h4>
                <span>
                  <div>
                    <span className="cod">COD</span>
                    <span>Cash On Delivery</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </a>
      )}
    </>
  );
}

export default OrderCard;
