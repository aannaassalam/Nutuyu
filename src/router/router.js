import { lazy } from "react";

const routes = [
  {
    route: "/",
    id: "home",
    Component: lazy(() => import("../layout/pages/homepage/homepage.jsx")),
  },
  {
    route: "/login",
    id: "login",
    Component: lazy(() => import("../layout/pages/login/login.jsx")),
  },
  {
    route: "/profile",
    id: "profile",
    Component: lazy(() => import("../layout/pages/profile/profile.jsx")),
  },
  {
    route: "/products/:category",
    id: "products",
    Component: lazy(() => import("../layout/pages/products/products.jsx")),
  },
  {
    route: "/products/:category/:subcategory",
    id: "products",
    Component: lazy(() => import("../layout/pages/products/products.jsx")),
  },
];
export default routes;
