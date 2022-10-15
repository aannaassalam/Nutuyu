import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layout/components/navbar/navbar";
import Homepage from "./layout/pages/homepage/homepage";
import Footer from "./layout/components/footer/footer";
import { Routes, Route } from "react-router-dom";
import routes from "./router/router";
function App() {
  return (
    <div className="App">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;
