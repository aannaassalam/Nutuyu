import React, { useEffect, useState } from "react";
import NavDropDown from "../navDropDown/navDropDown";
import {
  ArrowUpRight,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  User,
  X,
} from "react-feather";
import image1 from "../../../assets/image1.png";
import "./navbar.css";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { useProducts } from "../../hooks/useProducts";

function Navbar({ handleCart }) {
  const [categories, setCategories] = useState([]);
  const [nav, setnav] = useState(false);
  const [width, setwidth] = useState(window.innerWidth);
  const [dropDown, setdropDown] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const user = useAuth();
  const products = useProducts().products;
  useEffect(() => {
    window.addEventListener("resize", () => {
      setwidth(window.innerWidth);
    });
  }, []);

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
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
          />
          {searchValue ? (
            <div className="searchList hide">
              <p>Search Results</p>
              {products
                .filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((prod) => (
                  <a href={`/product/${prod.id}`}>
                    {prod.name} <ArrowUpRight />
                  </a>
                ))}
            </div>
          ) : null}
        </div>
        <h1
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          NuTuYu72
        </h1>
        <div className="accCart">
          <a href={user.user ? "/profile" : "/login"}>
            <span className="hide">
              {user.user ? "Account" : "Login/Register"}
            </span>
            <User />
          </a>
          <a onClick={handleCart}>
            <span className="hide">Shopping Cart</span>
            <ShoppingBag />
          </a>
        </div>
      </div>
      <div className={nav ? "visibleBottom bottom" : "bottom"}>
        {width > 1080 ? null : (
          <span
            className="crossIcon"
            onClick={() => {
              setnav(false);
              setsearchValue("");
            }}
          >
            <X />
          </span>
        )}
        <a href={`/`}>Home</a>
        <a href={`/products/what's-new`}>What's new</a>
        {categories.map((item, id) => (
          <>
            {width > 1080 ? (
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
                    {item.types.length > 0 ? (
                      <>
                        {item.types.map((type) => (
                          <>
                            <p
                              style={{
                                fontWeight: "bold",
                                padding: "5px 10px",
                              }}
                            >
                              {type}
                            </p>
                            {item.subcategories
                              .filter((subItem) => type === subItem.type)
                              .map((sub) => (
                                <a
                                  className="innerItem"
                                  href={`/products/${item.name}/${type}/${sub.name}`}
                                >
                                  {sub.name}
                                </a>
                              ))}
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        {item.subcategories.map((sub) => (
                          <a
                            className="innerItem"
                            href={`/products/${item.name}/${sub.name}`}
                          >
                            {sub.name}
                          </a>
                        ))}
                      </>
                    )}
                  </>
                ) : null}
              </>
            )}
          </>
        ))}
        <a href={`/products/sold`}>Sold</a>
        <a href={`/nutuyu`}>#Nutuyu</a>
        <div className="search">
          <Search className="" />
          <input
            type="text"
            className="responsiveInput"
            placeholder="Type here to search"
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
          />
        </div>
      </div>
      {searchValue ? (
        <div className="searchList">
          <p>Search Results</p>
          {products
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((prod) => (
              <a href={`/product/${prod.id}`}>
                {prod.name} <ArrowUpRight />
              </a>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
