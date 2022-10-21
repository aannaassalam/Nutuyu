import { lazy } from "react";

const routes = [
  {
    route: "/",
    id: "home",
    Component: lazy(() => import("../layout/pages/homepage/homepage.jsx")),
  },
  {
    route: "/products/:category",
    id: "category",
    Component: lazy(() => import("../layout/pages/products/products.jsx")),
  },
  {
    route: "/products/:category/:subcategory",
    id: "subcategory",
    Component: lazy(() => import("../layout/pages/products/products.jsx")),
  },
  {
    route: "/product/:id",
    id: "product description",
    Component: lazy(() =>
      import("../layout/pages/product-details/product-details.jsx")
    ),
  },
];
export default routes;
