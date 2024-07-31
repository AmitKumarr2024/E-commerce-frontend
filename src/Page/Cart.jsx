import React, { useContext, useEffect, useState } from "react";
import CartApi from "../common/cart";
import Context from "../context";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import PaymentOrderApi from "../common/order";

import displayINRCurrency from "../helper/displayCurrency";

function Cart(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(CartApi.CartItemView.url, {
      method: CartApi.CartItemView.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    const dataResponse = await response.json();

    if (dataResponse.success) {
      console.log("cart-items", dataResponse.data);

      setData(dataResponse.data);
    }
    if (dataResponse.error) {
      console.log("cart-items", dataResponse.error);
    }
  };

  // increase quantity function

  const increaseQuantity = async (id, qtn) => {
    try {
      const response = await fetch(CartApi.UpdateCartProduct.url, {
        method: CartApi.UpdateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          quantity: qtn + 1,
        }),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        fetchData();
      }
      if (dataResponse.error) {
        console.log("increase quantity", error);
      }
    } catch (error) {
      console.log("update error:", error);
    }
  };

  const decreaseQuantity = async (id, qtn) => {
    try {
      if (qtn >= 2) {
        const response = await fetch(CartApi.UpdateCartProduct.url, {
          method: CartApi.UpdateCartProduct.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            quantity: qtn - 1,
          }),
        });

        const dataResponse = await response.json();

        if (dataResponse.success) {
          fetchData();
        }
        if (dataResponse.error) {
          console.log("increase quantity", error);
        }
      }
    } catch (error) {
      console.log("update error:", error);
    }
  };

  const deleteCart = async (id) => {
    try {
      const response = await fetch(CartApi.DeleteCartProduct.url, {
        method: CartApi.DeleteCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        fetchData();
        context.fetchUserAddToCart();
      }

      if (dataResponse.error) {
        toast.error(dataResponse.error);
      }
    } catch (error) {
      console.log("Delete item ", error);
    }
  };
  const handleLoading = () => {
    fetchData();
  };
  // payment

  const handlePayment = async () => {
    try {
      const response = await fetch(PaymentOrderApi.payment.url, {
        method: PaymentOrderApi.payment.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();

      if(dataResponse.success){

        toast.success("payment response",dataResponse)


      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const totalQuantity = data.reduce(
    (previous, future) => previous + future.quantity,
    0
  );
  const toatoAMount = data.reduce(
    (prev, curr) => prev + curr.quantity * curr.productId.selling,
    0
  );
  return (
    <>
      <div className="container mx-auto">
        <div className="text-center text-lg my-10">
          {data.length === 0 && !loading && (
            <p className="bg-white py-9">No Data Sorry try again next Time</p>
          )}
        </div>
        {/* cart list of product for check out */}
        <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-9 p-4">
          <div className="w-full max-w-4xl h-[550px] overflow-y-scroll hide-scrollbar ">
            {loading
              ? loadingCart.map((item, index) => {
                  return (
                    <div
                      key={index + "add to cart"}
                      className="w-full bg-slate-200 h-32 my-4 border border-slate-300 rounded-sm animate-pulse transition-all"
                    ></div>
                  );
                })
              : data.map((product, index) => {
                  return (
                    <div
                      key={index + "add to cart"}
                      className=" w-full bg-white h-fit my-4 border border-slate-300 rounded-sm flex flex-row gap-6"
                    >
                      <div className="w-44 h-44 bg-slate-200 ">
                        <img
                          src={product?.productId?.productImage[0]}
                          className="w-full h-full object-scale-down mix-blend-multiply p-1"
                        />
                      </div>
                      <div className=" relative w-full h-full flex flex-col justify-between gap-2 py-2">
                        <div
                          className="absolute right-0 p-1 mr-2 text-2xl text-red-600 rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
                          onClick={(e) => deleteCart(product?._id)}
                        >
                          <MdDelete />
                        </div>
                        <h2 className="text-lg lg:text-lg text-ellipsis font-medium  line-clamp-1 mr-10">
                          {product?.productId.productName}
                        </h2>
                        <p className=" capitalize text-slate-400 font-medium">
                          Category : {product?.productId?.category}
                        </p>

                        <div className=" flex justify-between items-center gap-4 mr-20">
                          <p className="text-green-600 font-bold">
                            {displayINRCurrency(product.productId.selling)}
                          </p>
                          <p className="text-red-600 font-bold">
                            {displayINRCurrency(
                              product.productId.selling * product.quantity
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="w-6 h-6 font-extrabold text-sm hover:bg-blue-700 hover:text-white border border-blue-500 text-blue-500 rounded-md flex items-center justify-center leading-none"
                            onClick={(e) =>
                              decreaseQuantity(product?._id, product?.quantity)
                            }
                          >
                            <FaMinus />
                          </button>
                          <span className="text-xl font-bold">
                            {product?.quantity}
                          </span>
                          <button
                            className="w-6 h-6 font-extrabold text-sm hover:bg-blue-700 hover:text-white border border-blue-500 text-blue-500 rounded-md flex items-center justify-center leading-none"
                            onClick={(e) =>
                              increaseQuantity(product?._id, product?.quantity)
                            }
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
          {/* Product total */}
          {data[0] && (
            <div className="mt-5 lg:mt-0 w-full max-w-xl md:max-w-md">
              {data.length === 0 && !loading ? (
                <div className="w-full  h-40 my-4  "></div>
              ) : (
                <div className="flex flex-col justify-between w-full bg-white h-40 my-4 border border-slate-300 rounded-sm  transition-all ">
                  <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                  <div className="flex items-center justify-between gap-4 mx-3 font-semibold text-slate-500 text-xl">
                    <p>Quantity</p>
                    <p>{totalQuantity}</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 mx-3 font-semibold text-slate-500 text-xl">
                    <p>Total Amount</p>
                    <p>{displayINRCurrency(toatoAMount)}</p>
                  </div>
                  <button
                    className="w-full py-2 text-white bg-blue-600 px-4  hover:bg-blue-500"
                    onClick={handlePayment}
                  >
                    Payment
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
