import React, { useEffect, useState } from "react";
import NavDropDown from "../navDropDown/navDropDown";
import { Search, ShoppingBag, ShoppingCart, User } from "react-feather";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import "./navbar.css";
import { getDoc, doc, getFirestore } from "firebase/firestore";

function Navbar({ handleCart }) {
  const [categories, setCategories] = useState([]);

  const [dropDown, setdropDown] = useState([
    {
      name: "Menu 1",
      open: false,
      links: [
        "All Clothing",
        "Clothes",
        "Dresses",
        "Coats",
        "Jeans",
        "Jackets",
        "Jumpsuits",
        "Tops",
        "Trousers",
        "Shorts",
        "Shirts",
      ],
      p: [
        "ANNA'S PRODUCT OF THE WEEK",
        "EA Cho Tailored Blazer in Off White",
        "£359.00",
      ],
      image: image1,
    },
    {
      name: "Menu 2",

      open: false,
      links: [
        "All Clothing",
        "Bags",
        "Dresses",
        "Beauty",
        "Belts",
        "Gifts",
        "Hats",
        "Jewellery",
        "Sunglasses",
      ],
      p: [
        "ANNA'S FAVOURITE ACCESSORY",
        "R&P Hipke Scarf in Natural Check",
        "£35.00",
      ],
      image: image2,
    },
    {
      name: "Menu 3",
      open: false,

      links: [
        "All Shoes",
        "Boots",
        "Evening Shoes",
        "Heals",
        "Sandles",
        "Trainers",
      ],
      p: [
        "ANNA'S TOP SHOES",
        "SLF Fasta Chelsea Boot in Black",
        "£145.00 Sold Out",
      ],
      image: image3,
    },
    {
      name: "Menu 4",
      drop: false,
    },
    {
      name: "Menu 5",
      drop: false,
    },
    {
      name: "Menu 6",
      drop: false,
    },
    {
      name: "Menu 7",
      drop: false,
    },
    {
      name: "Menu 8",
      drop: false,
    },
    {
      name: "Menu 9",
      drop: false,
    },
  ]);

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
  }, []);

  return (
    <div className="Navbar">
      <div className="top">
        <div className="search">
          <Search />
          <input type="text" placeholder="Type here to search" />
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
            Account
            <User />
          </a>
          <a onClick={() => handleCart()}>
            Shopping Cart
            <ShoppingBag />
          </a>
        </div>
      </div>
      <div className="bottom">
        <a href={`/`}>Home</a>
        <a href={`/products/what's-new`}>What's new</a>
        {categories.map((item, id) => (
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
            />
          </a>
        ))}
        <a href={`/products/sold`}>Sold</a>
        <a href={`/nutuyu`}>#Nutuyu</a>
      </div>
    </div>
  );
}

export default Navbar;
