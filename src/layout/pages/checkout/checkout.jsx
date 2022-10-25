import React from "react";
import "./checkout.css";
import image from "../../../assets/white-tee.jpg";
import visa from "../../../assets/visa.png";
import paypal from "../../../assets/paypal.png";

export default function Checkout() {
  const orderSummaryCard = () => {
    return (
      <div className="summary-card">
        <div className="summary">
          <img src={image} alt="" />
          <p>The Cloud Pant - Midnight Static</p>
        </div>
        <p className="price">$56</p>
        <p className="total">$56</p>
      </div>
    );
  };

  const addressCard = () => {
    return (
      <div className="address-card">
        <p>John Doe</p>
        <p>123, XYZ streeet, 123 456</p>
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

  return (
    <div className="checkout-page">
      <a href="/">
        <h1>NuTuYu72</h1>
      </a>
      <div className="order-summary">
        <h3>
          <span>Order Summary</span>
          <span>Price</span>
          <span>Total</span>
        </h3>
        {[1, 2].map((item) => orderSummaryCard())}
        <div className="total-sec">
          <span>Items total</span>
          <span>$112</span>
        </div>
      </div>
      <div className="addresses">
        <h3>
          <span>Delivery Address</span>
        </h3>
        <div className="address-container">
          <div className="saved-addresses">
            {[1, 2].map((item) => addressCard())}
          </div>
          <div className="new-address">
            <div>
              <p>First Name</p>
              <input type="text" />
            </div>
            <div>
              <p>Last Name</p>
              <input type="text" />
            </div>
            <div>
              <p>Email</p>
              <input type="text" />
            </div>
            <div>
              <p>Country</p>
              <input type="text" />
            </div>
            <div>
              <p>Address Line 1</p>
              <input type="text" />
            </div>
            <div>
              <p>Address Line 2</p>
              <input type="text" />
            </div>
            <div>
              <p>City</p>
              <input type="text" />
            </div>
            <div>
              <p>Zip / Postcode</p>
              <input type="text" />
            </div>
            <div>
              <p>Mobile Phone</p>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
      <div className="shipping">
        <h3>
          <span>Shipping</span>
        </h3>
        <div className="shipping-body">{shippingCard()}</div>
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
            By clicking place order and pay, you agree to purchase your item(s)
            from Global-e as merchant of record for this transaction, on
            Global-e's Terms and Conditions and Privacy Policy. Global-e is an
            international fulfilment service provider to Vitality.
          </p>
        </div>
        <div className="billing-summary">
          <h3>
            <span>Billing Summary</span>
          </h3>
          <div className="billing-body">
            <div className="billing-row">
              <span>Items total</span>
              <strong>$112.00</strong>
            </div>
            <div className="billing-row">
              <span>Shipping</span>
              <strong>$0.00</strong>
            </div>
            <div className="total-bill">
              <span>Total For Your Order</span>
              <strong>$112.00</strong>
            </div>
            <p>
              All applicable duties, taxes and fees are included in the total
              amount of your order. We guarantee you will not be required to pay
              any additional cost on delivery.
            </p>
          </div>
        </div>
      </div>
      <button type="button">Pay and place order</button>
      <h3>
        <span>Contact Us | Help | Terms & conditions | Privacy Policy</span>
      </h3>
    </div>
  );
}
