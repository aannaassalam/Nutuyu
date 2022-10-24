import { Button } from "@mui/material";
import React from "react";
import "./addresses.css";
function Addresses() {
  return (
    <div className="Addresses">
      <h2>Addresses</h2>
      <div className="addressList">
        <div className="address">
          <h3>Deafult Address</h3>
          <p>Salsaal</p>
          <p style={{ marginTop: "10px" }}>Address 1</p>
          <p>Address 2</p>
          <p>Kolkata , India</p>
          <p>700039</p>
          <div style={{ marginTop: "10px" }}>
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>
        <div className="address">
          <h3>Alternate Address</h3>
          <p>Salsaal</p>
          <p style={{ marginTop: "10px" }}>Address 1</p>
          <p>Address 2</p>
          <p>Kolkata , India</p>
          <p>700039</p>
          <div style={{ marginTop: "10px" }}>
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>
      </div>
      <Button>Add new address</Button>
    </div>
  );
}

export default Addresses;
