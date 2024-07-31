import { toast } from "react-toastify";
import CartApi from "../common/cart";

const addToCart = async (e, id) => {
  try {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (!id) {
      toast.error("Product ID is missing");
      console.error("Product ID is missing");
      return;
    }

    console.log("Sending request to add product to cart:", id);
    const response = await fetch(CartApi.addtoCart.url, {
      method: CartApi.addtoCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });


    

    const dataResponse = await response.json();

    if (dataResponse.success) {
      toast.success(dataResponse.message);
    } else {
      toast.error(dataResponse.message || "Server Side Issue");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message || "Something went wrong");
  }
};

export default addToCart;
