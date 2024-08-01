import React, { useEffect, useState } from "react";
import PaymentOrderApi from "../common/order";
import moment from "moment";
import displayINRCurrency from "../helper/displayCurrency";

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

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {!data[0] && <p>No Order available</p>}
      <div className="p-4 w-full ">
        {data.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className="font-medium text-lg ">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded">
                <div className="flex justify-between flex-col lg:flex-row">
                  <div className="grid gap-1">
                    {item.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex gap-3 bg-blue-100 "
                        >
                          <img
                            src={product.image}
                            className="w-28 h-28 bg-slate-200 object-scale-down mix-blend-multiply p-2"
                          />
                          <div className="font-medium text-lg text-ellipsis line-clamp-3">
                            <div>{product.name}</div>
                            <div className="flex items-center gap-5">
                              <div className="text-lg text-green-600 font-semibold">
                                {displayINRCurrency(product.price)}
                              </div>
                              <div>Quantity:{product.quantity}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col min-w-[300px] gap-4 p-2">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details:
                      </div>
                      <div className=" ml-1">
                        Payment Method:
                        {item.paymentDetails.payment_method_type[0]}
                      </div>
                      <div className=" ml-1">
                        Payment Status:{item.paymentDetails.payment_status}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details
                      </div>
                      {item.shipping_options.map((shipping, index) => {
                        return (
                          <div
                            className=" ml-1"
                            key={shipping.shipping_rate + index}
                          >
                            Shipping Amount : {shipping.shipping_amount}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="font-semibold lg:text-xl w-fit ml-auto min-w-[300px]">
                  Total Amount : {item.totalAmount}
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
