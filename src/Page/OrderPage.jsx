import React, { useEffect, useState } from "react";
import PaymentOrderApi from "../common/order";

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
              <p>{moment(item.createdAt).format("LL")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderPage;
