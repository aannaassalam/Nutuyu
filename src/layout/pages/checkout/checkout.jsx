import React, { useEffect, useRef, useState } from "react";
import "./checkout.css";
import image from "../../../assets/white-tee.jpg";
import visa from "../../../assets/visa.png";
import paypal from "../../../assets/paypal.png";
import { useAuth } from "../../hooks/useAuth";
import { useProducts } from "../../hooks/useProducts";
import { useParams } from "react-router";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@mui/material";

export default function Checkout() {
  const user = useAuth().user;
  const products = useProducts().products;
  const params = useParams();
  const checkRef = useRef();
  const [state, setstate] = useState({
    billing: false,
    shipping: false,
    checkbox: false,
    selectedShipping: {},
    selectedBilling: {},
  });
  const [message, setmessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
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
  const [values2, setvalues2] = useState(initialValue);

  useEffect(() => {
    if (
      (user?.cart.length === 0 && params.id) ||
      (user?.cart.length > 0 && !params.id) ||
      (user?.cart.length > 0 && params.id)
    )
      params.id
        ? setTotalPrice(
            products.find((prod) => prod.id === atob(params.id)).price
          )
        : user.cart.forEach((item) => {
            setTotalPrice(
              (prev) =>
                prev + products.find((product) => product.id === item).price
            );
          });
    else {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (name, value, changeItemType) => {
    if (changeItemType === "billingChange")
      setvalues2({ ...values2, [name]: value });
    else setvalues({ ...values, [name]: value });
  };
  const placeOrder = () => {
    if (
      (state.selectedBilling.address1 && state.selectedShipping.address1) ||
      (state.selectedShipping.address1 && checkRef.current.checked)
    ) {
      addDoc(collection(getFirestore(), "orders"), {
        date: new Date(),
        items: params.id
          ? [products.find((prod) => prod.id === atob(params.id))]
          : user.cart.map((item) => products.find((prod) => prod.id === item)),
        user: {
          user_id: user.id,
          user_email: user.email,
          user_phone: user.phone_number,
        },
        shipping_address: state.selectedShipping,
        billing_address: checkRef.current.checked
          ? state.selectedShipping
          : state.selectedBilling,
        total: parseInt(totalPrice),
        paid: true,
      }).then((docRef) => {
        updateDoc(doc(getFirestore(), "users", user.id), {
          orders: [...user.orders, docRef.id],
        }).then(() => {
          console.log(96);
          params.id
            ? updateDoc(
                doc(getFirestore(), "products", atob(params.id), {
                  sold: true,
                })
              ).then(() => {
                console.log("added");
                window.location.pathname = `orderDetail/${docRef.id}`;
              })
            : user.cart.forEach((item) => {
                updateDoc(doc(getFirestore(), "products", item), {
                  sold: true,
                }).then(() => {
                  updateDoc(doc(getFirestore(), "users", user.id), {
                    cart: [],
                  }).then(() => {
                    console.log("added");
                    window.location.pathname = `orderDetail/${docRef.id}`;
                  });
                });
              });
        });
      });
    } else if (!state.selectedBilling.address1) {
      setmessage("Select Billing Address");
    } else if (!state.selectedShipping.address1) {
      setmessage("Select Shipping Address");
    }
  };
  const AddAddress = (updateItem) => {
    const localValues = updateItem === "shipping_addresses" ? values : values2;
    console.log(localValues);
    if (
      localValues.name &&
      localValues.address1 &&
      localValues.state &&
      localValues.city &&
      localValues.zipcode &&
      localValues.phone
    ) {
      console.log(2);
      if (
        !user[updateItem].find((item) => item.address1 === localValues.address1)
      ) {
        var idName = updateItem === "shipping_addresses" ? "ship" : "bill";
        const localAddresss = {
          name: localValues.name,
          address1: localValues.address1,
          address2: localValues.address2,
          state: localValues.state,
          city: localValues.city,
          zipcode: localValues.zipcode,
          phone: localValues.phone,
          id:
            user[updateItem].length > 0
              ? `${idName}${
                  parseInt(
                    user[updateItem][user[updateItem].length - 1].id.substring(
                      4
                    )
                  ) + 1
                }`
              : idName + 1,
        };
        updateDoc(doc(getFirestore(), "users", user.id), {
          [updateItem]: [...user[updateItem], localAddresss],
        }).then(() => {
          if (updateItem === "shipping_addresses") {
            setstate({
              ...state,
              shipping: false,
            });
            setvalues(initialValue);
          } else {
            setstate({
              ...state,
              billing: false,
            });
            setvalues2(initialValue);
          }
          console.log("added");
        });
      } else {
        setmessage("Address Already Exists");
      }
    } else if (!localValues.name) {
      setmessage("Please Enter Name");
    } else if (!localValues.address1) {
      setmessage("Please Enter address1");
    } else if (!localValues.state) {
      setmessage("Please Enter state");
    } else if (!localValues.city) {
      setmessage("Please Enter city");
    } else if (!localValues.zipcode) {
      setmessage("Please Enter zipcode");
    } else if (!localValues.phone) {
      setmessage("Please Enter phone");
    }
  };
  console.log(totalPrice);

  const orderSummaryCard = (item) => {
    const product = products.find((prod) => prod.id === item);
    return (
      <div className="summary-card">
        <div className="summary">
          <img src={product.images[0].image} alt="" />
          <p>{product.name}</p>
        </div>
        <p className="price">${product.price}</p>
        <p className="total">${product.price}</p>
      </div>
    );
  };

  const addressCard = (item, updateItem) => {
    return (
      <div
        onClick={() => {
          if (!checkRef?.current?.checked) {
            setstate({ ...state, [updateItem]: item });
          } else if (updateItem === "selectedShipping")
            setstate({ ...state, [updateItem]: item });
        }}
        className={
          checkRef?.current?.checked && updateItem === "selectedBilling"
            ? "address-card disable"
            : state[updateItem].address1 === item.address1
            ? "address-card active"
            : "address-card"
        }
      >
        <p>{item.name}</p>
        <p>{item.address1}</p>
      </div>
    );
  };

  const shippingCard = () => {
    return (
      <div className="shipping-card">
        <input type="radio" name="" id="" />
        <div className="type-of-service">
          <p>Free</p>
        </div>
        <p>Express Courier (Air)</p>
        <p>4 to 5 business days</p>
      </div>
    );
  };
  console.log(atob(params.id));
  return (
    <div className="checkout-page">
      {totalPrice && (
        <>
          <a href="/">
            <h1>NuTuYu72</h1>
          </a>
          <div className="order-summary">
            <h3>
              <span>Order Summary</span>
              <span>Price</span>
              <span>Total</span>
            </h3>
            {params.id
              ? orderSummaryCard(atob(params.id))
              : user.cart.map((item) => orderSummaryCard(item))}
            <div className="total-sec">
              <span>Items total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
          <div className="addresses">
            <h3>
              <span>Delivery Address</span>
            </h3>
            <div className="address-container">
              <div className="saved-addresses">
                <h3>Shipping Address</h3>
                {!state.shipping ? (
                  <>
                    {user?.shipping_addresses.map((item) =>
                      addressCard(item, "selectedShipping")
                    )}
                    <Button
                      onClick={() => {
                        setstate({ ...state, shipping: true });
                      }}
                    >
                      Add New Address
                    </Button>
                  </>
                ) : (
                  <div className="new-address">
                    <div>
                      <p>First Name</p>
                      <input
                        type="text"
                        value={values.name}
                        onChange={(e) => {
                          handleChange("name", e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <p>Address Line 1</p>
                      <input
                        type="text"
                        value={values.address1}
                        onChange={(e) => {
                          handleChange("address1", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <p>Address Line 2</p>
                      <input
                        type="text"
                        value={values.address2}
                        onChange={(e) => {
                          handleChange("address2", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <p>State</p>
                      <input
                        type="text"
                        value={values.state}
                        onChange={(e) => {
                          handleChange("state", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <p>City</p>
                      <input
                        type="text"
                        value={values.city}
                        onChange={(e) => {
                          handleChange("city", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <p>Zip / Postcode</p>
                      <input
                        type="number"
                        value={values.zipcode}
                        onChange={(e) => {
                          handleChange("zipcode", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <p>Mobile Phone</p>
                      <input
                        type="number"
                        value={values.phone}
                        onChange={(e) => {
                          handleChange("phone", e.target.value);
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        setstate({ ...state, shipping: false });
                        setvalues(initialValue);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => AddAddress("shipping_addresses")}>
                      Add Address
                    </Button>
                  </div>
                )}
              </div>
              {/* billing */}
              <div className="saved-addresses">
                <h3>Billing Address</h3>
                <label
                  onClick={() => {
                    setstate({ ...state });
                  }}
                >
                  <input type="checkbox" ref={checkRef} />
                  Select As Shipping Address
                </label>
                {!state.billing ? (
                  <>
                    {user?.billing_addresses.map((item) =>
                      addressCard(item, "selectedBilling")
                    )}
                    <Button
                      onClick={() => {
                        setstate({ ...state, billing: true });
                      }}
                    >
                      Add New Address
                    </Button>
                  </>
                ) : (
                  <div className="new-address">
                    <div>
                      <p>First Name</p>
                      <input
                        type="text"
                        value={values2.name}
                        onChange={(e) => {
                          handleChange("name", e.target.value, "billingChange");
                        }}
                      />
                    </div>

                    <div>
                      <p>Address Line 1</p>
                      <input
                        type="text"
                        value={values2.address1}
                        onChange={(e) => {
                          handleChange(
                            "address1",
                            e.target.value,
                            "billingChange"
                          );
                        }}
                      />
                    </div>
                    <div>
                      <p>Address Line 2</p>
                      <input
                        type="text"
                        value={values2.address2}
                        onChange={(e) => {
                          handleChange(
                            "address2",
                            e.target.value,
                            "billingChange"
                          );
                        }}
                      />
                    </div>
                    <div>
                      <p>State</p>
                      <input
                        type="text"
                        value={values2.state}
                        onChange={(e) => {
                          handleChange(
                            "state",
                            e.target.value,
                            "billingChange"
                          );
                        }}
                      />
                    </div>
                    <div>
                      <p>City</p>
                      <input
                        type="text"
                        value={values2.city}
                        onChange={(e) => {
                          handleChange("city", e.target.value, "billingChange");
                        }}
                      />
                    </div>
                    <div>
                      <p>Zip / Postcode</p>
                      <input
                        type="number"
                        value={values2.zipcode}
                        onChange={(e) => {
                          handleChange(
                            "zipcode",
                            e.target.value,
                            "billingChange"
                          );
                        }}
                      />
                    </div>
                    <div>
                      <p>Mobile Phone</p>
                      <input
                        type="number"
                        value={values2.phone}
                        onChange={(e) => {
                          handleChange(
                            "phone",
                            e.target.value,
                            "billingChange"
                          );
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        setstate({ ...state, billing: false });
                        setvalues2(initialValue);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => AddAddress("billing_addresses")}>
                      Add Address
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="payment-container">
            <div className="payment">
              <h3>
                <span>Payment</span>
              </h3>
              <p>Please choose your payment method</p>
              <div className="payment-options">
                <div>
                  <img src={visa} alt="" />
                </div>
                <div>
                  <img src={paypal} alt="" />
                </div>
              </div>
              <div className="payment-box">
                {/* <img src={} alt="" /> */}
                <div className="input-row">
                  <p>Card number</p>
                  <input type="text" />
                </div>
                <div className="input-row">
                  <p>Expiry date</p>
                  <div
                    style={{
                      width: "60%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "auto",
                    }}
                  >
                    <select>
                      <option value="">Month</option>
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                      <option value="4">04</option>
                      <option value="5">05</option>
                      <option value="6">06</option>
                      <option value="7">07</option>
                      <option value="8">08</option>
                      <option value="9">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <select>
                      <option value="">Year</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                    </select>
                  </div>
                </div>
                <div className="input-row">
                  <p>Security Code</p>
                  <div
                    style={{
                      width: "60%",
                      display: "flex",
                      marginLeft: "auto",
                    }}
                  >
                    <input type="text" />
                  </div>
                </div>
              </div>
              <p>
                By clicking place order and pay, you agree to purchase your
                item(s) from Global-e as merchant of record for this
                transaction, on Global-e's Terms and Conditions and Privacy
                Policy. Global-e is an international fulfilment service provider
                to Vitality.
              </p>
            </div>
            <div className="billing-summary">
              <h3>
                <span>Billing Summary</span>
              </h3>
              <div className="billing-body">
                <div className="billing-row">
                  <span>Items total</span>
                  <strong>${Number(totalPrice).toFixed(2)}</strong>
                </div>
                <div className="billing-row">
                  <span>Shipping</span>
                  <strong>$0.00</strong>
                </div>
                <div className="total-bill">
                  <span>Total For Your Order</span>
                  <strong>${Number(totalPrice).toFixed(2)}</strong>
                </div>
                <p>
                  All applicable duties, taxes and fees are included in the
                  total amount of your order. We guarantee you will not be
                  required to pay any additional cost on delivery.
                </p>
              </div>
            </div>
          </div>
          <button type="button" onClick={() => placeOrder()}>
            Pay and place order
          </button>
          <h3>
            <span>Contact Us | Help | Terms & conditions | Privacy Policy</span>
          </h3>
        </>
      )}
    </div>
  );
}
