import React, { useEffect, useState } from "react";
import NavDropDown from "../navDropDown/navDropDown";
import {
  Crosshair,
  Menu,
  Minus,
  MinusCircle,
  Plus,
  PlusCircle,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "react-feather";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import "./navbar.css";
import { getDoc, doc, getFirestore } from "firebase/firestore";

function Navbar({ handleCart }) {
  const [categories, setCategories] = useState([]);
  const [nav, setnav] = useState(false);
  const [width, setwidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setwidth(window.innerWidth);
    });
  }, []);

  const [dropDown, setdropDown] = useState([]);

  useEffect(() => {
    getDoc(doc(getFirestore(), "settings", "dMsgyXwanQY5tnH075J0")).then(
      (doc) =>
        setCategories(
          doc.data().categories.map((category) => {
            category.open = false;
            return category;
          })
        )
    );
    window.addEventListener("resize", () => {
      setwidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="Navbar">
      <div className="top">
        <div className="search">
          <span
            className="menu"
            onClick={() => {
              setnav(true);
            }}
          >
            <Menu />
            <span>Menu</span>
          </span>
          <Search className="hide" />
          <input
            type="text"
            className="hide"
            placeholder="Type here to search"
          />
        </div>
        <h1
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          NuTuYu72
        </h1>
        <div className="accCart">
          <a href="/profile">
            <span className="hide">Account</span>
            <User />
          </a>
          <a onClick={() => handleCart()}>
            <span className="hide">Shopping Cart</span>
            <ShoppingBag />
          </a>
        </div>
      </div>
      <div className={nav ? "visibleBottom bottom" : "bottom"}>
        {width > 970 ? null : (
          <span
            className="crossIcon"
            onClick={() => {
              setnav(false);
            }}
          >
            <X />
          </span>
        )}
        <a href={`/`}>Home</a>
        <a href={`/products/what's-new`}>What's new</a>
        {categories.map((item, id) => (
          <>
            {width > 970 ? (
              <a
                href={`/products/${item.name}`}
                onMouseOver={() => {
                  var arr = [...categories];
                  arr[id].open = true;
                  setCategories(arr);
                }}
                onMouseLeave={() => {
                  var arr = [...categories];
                  arr[id].open = false;
                  setCategories(arr);
                }}
              >
                {item.name}
                <NavDropDown
                  open={item.open}
                  links={item.subcategories}
                  p={item.p}
                  image={image1}
                  drop={item.subcategories?.length}
                  name={item.name}
                  types={item.types}
                />
              </a>
            ) : (
              <>
                <a href={`/products/${item.name}`} className="fullWidth">
                  {item.name}{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      var check = dropDown.includes(id);
                      if (check)
                        setdropDown(dropDown.filter((el) => el !== id));
                      else setdropDown([...dropDown, id]);
                    }}
                  >
                    {dropDown.includes(id) ? <Minus /> : <Plus />}
                  </span>{" "}
                </a>
                {dropDown.includes(id) ? (
                  <>
                    {" "}
                    {item.subcategories.map((sub) => (
                      <a
                        className="innerItem"
                        href={`/products/${item.name}/${sub.name}`}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </>
                ) : null}
              </>
            )}
          </>
        ))}
        <a href={`/products/sold`}>Sold</a>
        <a href={`/nutuyu`}>#Nutuyu</a>
      </div>
    </div>
  );
}

export default Navbar;
