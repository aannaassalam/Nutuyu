import React, { createElement, useEffect, useRef, useState } from "react";
import "./products.css";
import ProductCard from "../../components/productCard/productCard";
import { Plus } from "react-feather";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import ProductJson from "../../../assets/product.json";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useProducts } from "../../hooks/useProducts";

function Products(props) {
  const products = useProducts().products;
  const listing = useRef();
  const [state, setState] = useState({
    filterOptions: false,
    sortOptions: false,
    whatsNew: false,
    sold: false,
    loading: true,
  });
  const params = useParams();
  console.log(params);
  useEffect(() => {
    if (params.category === "what's-new") {
      setState({ ...state, whatsNew: true });
    }
    if (params.category === "sold") {
      setState({ ...state, sold: true });
    }
  }, []);

  const NoProductsAvailable = () => {
    return (
      <div className="noProductAvailable">
        <Lottie
          options={{
            animationData: ProductJson,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={200}
          width={200}
        />
        <h1>Sorry No Products Available</h1>
      </div>
    );
  };

  return (
    <div className="Products">
      <div className="breadCrumb">
        <a href="/">Home</a>
        {">"}
        <a href={`/products/${params.category}`}>{params.category}</a>
        {params.type && (
          <>
            {">"}
            <a href={`/products/${params.type}`}>{params.type}</a>
          </>
        )}
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
            setState({ ...state, filterOptions: !state.filterOptions })
          }
        >
          <Plus />
          <span>Filter</span>
        </button>
        <button
          onClick={() =>
            setState({ ...state, sortOptions: !state.sortOptions })
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
          {state.whatsNew ? (
            products
              .sort((a, b) =>
                a.date.nanoseconds > b.date.nanoseconds ? 1 : -1
              )
              .slice(0, 20)
              .map((item) => <ProductCard key={item.id} product={item} />)
          ) : state.sold ? (
            products
              ?.filter((product) => product.sold === true)

              .map((item) => (
                <ProductCard key={item.id} product={item} sold={true} />
              ))
          ) : (
            <>
              {params.subcategory
                ? products
                    ?.filter(
                      (product) =>
                        product.category === params.category &&
                        product.subcategory.name === params.subcategory &&
                        params.type === product.subcategory.type
                    )
                    .map((item) => <ProductCard key={item.id} product={item} />)
                : products
                    ?.filter((product) => product.category === params.category)
                    .map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
