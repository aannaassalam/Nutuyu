import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./addresses.css";
function Addresses() {
  const [addAddress, setaddAddress] = useState(false);
  const [editAddress, seteditAddress] = useState(false);
  const [state, setstate] = useState({
    addAddress: false,
    editAddress: false,
  });
  return (
    <div className="Addresses">
      {!state.addAddress ? (
        <>
          <h2>Addresses</h2>
          <div className="addressList">
            <div className="address">
              <h3>Shipping Address</h3>
              <p>Salsaal</p>
              <p style={{ marginTop: "10px" }}>Address 1</p>
              <p>Address 2</p>
              <p>Kolkata , India</p>
              <p>700039</p>
              <div style={{ marginTop: "10px" }}>
                <p
                  onClick={() => {
                    setstate({ ...state, addAddress: true, editAddress: true });
                  }}
                >
                  Edit
                </p>
                <p>Delete</p>
              </div>
            </div>
            <div className="address">
              <h3>Billing Address</h3>
              <p>Salsaal</p>
              <p style={{ marginTop: "10px" }}>Address 1</p>
              <p>Address 2</p>
              <p>Kolkata , India</p>
              <p>700039</p>
              <div style={{ marginTop: "10px" }}>
                <p
                  onClick={() => {
                    setstate({ ...state, addAddress: true, editAddress: true });
                  }}
                >
                  Edit
                </p>
                <p>Delete</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setstate({ ...state, addAddress: true })}>
            Add new address
          </Button>
        </>
      ) : (
        <>
          <h2>{state.editAddress ? "Edit Address" : "Add New Address"}</h2>
          <div className="inputs">
            <TextField
              id="standard-basic"
              label="Full Name"
              variant="standard"
              type="text"
            />
            <TextField
              id="standard-basic"
              label="Address 1"
              variant="standard"
              type="text"
            />
            <TextField
              id="standard-basic"
              label="Address 2"
              variant="standard"
              type="text"
            />
            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              type="text"
            />
            <div className="twoInput">
              <TextField
                id="standard-basic"
                label="Country"
                variant="standard"
                type="text"
              />{" "}
              <TextField
                id="standard-basic"
                label="Province"
                variant="standard"
                type="text"
              />
            </div>
            <div className="twoInput">
              <TextField
                id="standard-basic"
                label="Zipcode"
                variant="standard"
                type="number"
              />{" "}
              <TextField
                id="standard-basic"
                label="Phone"
                variant="standard"
                type="number"
              />
            </div>
            <Button>
              {state.editAddress ? "Update Address" : "Add Address"}
            </Button>
            <p
              className="cancel"
              onClick={() =>
                setstate({ ...state, addAddress: false, editAddress: false })
              }
            >
              Cancel
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Addresses;
