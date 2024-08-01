import React, { useEffect, useState } from "react";
import PaymentOrderApi from "../common/order";
import moment from "moment";

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
                    <div>
                      <img src={product.image} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderPage;
