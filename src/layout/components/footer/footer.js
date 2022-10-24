import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <h3>Keep in touch!</h3>
          <p>News & updates from Anna Store. No spam, we promise.</p>
          <div className="newsletter">
            <input type="text" />
            <button>
              Sign Up<i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
        </div>
        <div className="footer-top-right">
          <ul>
            <li>Ordering & Payment</li>
            <li>Terms & Conditions</li>
            <li>Returns & Exchanges</li>
            <li>Delivery</li>
          </ul>
          <ul>
            <li>About Anna</li>
            <li>Stores & Hours</li>
            <li>Jobs @ Anna</li>
            <li>Contact Us</li>
          </ul>
          <div className="social-media-links">
            <ul>
              <li>
                <i className="fa-brands fa-facebook-f"></i>
                <span>Facebook</span>
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>
                <span>Instagram</span>
              </li>
              <li>
                <i className="fa-brands fa-pinterest-p"></i>
                <span>Pinterest</span>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
                <span>Twitter</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="by-text">
          By Augend Tech. Copyright Anna Park Limited.
        </div>
        <div className="payment-icons">
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/apple_pay-f6db0077dc7c325b436ecbdcf254239100b35b70b1663bc7523d7c424901fa09.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/diners_club-16436b9fb6dd9060edb51f1c7c44e23941e544ad798282d6aef1604319562fba.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/discover-cc9808e50193c7496e7a5245eb86d5e06f02e2476c0fe70f2c40016707d35461.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/google_pay-c66a29c63facf2053bf69352982c958e9675cabea4f2f7ccec08d169d1856b31.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/maestro-d2055c6b416c46cf134f393e1df6e0ba31722b623870f954afd392092207889c.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/paypal-49e4c1e03244b6d2de0d270ca0d22dd15da6e92cc7266e93eb43762df5aa355d.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/shopify_pay-100fde795157a3d1c18042346cf8dbd1fcf4c4f53c20064e13ea2799eb726655.svg"
              alt=""
            />
          </div>
          <div className="payment">
            <img
              src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
