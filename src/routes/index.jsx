import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Page/Home";
import Login from "../Page/Login";
import ForgotPassword from "../Page/ForgotPassword";
import SignUp from "../Page/SignUp";
import AdminPannel from "../Page/AdminPannel";
import AllUser from "../Page/AllUser";
import AllProducts from "../Page/AllProducts";
import CategoryProduct from "../Page/CategoryProduct";
import ProductDetails from "../Page/ProductDetails";
import Cart from "../Page/Cart";
import Search from "../Page/Search";
import PageNotFound from "../Page/PageNotFound";
import Success from "../Page/Success";
import Cancel from "../Page/Cancel";
import OrderPage from "../Page/OrderPage";
import AllOrders from "../Page/AllOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "sign-up", element: <SignUp /> },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <Search />,
      },
      { path: "get-category", element: <CategoryProduct /> },
      {
        path: "admin-pannel",
        element: <AdminPannel />,
        children: [
          { path: "all-user", element: <AllUser /> },
          {
            path: "all-product",
            element: <AllProducts />,
          },
          {
            path: "all-order",
            element: <AllOrders />,
          },
        ],
      },
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },
      { path: "order", element: <OrderPage /> },

      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default router;
