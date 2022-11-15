import React, { useEffect } from "react";
import "./order.css";
import { onSnapshot } from "firebase/firestore";
import OrderCard from "../../../components/orderCard/orderCard";
import { useAuth } from "../../../hooks/useAuth";
function Orders() {
  const user = useAuth().user;

  return (
    <div className="Orders">
      <h2>Orders</h2>
      {user.orders.map((item, id) => (
        <OrderCard Orderid={item} key={id} />
      ))}
    </div>
  );
}

export default Orders;
