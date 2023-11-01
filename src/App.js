import React, { Suspense, useState } from "react";
import "./App.css";
import Navbar from "./layout/components/navbar/navbar";
import Homepage from "./layout/pages/homepage/homepage";
import Footer from "./layout/components/footer/footer";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./router/router";
import Cart from "./layout/components/cart/cart";
import AuthProvider, { useAuth } from "./layout/hooks/useAuth";
import ProductsProvider, { useProducts } from "./layout/hooks/useProducts";
import Loader from "./layout/components/loader/loader";

function App() {
  const [cart, setcart] = useState(false);
  const location = useLocation();

  const user = useAuth();
  const products = useProducts();

  return (
    <div className="App">
      <Loader loading={user.loading || products.loading} />
      {!user.loading && !products.loading && (
        <>
          {!location.pathname.startsWith("/checkout") && (
            <Navbar handleCart={() => setcart((prev) => !prev)} />
          )}
          <Suspense fallback={<Loader />}>
            <Routes>
              {routes.map((Item, key) => {
                return (
                  <Route
                    exact
                    path={Item.route}
                    key={key}
                    element={<Item.Component />}
                  />
                );
              })}
            </Routes>
          </Suspense>

          {!location.pathname.startsWith("/checkout") && (
            <Cart open={cart} handleCart={() => setcart(!cart)} />
          )}
          {!location.pathname.startsWith("/checkout") && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
