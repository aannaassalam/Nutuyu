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
  // {
  //   route: "/products/sold",
  //   id: "product sold",
  //   Component: lazy(() => import("../layout/pages/products/products.jsx")),
  // },
  // {
  //   route: "/products/:what's_new",
  //   id: "what's new",
  //   Component: lazy(() => import("../layout/pages/products/products.jsx")),
  // },
  {
    route: "/products/:category",
    id: "category",
    Component: lazy(() => import("../layout/pages/products/products.jsx")),
  },
  {
    route: "/products/:category/:type/:subcategory",
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
  {
    route: "/nutuyu",
    id: "#nutuyu",
    Component: lazy(() => import("../layout/pages/nutuyu/nutuyu.jsx")),
  },
  {
    route: "/checkout",
    id: "checkout",
    Component: lazy(() => import("../layout/pages/checkout/checkout.jsx")),
  },
  {
    route: "/checkout/:id",
    id: "checkout",
    Component: lazy(() => import("../layout/pages/checkout/checkout.jsx")),
  },
  {
    route: "/orderDetail/:id",
    id: "orderDetail",
    Component: lazy(() =>
      import("../layout/pages/orderDetail/orderDetail.jsx")
    ),
  },
];
export default routes;
