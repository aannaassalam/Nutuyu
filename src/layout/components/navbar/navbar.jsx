import React, { useState } from "react";
import NavDropDown from "../navDropDown/navDropDown";
import { Search, ShoppingBag, ShoppingCart, User } from "react-feather";
import "./navbar.css";
function Navbar() {
  const [dropDown, setdropDown] = useState(false);
  return (
    <div className="Navbar">
      <div className="top">
        <div className="search">
          <Search />
          <input type="text" placeholder="Type here to search" />
        </div>
        <h1 className="logo">LOGO</h1>
        <div className="accCart">
          <a href="">
            Account
            <User />
          </a>
          <a href="">
            Your Bag
            <ShoppingBag />
          </a>
        </div>
      </div>
      <div className="bottom">
        <a
          href="/"
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 1
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 2
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 3
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 4
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 5
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 6
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 7
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 8
          <NavDropDown open={dropDown} />
        </a>
        <a
          href=""
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          Menu 9
          <NavDropDown open={dropDown} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
