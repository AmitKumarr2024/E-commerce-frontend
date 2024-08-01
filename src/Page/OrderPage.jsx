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
      <div>
        {data.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className="font-medium text-lg">
                {moment(item.createdAt).format("LL")}
              </p>
              <div>
                {item.productDetails.map((product, index) => {
                  return (
                    <div key={product.productId + index}>
                      <img
                        src={product.image[0]}
                        className="w-28 h-28 bg-slate-200 object-scale-down mix-blend-multiply p-2"
                      />
                      <div>{product.name}</div>
                      <div className="flex items-center gap-5">
                        <div>{displayINRCurrency(product.price)}</div>
                        <div>Quantity:{product.quantity}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <div>Payment Details:</div>
                <div>
                  Payment Method:{item.paymentDetails.payment_method_type[0]}
                </div>
                <div>Payment Status:{item.paymentDetails.payment_status}</div>
              </div>
              <div>
                <div>Shipping Details</div>
                {item.shipping_options.map((shipping, index) => {
                  return (
                    <div key={shipping.shipping_rate + index}>
                      Shipping Amount : {shipping.shipping_amount}
                    </div>
                  );
                })}
              </div>
              <div>Total Amount : {item.totalAmount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderPage;
