import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./addresses.css";
import { useAuth } from "../../../hooks/useAuth";
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import Toaster from "../../../components/toaster/toaster";
function Addresses() {
  const [state, setstate] = useState({
    addAddress: false,
    editAddress: false,
    updateItem: "",
    selectedId: null,
  });
  const [message, setmessage] = useState(null);
  const initialValue = {
    name: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipcode: null,
    phone: null,
  };
  const [values, setvalues] = useState(initialValue);
  const user = useAuth().user;

  const handleChange = (name, value) => {
    setvalues({ ...values, [name]: value });
  };
  const AddAddress = (updateItem, action) => {
    if (
      values.name &&
      values.address1 &&
      values.state &&
      values.city &&
      values.zipcode &&
      values.phone
    ) {
      if (action === "add") {
        if (
          !user[updateItem].find((item) => item.address1 === values.address1)
        ) {
          var idName = updateItem === "shipping_addresses" ? "ship" : "bill";
          const localAddresss = {
            name: values.name,
            address1: values.address1,
            address2: values.address2,
            state: values.state,
            city: values.city,
            zipcode: values.zipcode,
            phone: values.phone,
            id:
              user[updateItem].length > 0
                ? `${idName}${
                    parseInt(
                      user[updateItem][
                        user[updateItem].length - 1
                      ].id.substring(4)
                    ) + 1
                  }`
                : idName + 1,
          };
          updateDoc(doc(getFirestore(), "users", user.id), {
            [updateItem]: [...user[updateItem], localAddresss],
          }).then(() => {
            setstate({
              ...state,
              addAddress: false,
              editAddress: false,
              updateItem: "",
              selectedId: null,
            });
            setvalues(initialValue);
          });
        } else {
          setmessage("Address Already Exists");
        }
      } else {
        if (
          user[updateItem].filter((item) => item.address1 === values.address1)
            .length < 1 ||
          user[updateItem][state.selectedId].address1 === values.address1
        ) {
          const updatableAddresss = {
            name: values.name,
            address1: values.address1,
            address2: values.address2,
            state: values.state,
            city: values.city,
            zipcode: values.zipcode,
            phone: values.phone,
            id: user[updateItem][state.selectedId].id,
          };
          const localAddresses = user[updateItem];
          localAddresses[state.selectedId] = updatableAddresss;
          updateDoc(doc(getFirestore(), "users", user.id), {
            [updateItem]: localAddresses,
          }).then(() => {
            setstate({
              ...state,
              addAddress: false,
              editAddress: false,
              updateItem: "",
              selectedId: null,
            });
            setvalues(initialValue);
          });
        } else {
          console.error("address exists");
        }
      }
    } else if (!values.name) {
      setmessage("Please Enter Name");
    } else if (!values.address1) {
      setmessage("Please Enter address1");
    } else if (!values.state) {
      setmessage("Please Enter state");
    } else if (!values.city) {
      setmessage("Please Enter city");
    } else if (!values.zipcode) {
      setmessage("Please Enter zipcode");
    } else if (!values.phone) {
      setmessage("Please Enter phone");
    }
  };
  const deletAddress = (updateItem, id) => {
    const localAddresses = user[updateItem].filter((item, idx) => id !== idx);
    updateDoc(doc(getFirestore(), "users", user.id), {
      [updateItem]: localAddresses,
    }).then(() => {
      console.log("done");
    });
  };
  return (
    <div className="Addresses">
      <Toaster message={message} />
      {!state.addAddress ? (
        <>
          <h2>Addresses</h2>
          <div className="addressCategory">
            <div className="shippingAddress">
              <h3>Shipping Address</h3>
              <div className="addressList">
                {user?.shipping_addresses.map((item, id) => (
                  <div className="address">
                    <p>{item.name}</p>
                    <p style={{ marginTop: "10px" }}> {item.address1}</p>
                    <p>{item.address2}</p>
                    <p>
                      {item.city}, {item.state}
                    </p>
                    <p>{item.zipcode}</p>
                    <p>{item.phone}</p>

                    <div style={{ marginTop: "10px" }}>
                      <p
                        onClick={() => {
                          setstate({
                            ...state,
                            addAddress: true,
                            editAddress: true,
                            updateItem: "shipping_addresses",
                            selectedId: id,
                          });
                          setvalues({
                            name: user.shipping_addresses[id].name,
                            address1: user.shipping_addresses[id].address1,
                            address2: user.shipping_addresses[id].address2,
                            state: user.shipping_addresses[id].state,
                            city: user.shipping_addresses[id].city,
                            zipcode: user.shipping_addresses[id].zipcode,
                            phone: user.shipping_addresses[id].phone,
                          });
                        }}
                      >
                        Edit
                      </p>
                      <p
                        onClick={() => {
                          setstate({
                            ...state,
                            selectedId: item.id,
                          });
                          deletAddress("shipping_addresses", id);
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() =>
                  setstate({
                    ...state,
                    addAddress: true,
                    updateItem: "shipping_addresses",
                  })
                }
              >
                Add new address
              </Button>
            </div>
            <div className="billingAddress">
              <h3>Billing Address</h3>
              <div className="addressList">
                {user?.billing_addresses.map((item, id) => (
                  <div className="address">
                    <p>{item.name}</p>
                    <p style={{ marginTop: "10px" }}> {item.address1}</p>
                    <p>{item.address2}</p>
                    <p>
                      {item.city}, {item.state}
                    </p>
                    <p>{item.zipcode}</p>
                    <p>{item.phone}</p>

                    <div style={{ marginTop: "10px" }}>
                      <p
                        onClick={() => {
                          setstate({
                            ...state,
                            addAddress: true,
                            editAddress: true,
                            updateItem: "billing_addresses",
                            selectedId: id,
                          });
                          setvalues({
                            name: user.billing_addresses[id].name,
                            address1: user.billing_addresses[id].address1,
                            address2: user.billing_addresses[id].address2,
                            state: user.billing_addresses[id].state,
                            city: user.billing_addresses[id].city,
                            zipcode: user.billing_addresses[id].zipcode,
                            phone: user.billing_addresses[id].phone,
                          });
                        }}
                      >
                        Edit
                      </p>
                      <p
                        onClick={() => {
                          setstate({
                            ...state,
                            selectedId: item.id,
                          });
                          deletAddress("billing_addresses", id);
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() =>
                  setstate({
                    ...state,
                    addAddress: true,
                    updateItem: "billing_addresses",
                  })
                }
              >
                Add new address
              </Button>
            </div>
          </div>
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
              value={values.name}
              onChange={(e) => {
                handleChange("name", e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Address 1"
              variant="standard"
              type="text"
              value={values.address1}
              onChange={(e) => {
                handleChange("address1", e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Address 2 ( Optional )"
              variant="standard"
              type="text"
              value={values.address2}
              onChange={(e) => {
                handleChange("address2", e.target.value);
              }}
            />

            <div className="twoInput">
              <TextField
                id="standard-basic"
                label="State"
                variant="standard"
                type="text"
                value={values.state}
                onChange={(e) => {
                  handleChange("state", e.target.value);
                }}
              />{" "}
              <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                type="text"
                value={values.city}
                onChange={(e) => {
                  handleChange("city", e.target.value);
                }}
              />
            </div>
            <div className="twoInput">
              <TextField
                id="standard-basic"
                label="Zipcode"
                variant="standard"
                type="number"
                value={values.zipcode}
                onChange={(e) => {
                  handleChange("zipcode", e.target.value);
                }}
              />{" "}
              <TextField
                id="standard-basic"
                label="Phone"
                variant="standard"
                type="number"
                value={values.phone}
                onChange={(e) => {
                  handleChange("phone", e.target.value);
                }}
              />
            </div>
            <Button
              onClick={() =>
                AddAddress(
                  state.updateItem,
                  state.editAddress ? "update" : "add"
                )
              }
            >
              {state.editAddress ? "Update Address" : "Add Address"}
            </Button>
            <p
              className="cancel"
              onClick={() => {
                setstate({
                  ...state,
                  addAddress: false,
                  editAddress: false,
                  updateItem: "",
                  selectedId: null,
                });
                setvalues(initialValue);
              }}
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
