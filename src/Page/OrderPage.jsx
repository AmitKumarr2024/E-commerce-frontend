import React, { useEffect, useState } from "react";
import PaymentOrderApi from "../common/order";
import moment from "moment";
import displayINRCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";

function OrderPage(props) {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(PaymentOrderApi.getOrder.url, {
        method: PaymentOrderApi.getOrder.method,
        credentials: "include",
      });
      const dataResponse = await response.json();

      setData(dataResponse.data);
      console.log("order-list", dataResponse);
    } catch (error) {
      console.log("order", error);
    }
  };

  const orderDelete = async (id) => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {!data[0] && (
        <p className="text-center text-gray-500">No Order available</p>
      )}
      <div className="space-y-6">
        {data.map((item, index) => {
          return (
            <div key={item.userId + index} className="space-y-4">
              <p className="font-medium text-lg text-gray-800">
                {moment(item.createdAt).format("LL")}
              </p>

              <div className="border rounded-lg shadow-sm overflow-hidden">
                <div className="lg:flex">
                  <div className="grid gap-4 p-4 lg:w-2/3">
                  {/* delete button below*/}
                    <div
                      className="absolute right-0 p-1 mr-2 text-2xl text-red-600 rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
                      onClick={(e) => deleteCart(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    {item.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex gap-4 bg-blue-50 p-4 rounded-md"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-32 bg-slate-200 object-scale-down mix-blend-multiply p-2 rounded-md"
                          />
                          <div className="flex flex-col justify-between">
                            <div className="font-medium text-lg text-gray-800 line-clamp-3">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5">
                              <div className="text-lg text-green-600 font-semibold">
                                {displayINRCurrency(product.price)}
                              </div>
                              <div className="text-gray-600">
                                Quantity: {product.quantity}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 lg:w-1/3 bg-gray-50 space-y-4">
                    <div>
                      <div className="text-lg font-medium text-gray-800">
                        Payment Details:
                      </div>
                      <div className="ml-1 text-gray-600">
                        Payment Method:{" "}
                        {item.paymentDetails.payment_method_type[0]}
                      </div>
                      <div className="ml-1 text-gray-600">
                        Payment Status: {item.paymentDetails.payment_status}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-medium text-gray-800">
                        Shipping Details
                      </div>
                      {item.shipping_options.map((shipping, index) => {
                        return (
                          <div
                            key={shipping.shipping_rate + index}
                            className="ml-1 text-gray-600"
                          >
                            Shipping Amount: {shipping.shipping_amount}
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      Total Amount: {displayINRCurrency(item.totalAmount)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderPage;
