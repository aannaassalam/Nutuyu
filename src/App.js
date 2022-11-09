import React, { useState } from "react";
import "./App.css";
import Navbar from "./layout/components/navbar/navbar";
import Homepage from "./layout/pages/homepage/homepage";
import Footer from "./layout/components/footer/footer";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./router/router";
import Cart from "./layout/components/cart/cart";
import AuthProvider, { useAuth } from "./layout/hooks/useAuth";
import Loader from "./layout/components/loader/loader";
import { CookiesProvider } from "react-cookie";

function App() {
  const [cart, setcart] = useState(false);
  const location = useLocation();

  const user = useAuth();

  return (
    <div className="App">
      <CookiesProvider>
        <Loader loading={user.loading} />
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
      </CookiesProvider>
    </div>
  );
}

export default App;
