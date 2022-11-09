import React, { useState } from "react";
import "./App.css";
import Navbar from "./layout/components/navbar/navbar";
import Homepage from "./layout/pages/homepage/homepage";
import Footer from "./layout/components/footer/footer";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./router/router";
import Cart from "./layout/components/cart/cart";
import AuthProvider from "./layout/hooks/useAuth";
import ProductsProvider from "./layout/hooks/useProducts";

function App() {
  const [cart, setcart] = useState(false);
  const location = useLocation();

  return (
    <div className="App">
      <AuthProvider>
        <ProductsProvider>
          {location.pathname !== "/checkout" && (
            <Navbar handleCart={() => setcart(true)} />
          )}
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
          {location.pathname !== "/checkout" && (
            <Cart open={cart} handleCart={() => setcart(!cart)} />
          )}
          {location.pathname !== "/checkout" && <Footer />}
        </ProductsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
