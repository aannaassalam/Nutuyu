import React, { useState } from "react";
import "./products.css";
import ProductCard from "../../components/productCard/productCard";
import { Plus } from "react-feather";
import { useParams } from "react-router-dom";
function Products(props) {
  const arr = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const [state, setstate] = useState({
    filterOptions: false,
    sortOptions: false,
  });
  const params = useParams();

  return (
    <div className="Products">
      <div className="breadCrumb">
        <a href="/">Home</a>
        {">"}
        <a href={`/products/${params.category}`}>{params.category}</a>
        {params.subcategory && (
          <>
            {">"}
            <a href={`/products/${params.subcategory}`}>{params.subcategory}</a>
          </>
        )}
      </div>
      <h1 className="displayName">{params.subcategory || params.category}</h1>
      <div className="filterSection">
        <button
          onClick={() =>
            setstate({ ...state, filterOptions: !state.filterOptions })
          }
        >
          <Plus />
          <span>Filter</span>
        </button>
        <button
          onClick={() =>
            setstate({ ...state, sortOptions: !state.sortOptions })
          }
        >
          <span>Sort By</span>
          <Plus />
          <div
            className={state.sortOptions ? "sortOptions open" : "sortOptions"}
          >
            <p>Best Selling</p>
            <p>A to Z</p>
            <p>Z to A</p>
            <p>Price Low To High</p>
            <p>Price High To Low</p>
          </div>
        </button>
      </div>
      <div
        className={
          state.filterOptions
            ? "productListingWrapper fourfr"
            : "productListingWrapper"
        }
      >
        {state.filterOptions ? (
          <div className="filterOptions">
            <div className="optionList">
              <h3>Gender</h3>
              <label>
                <input type="checkbox" />
                Male
              </label>
              <label>
                <input type="checkbox" />
                Female
              </label>
            </div>
            <div className="optionList">
              <h3>Styles</h3>
              <label>
                <input type="checkbox" />
                Tanks
              </label>
              <label>
                <input type="checkbox" />
                Shirts
              </label>
              <label>
                <input type="checkbox" />
                Shorts
              </label>{" "}
              <label>
                <input type="checkbox" />
                Joggers
              </label>{" "}
              <label>
                <input type="checkbox" />
                Hoodies
              </label>{" "}
              <label>
                <input type="checkbox" />
                Jackets
              </label>
            </div>
            <div className="optionList">
              <h3>Color</h3>
              <label>
                <input type="checkbox" />
                Red
              </label>
              <label>
                <input type="checkbox" />
                Yellow
              </label>
              <label>
                <input type="checkbox" />
                Pink
              </label>
              <label>
                <input type="checkbox" />
                Blue
              </label>{" "}
              <label>
                <input type="checkbox" />
                Green
              </label>
              <label>
                <input type="checkbox" />
                Purple
              </label>
              <label>
                <input type="checkbox" />
                Black
              </label>{" "}
              <label>
                <input type="checkbox" />
                Gray
              </label>
              <label>
                <input type="checkbox" />
                Violet
              </label>
            </div>
          </div>
        ) : null}
        <div
          className={
            state.filterOptions ? "productListing threefr" : "productListing"
          }
        >
          {arr.map((item, id) => (
            <ProductCard key={id} even={id % 2} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
