import React, { createElement, useEffect, useRef, useState } from "react";
import "./search.css";
import ProductCard from "../../components/productCard/productCard";
import { Minus, Plus } from "react-feather";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import ProductJson from "../../../assets/product.json";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useProducts } from "../../hooks/useProducts";

function Search(props) {
  const products = useProducts().products;
  const params = useParams();

  const [state, setState] = useState({
    filterOptions: false,
    sortOptions: false,
    whatsNew: false,
    sold: false,
    loading: true,
    filter: {
      categories: [],
      selectedCategory: [],
      priceRange: [],
    },
  });

  useEffect(() => {
    onSnapshot(collection(getFirestore(), "settings"), (snapshot) => {
      const categories = snapshot.docs[0].data().categories;
      setState((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          categories: categories,
        },
      }));
    });
  }, [params.id]);

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

  const mapProducts = () => {
    return state.filter.selectedCategory.length
      ? products
          ?.filter(
            (product) =>
              state.filter.selectedCategory.includes(product.category) &&
              product.name.includes(params.id)
          )
          .map((item) => (
            <ProductCard key={item.id} product={item} sold={item.sold} />
          ))
      : products
          ?.filter((product) =>
            product.name.toLowerCase().includes(params.id.toLowerCase())
          )
          .map((item) => (
            <ProductCard key={item.id} product={item} sold={item.sold} />
          ));
  };

  //   const mapProductBySubcategory = () => {
  //     return state.filter.selectedSubcategory.length
  //       ? products
  //           ?.filter((product) => {
  //             if (
  //               product.category === params.category &&
  //               (product.subcategory.name === params.subcategory ||
  //                 state.filter.selectedSubcategory.includes(
  //                   product.subcategory.name
  //                 ))
  //             ) {
  //               if (!params.type) return product;
  //               if (params.type !== product.subcategory.type) return false;
  //               return product;
  //             }
  //             return false;
  //           })
  //           .map((item) => {
  //             return (
  //               <ProductCard key={item.id} product={item} sold={item.sold} />
  //             );
  //           })
  //       : products
  //           ?.filter((product) => {
  //             if (
  //               product.category === params.category &&
  //               product.subcategory.name === params.subcategory
  //             ) {
  //               if (!params.type) return product;
  //               if (params.type !== product.subcategory.type) return false;
  //               return product;
  //             }
  //             return false;
  //           })
  //           .map((item) => (
  //             <ProductCard key={item.id} product={item} sold={item.sold} />
  //           ));
  //   };

  return (
    <div className="Search">
      <div className="breadCrumb">
        <a href="/">Home</a>
        {">"}
        <a href={`/search/${params.id}`}>search</a>
        {params.id && (
          <>
            {">"}
            <a href={`/search/${params.id}`}>{params.id}</a>
          </>
        )}
      </div>
      <h1 className="displayName">You Searched for "{params.id}"</h1>
      <div className="filterSection">
        <button
          onClick={() =>
            setState({ ...state, filterOptions: !state.filterOptions })
          }
        >
          {state.filterOptions ? <Minus /> : <Plus />}
          <span>Filter</span>
        </button>
        <button
          onClick={() =>
            setState({ ...state, sortOptions: !state.sortOptions })
          }
        >
          <span>Sort By</span>
          {state.sortOptions ? <Minus /> : <Plus />}
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
            {state.filter.categories.length > 0 && (
              <div className="optionList" style={{ marginTop: 0 }}>
                <h3>Categories</h3>

                {state.filter.categories.map((category) => {
                  return (
                    category && (
                      <label>
                        <input
                          type="checkbox"
                          checked={state.filter.selectedCategory.includes(
                            category.name
                          )}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              filter: {
                                ...prev.filter,
                                selectedCategory:
                                  prev.filter.selectedCategory.includes(
                                    category.name
                                  )
                                    ? prev.filter.selectedCategory.filter(
                                        (t) => t !== category.name
                                      )
                                    : [
                                        ...prev.filter.selectedCategory,
                                        category.name,
                                      ],
                              },
                            }))
                          }
                        />
                        {category.name}
                      </label>
                    )
                  );
                })}
              </div>
            )}
            {/* {state.filter.subcategories.length > 0 && (
              <div className="optionList">
                <h3>Subcategories</h3>
                {state.filter.subcategories?.map((subcategory) => {
                  return (
                    subcategory.name &&
                    subcategory.name !== params.subcategory && (
                      <label>
                        <input
                          type="checkbox"
                          checked={state.filter.selectedSubcategory.includes(
                            subcategory.name
                          )}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              filter: {
                                ...prev.filter,
                                selectedSubcategory:
                                  prev.filter.selectedSubcategory.includes(
                                    subcategory.name
                                  )
                                    ? prev.filter.selectedSubcategory.filter(
                                        (s) => s !== subcategory.name
                                      )
                                    : [
                                        ...prev.filter.selectedSubcategory,
                                        subcategory.name,
                                      ],
                              },
                            }))
                          }
                        />
                        {subcategory.name}
                      </label>
                    )
                  );
                })}
              </div>
            )}
        </div>*/}
          </div>
        ) : null}
        <div
          className={
            state.filterOptions ? "productListing threefr" : "productListing"
          }
        >
          {mapProducts()}
        </div>
      </div>
    </div>
  );
}

export default Search;
