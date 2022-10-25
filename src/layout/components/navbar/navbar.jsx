import React, { useState } from "react";
import NavDropDown from "../navDropDown/navDropDown";
import { Search, ShoppingBag, ShoppingCart, User } from "react-feather";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";

import "./navbar.css";
function Navbar({ handleCart }) {
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
            Your Bag
            <ShoppingBag />
          </a>
        </div>
      </div>
      <div className="bottom">
        {dropDown.map((item, id) => (
          <a
            href={`/products/${item.name}`}
            onMouseOver={() => {
              var arr = [...dropDown];
              arr[id].open = true;
              setdropDown(arr);
            }}
            onMouseLeave={() => {
              var arr = [...dropDown];
              arr[id].open = false;
              setdropDown(arr);
            }}
          >
            {item.name}
            <NavDropDown
              open={item.open}
              links={item.links}
              p={item.p}
              image={item.image}
              drop={item.drop}
              name={item.name}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
