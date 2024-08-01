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

      console.log("order-list", dataResponse);
    } catch (error) {
      console.log("order", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return <div>Order Page</div>;
}

export default OrderPage;
