import React, { useState } from "react";
import "./profile.css";
import ProfileDetails from "./profileDetails/profileDetails";
import OrderHsitory from "./orders/orders";
import { getAuth, signOut } from "firebase/auth";
import Addresses from "./addresses/addresses";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const [tabs, settabs] = useState(1);
  const user = useAuth().user;
  if (!user?.loading && !user) {
    window.location.href = "/";
  }

  return (
    <div className="Profile">
      <h1 className="welcome">WELCOME BACK, {user?.full_name}</h1>
      <div className="container">
        <div className="left">
          <p onClick={() => settabs(0)} className={tabs === 0 ? "active" : ""}>
            profile{" "}
          </p>
          <p onClick={() => settabs(1)} className={tabs === 1 ? "active" : ""}>
            orders
          </p>
          <p onClick={() => settabs(2)} className={tabs === 2 ? "active" : ""}>
            addresses
          </p>
          <p
            onClick={() =>
              signOut(getAuth())
                .then(() => (window.location.href = "/"))
                .catch((err) => console.log(err))
            }
          >
            logout
          </p>
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
