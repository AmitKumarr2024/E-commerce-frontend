import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import CartApi from "./common/cart";

function App(props) {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();
      console.log("User details API response:", dataApi);

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi?.data));
      } else {
        console.error("Failed to fetch user details:", dataApi.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details. Please try again later.");
    }
  }, [dispatch]);

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(CartApi.itemInCart.url, {
        method: CartApi.itemInCart.method,
        credentials: "include",
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();
      console.log("Cart items API response:", dataApi);

      if (dataApi.success) {
        setCartProductCount(dataApi?.data?.count);
      } else {
        console.error("Failed to fetch cart details:", dataApi.message);
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
      toast.error("Failed to fetch cart details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails]);

  return (
    <>
      <ToastContainer position="top-center" />{" "}
      {/* Ensure ToastContainer is at the top level */}
      <Context.Provider
        value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}
      >
        <Header />
        <main className="min-h-[calc(100vh-100px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
