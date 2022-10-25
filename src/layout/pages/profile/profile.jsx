import React, { useState } from "react";
import "./profile.css";
import ProfileDetails from "./profileDetails/profileDetails";
import OrderHsitory from "./orders/orders";
import Addresses from "./addresses/addresses";
function Profile() {
  const [tabs, settabs] = useState(0);
  return (
    <div className="Profile">
      <h1 className="welcome">WELCOME BACK, JOHN</h1>
      <div className="container">
        <div className="left">
          <p onClick={() => settabs(0)}>profile </p>
          <p onClick={() => settabs(1)}>orders</p>
          <p onClick={() => settabs(2)}>addresses</p>
          <p>logout</p>
        </div>
        <div className="right">
          {tabs === 0 ? (
            <ProfileDetails />
          ) : tabs === 1 ? (
            <OrderHsitory />
          ) : tabs === 2 ? (
            <Addresses />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
