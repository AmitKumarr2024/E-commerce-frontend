const domain = "https://e-commerce-backend-tkle.onrender.com";

const PaymentOrderApi = {
  payment: {
    url: `${domain}/api/payment/checkout`,
    method: "post",
  },
  getOrder: {
    url: `${domain}/api/payment/order-list`,
  },
  cancelOrder:{
    url: `${domain}/api/payment/orders`,
    method: "delete",

  }
};

export default PaymentOrderApi;
