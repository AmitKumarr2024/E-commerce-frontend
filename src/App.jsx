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

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return; // No token means no need to fetch user details

      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${authToken}`
        }
      });

      if (!dataResponse.ok) {
        throw new Error("Failed to fetch user details");
      }

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
        toast.success("User details fetched successfully");
      }
    } catch (error) {
      console.error("Failed to fetch user details. Please try again later.");
    }
  }, [dispatch]);

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(CartApi.itemInCart.url, {
        method: CartApi.itemInCart.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();
      console.log("data in cart", dataApi);
      setCartProductCount(dataApi.data.count);
    } catch (error) {
      console.error("Failed to fetch cart details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails]);

  return (
    <>
      <ToastContainer position="top-center" />
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
