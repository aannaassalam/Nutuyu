import React, { useState } from "react";
import "./navDropDown.css";
function NavDropDown({ open, links, p, image, drop, name, types }) {
  const [dropDown, setdropDown] = useState(false);

  const mapSubcategories = (type) => {
    return (
      <div>
        {links
          ?.filter((link) => link.type === type)
          .map((item) => (
            <a
              href={`/products/${name}/${item.type ? item.type + "/" : ""}${
                item.name
              }`}
            >
              {item.name}
            </a>
          ))}
      </div>
    );
  };

  return (
    <>
      {drop === false ? null : (
        <div
          className={open || dropDown ? "NavDropDown open" : "NavDropDown"}
          onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)}
        >
          {types.length > 0 ? (
            types.map((type, idx) => {
              return (
                type && (
                  <div className="productList" key={idx}>
                    <a href={`/products/${name}/${type}/all`}>
                      <h4>{type}</h4>
                    </a>
                    {mapSubcategories(type)}
                  </div>
                )
              );
            })
          ) : (
            <div className="productList">
              <h4>Products</h4>
              <div>
                {links?.map((item, idx) => (
                  <a
                    href={`/products/${name}/${
                      item.type ? item.type + "/" : ""
                    }${item.name}`}
                    key={idx}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
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
