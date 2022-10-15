import { lazy } from "react";

const routes = [
  {
    route: "/",
    id: "home",
    Component: lazy(() => import("../layout/pages/homepage/homepage.jsx")),
  },
  {
    route: "/products/:id",
    id: "products",
    Component: lazy(() => import("../layout/pages/products/products.jsx")),
  },
];
export default routes;
