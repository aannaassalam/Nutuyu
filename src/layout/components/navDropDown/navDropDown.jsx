import React, { useState } from "react";
import "./navDropDown.css";
function NavDropDown({ open, links, p, image, drop, name }) {
  const [dropDown, setdropDown] = useState(false);

  return (
    <>
      {drop === false ? null : (
        <div
          className={open || dropDown ? "NavDropDown open" : "NavDropDown"}
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          <div className="productList">
            <h4>Products</h4>
            <div>
              {links?.map((item) => (
                <a href={`/products/${name}/${item}`}>{item}</a>
              ))}
            </div>
          </div>
          <div className="imageSide">
            <img src={image ? image : null} alt="" />
            {p?.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NavDropDown;
