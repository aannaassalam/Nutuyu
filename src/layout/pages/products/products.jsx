import React, { createElement, useEffect, useRef, useState } from "react";
import "./products.css";
import ProductCard from "../../components/productCard/productCard";
import { Minus, Plus } from "react-feather";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import ProductJson from "../../../assets/product.json";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useProducts } from "../../hooks/useProducts";

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
    categories: [],
  });

  useEffect(() => {
    console.log(params);
    onSnapshot(collection(getFirestore(), "settings"), (snapshot) => {
      const categories = snapshot.docs[0].data().categories;
      const category = categories.find((cat) => cat.name === params.category);
      if (category && !params.subcategory) {
        setState((prev) => ({
          ...prev,
          filter: {
            ...prev.filter,
            types: category?.types,
          },
        }));
      } else if (category) {
        setState((prev) => ({
          ...prev,
          filter: {
            ...prev.filter,
            subcategories: category.subcategories.filter((sub) =>
              params.type ? sub.type === params.type : true
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
              product.category === params.category &&
              (product.subcategory.name === params.subcategory ||
                state.filter.selectedSubcategory.includes(
                  product.subcategory.name
                ))
            ) {
              if (!params.type) return product;
              if (params.type !== product.subcategory.type) return false;
              return product;
            }
            return false;
          }),
        }))
      : setState((prev) => ({
          ...prev,
          products: products?.filter((product) => {
            if (
              product.category === params.category &&
              product.subcategory.name === params.subcategory
            ) {
              console.log("in");
              if (!params.type) return product;
              if (params.type !== product.subcategory.type) return false;
              return product;
            }
            return false;
          }),
        }));
    console.log(state.products);
  }, [state.filter.selectedSubcategory.length, products]);

  useEffect(() => {
    state.filter.selectedTypes.length
      ? setState((prev) => ({
          ...prev,
          products: products?.filter(
            (product) =>
              product.category === params.category &&
              state.filter.selectedTypes.includes(product.subcategory.type)
          ),
        }))
      : setState((prev) => ({
          ...prev,
          products: products?.filter((product) => {
            if (!params.subcategory) {
              console.log("insd");
              return product.category === params.category;
            }
            if (params.type !== product.subcategory.type) return false;
            return product.subcategory.name === params.subcategory;
          }),
        }));
  }, [state.filter.selectedTypes.length, products, params.category]);

  useEffect(() => {
    if (params.category === "what's-new") {
      console.log(
        products
          .sort((a, b) => (a.date.nanoseconds > b.date.nanoseconds ? 1 : -1))
          .slice(0, 20)
      );
      setState((prev) => ({
        ...prev,
        products: products
          .sort((a, b) => (a.date.nanoseconds > b.date.nanoseconds ? 1 : -1))
          .slice(0, 20),
      }));
    }
    if (params.category === "sold") {
      console.log(products?.filter((product) => product.sold));
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

  const mapProductByCategory = () => {
    return state.filter.selectedTypes.length
      ? products
          ?.filter(
            (product) =>
              product.category === params.category &&
              state.filter.selectedTypes.includes(product.subcategory.type)
          )
          .map((item) => (
            <ProductCard key={item.id} product={item} sold={item.sold} />
          ))
      : products
          ?.filter((product) => product.category === params.category)
          .map((item) => (
            <ProductCard key={item.id} product={item} sold={item.sold} />
          ));
  };

  const mapProductBySubcategory = () => {
    return state.filter.selectedSubcategory.length
      ? products
          ?.filter((product) => {
            if (
              product.category === params.category &&
              (product.subcategory.name === params.subcategory ||
                state.filter.selectedSubcategory.includes(
                  product.subcategory.name
                ))
            ) {
              if (!params.type) return product;
              if (params.type !== product.subcategory.type) return false;
              return product;
            }
            return false;
          })
          .map((item) => {
            return (
              <ProductCard key={item.id} product={item} sold={item.sold} />
            );
          })
      : products
          ?.filter((product) => {
            if (
              product.category === params.category &&
              product.subcategory.name === params.subcategory
            ) {
              if (!params.type) return product;
              if (params.type !== product.subcategory.type) return false;
              return product;
            }
            return false;
          })
          .map((item) => (
            <ProductCard key={item.id} product={item} sold={item.sold} />
          ));
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
                          checked={state.filter.selectedTypes.includes(type)}
                          onChange={(e) =>
                            setState((prev) => ({
                              ...prev,
                              filter: {
                                ...prev.filter,
                                selectedTypes:
                                  prev.filter.selectedTypes.includes(type)
                                    ? prev.filter.selectedTypes.filter(
                                        (t) => t !== type
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
          </div>
        ) : null}
        <div
          className={
            state.filterOptions ? "productListing threefr" : "productListing"
          }
        >
          {/* {state.whatsNew
            ? 
            : state.sold
            ? 
            : params.subcategory
            ? mapProductBySubcategory()
            : mapProductByCategory()} */}
          {state.products.length > 0
            ? state.products.map((product) => {
                return (
                  <ProductCard
                    product={product}
                    sold={product.sold}
                    key={product.id}
                  />
                );
              })
            : NoProductsAvailable()}
        </div>
      </div>
    </div>
  );
}

export default Products;
