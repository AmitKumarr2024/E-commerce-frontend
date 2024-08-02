const domain = import.meta.env.BACKEND_RENDER_API_DOMAIN;

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
  allOrder: {
    url: `${domain}/api/payment/allorder`,
    method: "get",
  },
};

export default PaymentOrderApi;
