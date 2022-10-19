import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layout/components/navbar/navbar";
import Homepage from "./layout/pages/homepage/homepage";
import Footer from "./layout/components/footer/footer";
import { Routes, Route } from "react-router-dom";
import routes from "./router/router";
import Cart from "./layout/components/cart/cart";
import { useState } from "react";
function App() {
  const [cart, setcart] = useState(false);
  return (
    <div className="App">
      <Navbar handleCart={() => setcart(true)} />
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
      <Cart open={cart} handleCart={() => setcart(!cart)} />
      <Footer />
    </div>
  );
}

export default App;
