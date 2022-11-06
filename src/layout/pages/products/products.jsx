import React, { useEffect, useState } from "react";
import "./products.css";
import ProductCard from "../../components/productCard/productCard";
import { Plus } from "react-feather";
import { useParams } from "react-router-dom";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
function Products(props) {
  const [state, setState] = useState({
    filterOptions: false,
    sortOptions: false,
    products: [],
    loading: true,
  });
  const params = useParams();

  useEffect(() => {
    onSnapshot(collection(getFirestore(), "products"), (snapshot) => {
      setState((prev) => ({ ...prev, products: [] }));
      snapshot.docs.forEach((doc) => {
        setState((prev) => ({
          ...prev,
          products: [...prev.products, { ...doc.data(), id: doc.id }],
        }));
      });
      setState((prev) => ({ ...prev, loading: false }));
    });
  }, []);

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
          {state.loading
            ? "loading..."
            : params.subcategory
            ? state.products
                .filter((product) => product.category === params.category)
                .filter(
                  (product) =>
                    product.subcategory.name === params.subcategory &&
                    params.type === product.subcategory.type
                )
                .map((item) => <ProductCard key={item.id} product={item} />)
            : state.products
                .filter((product) => product.category === params.category)
                .map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </div>
    </div>
  );
}

export default Products;
