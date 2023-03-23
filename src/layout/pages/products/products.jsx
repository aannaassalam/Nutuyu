import React, { createElement, useEffect, useRef, useState } from "react";
import "./products.css";
import ProductCard from "../../components/productCard/productCard";
import { Minus, Plus } from "react-feather";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import ProductJson from "../../../assets/product.json";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useProducts } from "../../hooks/useProducts";
import moment from "moment/moment";

function Products(props) {
  const products = useProducts().products;
  const params = useParams();

  const [state, setState] = useState({
    filterOptions: false,
    sortOptions: false,
    whatsNew: false,
    sold: false,
    loading: true,
    products: [],
    filter: {
      types: [],
      selectedTypes: [],
      subcategories: [],
      // selectedSubcategory: params.subcategory ? [params.subcategory] : [],
      selectedSubcategory: [],
      priceRange: [],
    },
    sort: "",
    categories: [],
  });

  useEffect(() => {
    onSnapshot(collection(getFirestore(), "settings"), (snapshot) => {
      const categories = snapshot.docs[0].data().categories;
      const category = categories.find(
        (cat) => cat.name?.toLowerCase() === params.category?.toLowerCase()
      );
      if (category && !params.subcategory) {
        setState((prev) => ({
          ...prev,
          filter: {
            ...prev.filter,
            types: category?.types,
          },
        }));
        // } else if (category & params.subcategory === 'all') {
        //   setState((prev) => ({
        //     ...prev,
        //     filter: {
        //       ...prev.filter,
        //       subcategories: category.subcategories.filter((sub) =>
        //         params.type ? sub.type === params.type : true
        //       ),
        //     },
        //   }));
      } else if (category) {
        setState((prev) => ({
          ...prev,
          filter: {
            ...prev.filter,
            subcategories: category.subcategories.filter((sub) =>
              params.type
                ? sub.type?.toLowerCase() === params.type?.toLowerCase()
                : true
            ),
          },
        }));
      }
    });
  }, []);

  useEffect(() => {
    state.filter.selectedSubcategory.length
      ? setState((prev) => ({
          ...prev,
          products: products.filter((product) => {
            if (
              product.category?.toLowerCase() ===
                params.category?.toLowerCase() &&
              (product.subcategory.name?.toLowerCase() ===
                params.subcategory?.toLowerCase() ||
                state.filter.selectedSubcategory.includes(
                  product.subcategory.name?.toLowerCase()
                ))
            ) {
              if (!params.type) return product;
              if (
                params.type?.toLowerCase() !==
                product.subcategory.type?.toLowerCase()
              )
                return false;
              return product;
            }
            return false;
          }),
        }))
      : setState((prev) => ({
          ...prev,
          products: products?.filter((product) => {
            if (
              product.category?.toLowerCase() ===
                params.category?.toLowerCase() &&
              product.subcategory.name?.toLowerCase() ===
                params.subcategory?.toLowerCase()
            ) {
              if (!params.type) return product;
              if (
                params.type?.toLowerCase() !==
                product.subcategory.type?.toLowerCase()
              )
                return false;
              return product;
            }
            if (
              product.category?.toLowerCase() ===
                params.category?.toLowerCase() &&
              params.subcategory?.toLowerCase() === "all"
            ) {
              if (
                params.type?.toLowerCase() ===
                product.subcategory.type?.toLowerCase()
              ) {
                return product;
              }
            }
            return false;
          }),
        }));
  }, [state.filter.selectedSubcategory.length, products]);

  useEffect(() => {
    state.filter.selectedTypes.length
      ? setState((prev) => ({
          ...prev,
          products: products?.filter(
            (product) =>
              product.category?.toLowerCase() ===
                params.category?.toLowerCase() &&
              state.filter.selectedTypes.includes(
                product.subcategory.type?.toLowerCase()
              )
          ),
        }))
      : setState((prev) => ({
          ...prev,
          products: products?.filter((product) => {
            if (!params.subcategory) {
              return (
                product.category?.toLowerCase() ===
                params.category?.toLowerCase()
              );
            }
            if (
              params.type?.toLowerCase() !==
              product.subcategory.type?.toLowerCase()
            )
              return false;
            if (params.subcategory?.toLowerCase() === "all") return product;
            return (
              product.subcategory.name?.toLowerCase() ===
              params.subcategory?.toLowerCase()
            );
          }),
        }));
  }, [state.filter.selectedTypes.length, products, params.category]);

  useEffect(() => {
    if (params.category?.toLowerCase() === "what's-new") {
      setState((prev) => ({
        ...prev,
        products: products
          .sort(
            (a, b) =>
              moment(b.date.toDate()).format("YYYYMMDD") -
              moment(a.date.toDate()).format("YYYYMMDD")
          )
          .slice(0, 20),
      }));
    }
    if (params.category?.toLowerCase() === "sold") {
      setState((prev) => ({
        ...prev,
        products: products?.filter((product) => product.sold),
      }));
    }
  }, [products]);

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
        <h1>No Products Available</h1>
      </div>
    );
  };

  // const mapProductByCategory = () => {
  //   return state.filter.selectedTypes.length
  //     ? products
  //         ?.filter(
  //           (product) =>
  //             product.category === params.category &&
  //             state.filter.selectedTypes.includes(product.subcategory.type)
  //         )
  //         .map((item) => (
  //           <ProductCard key={item.id} product={item} sold={item.sold} />
  //         ))
  //     : products
  //         ?.filter((product) => product.category === params.category)
  //         .map((item) => (
  //           <ProductCard key={item.id} product={item} sold={item.sold} />
  //         ));
  // };

  // const mapProductBySubcategory = () => {
  //   return state.filter.selectedSubcategory.length
  //     ? products
  //         ?.filter((product) => {
  //           if (
  //             product.category === params.category &&
  //             (product.subcategory.name === params.subcategory ||
  //               state.filter.selectedSubcategory.includes(
  //                 product.subcategory.name
  //               ))
  //           ) {
  //             if (!params.type) return product;
  //             if (params.type !== product.subcategory.type) return false;
  //             return product;
  //           }
  //           return false;
  //         })
  //         .map((item) => {
  //           return (
  //             <ProductCard key={item.id} product={item} sold={item.sold} />
  //           );
  //         })
  //     : products
  //         ?.filter((product) => {
  //           if (
  //             product.category === params.category &&
  //             product.subcategory.name === params.subcategory
  //           ) {
  //             if (!params.type) return product;
  //             if (params.type !== product.subcategory.type) return false;
  //             return product;
  //           }
  //           return false;
  //         })
  //         .map((item) => (
  //           <ProductCard key={item.id} product={item} sold={item.sold} />
  //         ));
  // };

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
      {state.products.length > 0 && (
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
            <span>
              {state.sort === "AZ"
                ? "A to Z"
                : state.sort === "ZA"
                ? "Z to A"
                : state.sort === "LH"
                ? "Price Low to High"
                : state.sort === "HL"
                ? "Price High to Low"
                : "Sort By"}
            </span>
            {state.sortOptions ? <Minus /> : <Plus />}
          </button>
          <div
            className={state.sortOptions ? "sortOptions open" : "sortOptions"}
          >
            <p
              className={state.sort === "AZ" && "active"}
              onClick={() => setState((prev) => ({ ...prev, sort: "AZ" }))}
            >
              A to Z
            </p>
            <p
              className={state.sort === "ZA" && "active"}
              onClick={() => setState((prev) => ({ ...prev, sort: "ZA" }))}
            >
              Z to A
            </p>
            <p
              className={state.sort === "LH" && "active"}
              onClick={() => setState((prev) => ({ ...prev, sort: "LH" }))}
            >
              Price Low To High
            </p>
            <p
              className={state.sort === "HL" && "active"}
              onClick={() => setState((prev) => ({ ...prev, sort: "HL" }))}
            >
              Price High To Low
            </p>
          </div>
        </div>
      )}
      <div
        className={
          state.filterOptions
            ? "productListingWrapper fourfr"
            : "productListingWrapper"
        }
      >
        {state.filterOptions ? (
          <div className="filterOptions">
            {state.filter.types.length > 0 && (
              <div className="optionList">
                <h3>Types</h3>

                {state.filter.types.map((type) => {
                  return (
                    type && (
                      <label>
                        <input
                          type="checkbox"
                          checked={state.filter.selectedTypes.includes(
                            type?.toLowerCase()
                          )}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              filter: {
                                ...prev.filter,
                                selectedTypes:
                                  prev.filter.selectedTypes.includes(
                                    type?.toLowerCase()
                                  )
                                    ? prev.filter.selectedTypes.filter(
                                        (t) =>
                                          t?.toLowerCase() !==
                                          type?.toLowerCase()
                                      )
                                    : [...prev.filter.selectedTypes, type],
                              },
                            }))
                          }
                        />
                        {type}
                      </label>
                    )
                  );
                })}
              </div>
            )}
            {state.filter.subcategories.length > 0 && (
              <div className="optionList">
                <h3>Subcategories</h3>
                {state.filter.subcategories?.map((subcategory) => {
                  return (
                    subcategory.name &&
                    subcategory.name?.toLowerCase() !==
                      params.subcategory?.toLowerCase() && (
                      <label>
                        <input
                          type="checkbox"
                          checked={state.filter.selectedSubcategory.includes(
                            subcategory.name?.toLowerCase()
                          )}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              filter: {
                                ...prev.filter,
                                selectedSubcategory:
                                  prev.filter.selectedSubcategory.includes(
                                    subcategory.name?.toLowerCase()
                                  )
                                    ? prev.filter.selectedSubcategory.filter(
                                        (s) =>
                                          s?.toLowerCase() !==
                                          subcategory.name?.toLowerCase()
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
          </div>
        ) : null}
        <div
          className={
            state.filterOptions ? "productListing threefr" : "productListing"
          }
        >
          {state.products.length > 0
            ? state.products
                .sort((a, b) => {
                  if (state.sort === "AZ") {
                    return a.name.localeCompare(b.name);
                  } else if (state.sort === "ZA") {
                    return b.name.localeCompare(a.name);
                  } else if (state.sort === "LH") {
                    return a.price - b.price;
                  } else if (state.sort === "HL") {
                    return b.price - a.price;
                  }
                  return;
                })
                .map((product) => (
                  <ProductCard
                    product={product}
                    sold={product.sold}
                    key={product.id}
                  />
                ))
            : NoProductsAvailable()}
        </div>
      </div>
    </div>
  );
}

export default Products;
