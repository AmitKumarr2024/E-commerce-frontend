const domain = "https://e-commerce-backend-tkle.onrender.com";

const PaymentOrderApi = {
  payment: {
    url: `${domain}/api/payment/checkout`,
    method: "post",
  },
  getOrder: {
    url: `${domain}/api/payment/order-list`,
    method: "get",
  },
  cancelOrder: {
    url: `${domain}/api/payment/orders`,
    method: "post",
  },
};

export default PaymentOrderApi;
